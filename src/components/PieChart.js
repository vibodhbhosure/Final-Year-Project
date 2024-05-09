import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

const StandingLyingChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['Standing Time', 'Lying Time'],
    datasets: [
      {
        label: 'Time (in minutes)',
        data: [1, 1], // Initial data for standing and lying time
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)', // Red color for standing time
          'rgba(54, 162, 235, 0.5)', // Blue color for lying time
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Fetch standing and lying time data from your API
    fetch('https://jc14ws0h94.execute-api.us-east-1.amazonaws.com/default/todayStandLy?deviceId=12') // Update with your API endpoint
      .then(response => response.json())
      .then(data => {
        if (data) {
          // Update chart data with fetched values
          setChartData(prevChartData => ({
            ...prevChartData,
            datasets: [
              {
                ...prevChartData.datasets[0],
                data: [data.standing_time, data.lying_time],
              },
            ],
          }));
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Standing and Lying Time</h2>
      <Pie data={chartData} style={{ maxWidth: '750px', maxHeight: '300px', marginBottom: '9.375rem' }} />
    </div>
  );
};

export default StandingLyingChart;
