'use client';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';

export default function SingleLineChart() {
  const [chartOptions, setChartOptions] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        (async () => {
          // Fetch the dataset
          const data = await fetch('https://demo-live-data.highcharts.com/aapl-c.json').then((response) =>
            response.json()
          );
    
          // Set the chart options
          setChartOptions({
            colors: ['#70FF6650', '#fb922c', '#d39d0a', '#2a8e4a', '#0f8cae', '#d60000'],
            style: {
                height: '100%',
            },
            chart: {
              backgroundColor: '#1e1e2f00',
              borderColor: '#ffffff30',
              borderWidth: 0,
              style: {
                fontFamily: 'Arial, sans-serif',
                height: '100%',
              }
            },
            rangeSelector: {
                selected: 0,
                labelStyle: {
                  color: '#ffffff',         // Range selector label color
                },
                inputStyle: {
                  color: '#fff',         // Input text color
                  backgroundColor: '#000', // Input background color
                },
                buttonTheme: {
                  fill: '#333333',          // Button background
                  style: {
                    color: '#ffffff',       // Button text color
                  },
                  states: {
                    hover: {
                      fill: '#555555',      // Hover background
                      style: {
                        color: '#ffffff',   // Hover text color
                      },
                    },
                  },
                },
            },
            xAxis: {
              gridLineColor: '#000',
              labels: {
                style: {
                  color: '#ffffff',
                },
              },
              lineColor: '#ffffff00',
            },
            yAxis: {
              
              labels: {
                style: {
                  color: '#ffffff',
                },
              },
              lineColor: '#ffffff',
            },
            tooltip: {
              backgroundColor: '#333333',
              borderColor: '#ffffff00',
              style: {
                color: '#ffffff',
              },
            },
            legend: {
              backgroundColor: '#fff',
              itemStyle: {
                color: '#ffffff',
              },
            },
            series: [
              {
                name: 'SPY',
                data: data,
                tooltip: {
                  valueDecimals: 2,
                },
                marker: {
                    lineColor: '#fff'
                }
              },
            ],
          });
        })();
    }
  }, [window]);

  if (!chartOptions) {
    return <div>Loading...</div>;
  }

  return (
    <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={chartOptions} />
  );
};
