import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { PubSub } from 'aws-amplify';

export function ApexChartHumidity(props) {
  const [dataPoints, setDataPoints] = useState([
    { value: 0, timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) },
    { value: 0, timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) },
    { value: 0, timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) },
    { value: 0, timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) },
    { value: 0, timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) },
  ]);

  const [chartData, setChartData] = useState({
    series: [{ data: dataPoints.map(point => point.value) }],
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
        categories: dataPoints.map(point => point.timestamp),
      },
    },
  });

  useEffect(() => {
    setChartData((prevChartData) => ({
      ...prevChartData,
      series: [{ data: dataPoints.map(point => point.value) }],
      options: {
        ...prevChartData.options,
        xaxis: {
          ...prevChartData.options.xaxis,
          categories: dataPoints.map(point => point.timestamp),
        },
      },
    }));
  }, [dataPoints]);

  useEffect(() => {
    const subscription = PubSub.subscribe('device/12/data').subscribe({
      next: data => {
        try {
          const sensorData = typeof data.value === 'object' ? data.value : JSON.parse(data.value);
          const humidityValue = parseFloat(sensorData.humidity);
          if (!isNaN(humidityValue)) {
            setDataPoints(prevPoints => {
              const newPoints = [
                ...prevPoints.slice(1),
                { value: humidityValue, timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) },
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
