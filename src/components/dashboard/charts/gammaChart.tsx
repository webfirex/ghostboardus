'use client';

import { fetchGamma } from '@/utils/modules/fetchGamma';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';

type GammaProps = {
  symbol?: string | null
}

export default function GammaChart(props: GammaProps) {
  const [chartOptions, setChartOptions] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const gammaData = await fetchGamma({
          symbol: props.symbol,
        });

        const { symbols, c, p } = gammaData;

        if (typeof window !== 'undefined') {
          setChartOptions({
            style: {
                height: '100%',
                maxHeight: '300px'
            },
            chart: {
              type: 'column',
              zoomType: 'x',
              panning: true,
              panKey: 'shift',
              backgroundColor: '#1e1e2f00',
              borderColor: '#ffffff30',
              borderWidth: 0,
              events: {
                load: function (this: Highcharts.Chart) {
                  const chart = this;
                  chart.xAxis[0].setExtremes(symbols.length - 30, symbols.length);
                  chart.showResetZoom();
                  // setInterval(function () {
                  //   const x = (new Date()).getTime(), // current time
                  //       y = Math.round(Math.random() * 100),
                  //       y2 = Math.round(Math.random() * -100);
                  //       chart?.series?.length > 0 ? chart.series[0]?.addPoint([y], true) : null;
                  //       chart?.series?.length > 0 ? chart.series[1]?.addPoint([y2], true) : null;
                  //   }, 1000);
                }
              },
              style: {
                  height: '100%',
              },
            },
            title: {
              text: null,
              style: { color: '#ffffff' },
            },
            xAxis: {
              gridLineColor: '#000',
              categories: symbols,
              title: {
                text: null,
              },
              minRange: 1,
              labels: {
                formatter: function (this: Highcharts.AxisLabelsFormatterContextObject): string {
                  const value = parseFloat(this.value as string) / 100;
                  return value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
                },
                style: {
                  color: '#ffffff',
                },
              },
              lineColor: '#ffffff00',
            },
            yAxis: {
              gridLineColor: '#ffffff30',
              title: {
                text: null,
              },
              labels: {
                style: {
                  color: '#ffffff',
                },
              },
              plotLines: [
                {
                  value: 0,
                  width: 2,
                  color: '#ffffff30',
                },
              ],
            },
            tooltip: {
              shared: true,
              backgroundColor: '#333333',
              borderColor: '#ffffff00',
              style: {
                color: '#ffffff',
              },
            },
            plotOptions: {
              series: {
                stacking: 'normal',
              },
            },
            series: [
              {
                name: 'CALL',
                data: c,
                color: '#70FF6650',
                borderWidth: 0,
              },
              {
                name: 'PUT',
                data: p,
                color: '#d60000',
                borderWidth: 0,
              },
            ],
            legend: {
              backgroundColor: '#00000000',
              enabled: false,
              itemStyle: {
                color: '#ffffff',
              },
            },
            credits: {
              enabled: false,
            },
          });
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // const intervalId = setInterval(fetchData, 60000);

    // return () => clearInterval(intervalId);
  }, [props.symbol]);

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='h-full'>
      {chartOptions ? (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      ) : (
        <div>No data available.</div>
      )}
    </div>
  );
}
