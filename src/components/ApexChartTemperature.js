import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { PubSub } from 'aws-amplify';

export function ApexChartTemperature(props) {
  const [temperatureArr, setTemperatureArr] = useState([0, 0, 0, 0, 0]);
  const [dataPoints, setDataPoints] = useState([
    { value: 0, timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) },
    { value: 0, timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) },
    { value: 0, timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) },
    { value: 0, timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) },
    { value: 0, timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) },
  ]);

  const [chartData, setChartData] = useState({
    series: [{ data: temperatureArr }],
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
        text: 'Body Temperature',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: dataPoints.map(point => point.timestamp), // Use timestamps as x-axis labels
      },
    },
  });

  useEffect(() => {
    setChartData((prevChartData) => ({
      ...prevChartData,
      series: [{ data: temperatureArr }],
      options: {
        ...prevChartData.options,
        xaxis: {
          ...prevChartData.options.xaxis,
          categories: dataPoints.map(point => point.timestamp),
        },
      },
    }));
  }, [temperatureArr, dataPoints]);

  useEffect(() => {
    const subscription = PubSub.subscribe('device/12/data').subscribe({
      next: data => {
        try {
          const sensorData = typeof data.value === 'object' ? data.value : JSON.parse(data.value);
          const temperatureValue = parseFloat(sensorData.temperature);
          if (!isNaN(temperatureValue)) {
            setTemperatureArr(prevArr => {
              const newArr = [...prevArr, temperatureValue]; // Append new value
              newArr.shift(); // Remove the first value
              return newArr;
            });
            setDataPoints(prevPoints => {
              const newPoints = [
                ...prevPoints.slice(1),
                { value: temperatureValue, timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) },
              ];
              return newPoints;
            });
          }
        } catch (error) {
          console.log("Error parsing data:", error);
        }
      },
      error: error => {
        console.error("Subscription error:", error);
      },
      close: () => {
        console.log('Subscription closed');
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div id="chart" style={{ maxWidth: '700px', maxHeight: '300px', marginBottom: '9.375rem' }}>
      <ReactApexChart options={chartData.options} series={chartData.series} type="line" style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
