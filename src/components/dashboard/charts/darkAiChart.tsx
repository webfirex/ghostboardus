'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { fetchNetFlow } from '@/utils/modules/fetchNetFLow';
import { formatNumber } from '@/utils/formatNumber';
import { fetchdarkAi } from '@/utils/modules/fetchDarkAi';
import { formatTimestamp } from '@/utils/formatTime';
import { useUser } from '@/context/UserContext';
import { fetchdarklevels } from '@/utils/modules/fetchDarkLevel';

// Import ApexCharts dynamically to prevent SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

type DarkAIProps = {
  filters?: {symbol: string, interval: string};
};

export default function DarkAiChart(props: DarkAIProps) {
  const [chartOptions, setChartOptions] = useState<any>(null);
  const [chartSeries, setChartSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);
  const user = useUser();

  // Fetch data function
  const fetchData: any = async () => {
    try {
      const darkaiData = await fetchdarkAi({ symbol: props.filters?.symbol });

      if (!darkaiData.response) throw new Error('No data available');

      const aiData = darkaiData.response.tradeTimeToDarkFlowDataSumModelMap;

      const timestampsArray: string[] = [];
      const notionalValues: number[] = [];
      const sizes: number[] = [];
      const stockPrices: number[] = [];
      const tradeCounts: number[] = [];
      
      Object.entries(aiData).slice(0, 496).forEach(([timestamp, data]: [string, any]) => {
        timestampsArray.push(formatTimestamp(Number(timestamp)));
        notionalValues.push(Number((data.notionalValueInCentsSum / 100).toFixed(2)));
        sizes.push(data.sizeSum);
        stockPrices.push(Number((data.stockPriceInCents / 100).toFixed(2)));
        tradeCounts.push(data.tradeCountSum);
      });

      // Set chart options and series for ApexCharts
      setChartOptions({
        series: [
          { name: 'Stock Prices', data: stockPrices,}, 
        ],
        chart: {
          type: 'line',
          zoom: {
            enabled: true,
            type: 'x',
            autoScaleYaxis: true,
          },
          height: '100%',
          width: '100%',
          toolbar: { show: false },
          background: '#1e1e2f00',
        },
        colors: ['#D3D3D370'],
        stroke: {
          width: 2,
          curve: 'straight',
        },
        xaxis: {
          categories: timestampsArray,
          labels: {
            formatter: function (value: any) {
              return value;
            },
            step: Math.ceil(timestampsArray.length / 15),
            floating: false,
            style: {
              fontSize: '8px',
              colors: '#ffffff',
            },
          },
          tickAmount: 10,
        },
        yaxis: [
          // {
          //   title: { style: { color: '#ffffff' } },
          //   labels: {
          //     style: { colors: '#ffffff' },
          //     formatter(y: any) {
          //       return formatNumber(y);
          //     },
          //     forceNiceScale: true,
          //   },
          //   // min: Math.min(...notionalValues, ...newPValues),
          //   // max: Math.max(...notionalValues, ...newPValues),
          // },
          {
            // opposite: true,
            title: { style: { color: '#ffffff' } },
            labels: {
              style: { colors: '#ffffff' },
              formatter(y: any) {
                return formatNumber(y);
              },
              forceNiceScale: true,
            },
          },
        ],
        tooltip: {
            theme: 'dark',
            custom: function ({ dataPointIndex }: any) {
              return `
                <div style="background: #22222220; padding: 10px; border-radius: 5px; color: #fff;">
                  <strong>Notional Values:</strong> ${formatNumber(notionalValues[dataPointIndex])}<br/>
                  <strong>Stock Prices:</strong> ${formatNumber(stockPrices[dataPointIndex])}<br/>
                  <strong>Size:</strong> ${formatNumber(sizes[dataPointIndex])}<br/>
                  <strong>Trade Count:</strong> ${formatNumber(tradeCounts[dataPointIndex])}
                </div>
              `;
            }
        },
        annotations: {
            yaxis: data
        },
        grid: {
          borderColor: '#ffffff20',
        },
        legend: {
          show: false,
          labels: { colors: '#ffffff' },
        },
      });      

      setChartSeries([
        { name: 'Stock Prices', data: stockPrices,},
      ]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      setLoading(true);
    fetchData();

    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, [props.filters?.symbol, data]);

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const darkLvlData = await fetchdarklevels({
          interval: props.filters?.interval === "Daily" ? "d" : "m",
          symbol: props.filters?.symbol,
        });
        
        // setData(darkLvlData.response.priceInCentsToDarkPoolLevelDataSumModelMap);

        const formattedData = Object.entries(darkLvlData.response.priceInCentsToDarkPoolLevelDataSumModelMap)
        .sort(([, a]: any, [, b]: any) => b.notionalValueInCentsSum - a.notionalValueInCentsSum)
        .slice(0, 50)
        .filter(([, details]: any) => details.notionalValueInCentsSum >= (props.filters?.interval === "Daily" ? 5000000000 : 90000000000) )
        .map(([priceInCents, details] : any) => ({
          y: Number(priceInCents) / 100,
          yAxisIndex: 0,
          borderColor: '#4F4ACC',
          strokeDashArray: 4,
          label: {
            borderColor: '#4F4ACC',
            position: 'right',
            text: `$${priceInCents / 100} @ ${formatNumber(details.notionalValueInCentsSum / 100)}`,
            style: {
              color: '#ffffff',
              background: '#4F4ACC',
            },
          },
        }));

        setData(formattedData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
  
      fetchData();

      const intervalId = setInterval(fetchData, 120000);
      
      return () => clearInterval(intervalId);
    
  }, [props.filters?.symbol, props.filters?.interval]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div className="h-full">
      {!loading ? (
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height="100%"
          width="100%"
        />
      ) : (
        <div>No data available.</div>
      )}
    </div>
  );
}
