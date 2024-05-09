import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    if (chartInstance.current) {
      chartInstance.current.data.labels = data.labels;
      chartInstance.current.data.datasets = data.datasets;
      chartInstance.current.update();
    } else {
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        },
      });
    }
  }, [data]);

  return (
    <div style={{ maxWidth: '750px', maxHeight: '300px', marginBottom: '9.375rem' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default PieChart;
