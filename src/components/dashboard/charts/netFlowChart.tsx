'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { fetchNetFlow } from '@/utils/modules/fetchNetFLow';
import { formatNumber } from '@/utils/formatNumber';

// Import ApexCharts dynamically to prevent SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

type NetflowProps = {
  symbol?: string | null;
};

export default function NetFlowChart({ symbol = 'SPY' }: NetflowProps) {
  const [chartOptions, setChartOptions] = useState<any>(null);
  const [chartSeries, setChartSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [cValues, setCValues] = useState<number[]>([]);
  const [pValues, setPValues] = useState<number[]>([]);
  const [timestamps, setTimestamps] = useState<string[]>([]);
  const [stockPrices, setStockPrices] = useState<number[]>([]);

  // Fetch data function
  const fetchData: any = async () => {
    try {
      const netflowData = await fetchNetFlow({ symbol });

      if (!netflowData.response) throw new Error('No data available');

      const netDrift = netflowData.response.netDrift;

      let callNum = 0;
      let putNum = 0;

      const newCValues: number[] = [];
      const newPValues: number[] = [];
      const newTimestamps: string[] = [];
      const newStockPrices: number[] = [];

      netDrift.forEach((arr: any[]) => {
        callNum += Number(arr[1]) / 100;
        putNum += Number(arr[4]) / 100;
        newCValues.push(callNum);
        newPValues.push(putNum);
        newTimestamps.push(arr[0]);
        newStockPrices.push(arr[7] / 100);
      });

      setCValues(newCValues);
      setPValues(newPValues);
      setTimestamps(newTimestamps);
      setStockPrices(newStockPrices);

      // Set chart options and series for ApexCharts
      setChartOptions({
        series: [
          { name: 'Calls', data: newCValues,},
          { name: 'Puts', data: newPValues,}, 
          { name: 'Stock Prices', data: newStockPrices,}, 
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
        colors: ['#00FF00', '#FF0000', '#D3D3D350'],
        stroke: {
          width: 2,
          curve: 'straight',
        },
        xaxis: {
          categories: newTimestamps,
          labels: {
            formatter: function (value: any) {
              return value;
            },
            step: Math.ceil(newTimestamps.length / 15),
            floating: false,
            style: {
              fontSize: '8px',
              colors: '#ffffff',
            },
          },
          tickAmount: 10,
        },
        yaxis: [
          {
            title: { style: { color: '#ffffff' } },
            labels: {
              style: { colors: '#ffffff' },
              formatter(y: any) {
                return formatNumber(y);
              },
              forceNiceScale: true,
            },
            min: Math.min(...newCValues, ...newPValues),
            max: Math.max(...newCValues, ...newPValues),
          },
          {
            title: {show: false },
            labels: {
              show: false,
              style: { colors: '#ffffff' },
              formatter(y: any) {
                return formatNumber(y);
              },
              forceNiceScale: true,
            },
            show: false,
            min: Math.min(...newCValues, ...newPValues),
            max: Math.max(...newCValues, ...newPValues),
          },
          {
            opposite: true,
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
        { name: 'Calls', data: newCValues, },
        { name: 'Puts', data: newPValues, }, 
        { name: 'Stock Prices', data: newStockPrices,},
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
  }, [symbol]);

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
