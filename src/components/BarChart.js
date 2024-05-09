import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const BarChart = ({ config, data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: 'bar',
      data: data,
      options: config.options,
    });

    return () => {
      chartInstance.destroy(); // Destroy the chart instance when component unmounts
    };
  }, [config, data]);

  return <canvas ref={chartRef} />;
};

export default BarChart;
