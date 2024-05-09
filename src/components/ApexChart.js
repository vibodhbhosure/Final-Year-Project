import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

export function ApexChart(props) {
  const [chartData, setChartData] = useState({
    series: [{ data: props.args }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Humidity',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: Array.from({ length: props.args.length }, (_, i) => String(i + 1)), // Dynamically generate x-axis labels
      },
    },
  });

  useEffect(() => {
    setChartData((prevChartData) => ({
      ...prevChartData,
      series: [{ data: props.args }],
    }));
  }, [props.args]);

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} width={700} />
    </div>
  );
}
