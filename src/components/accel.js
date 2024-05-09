import React, { useEffect, useState } from 'react';
import { PubSub } from 'aws-amplify';
import Card from 'react-bootstrap/Card';

function XYZSensors() {
    const [sensorData, setSensorData] = useState({
        xaxis: 0,
        yaxis: 0,
        zaxis: 0,
    });

    useEffect(() => {
        const subscription = PubSub.subscribe('device/12/data').subscribe({
            next: data => {
                try {
                    const parsedData = typeof data.value === 'object' ? data.value : JSON.parse(data.value);
                    const { xaxis, yaxis, zaxis } = parsedData;
                    setSensorData({
                        xaxis: xaxis || 0,
                        yaxis: yaxis || 0,
                        zaxis: zaxis || 0,
                    });
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
        <div className="Sensor">
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Accelerometer</Card.Title>
                    <Card.Text>
                        X-axis: {sensorData.xaxis.toFixed(2)}<br />
                        Y-axis: {sensorData.yaxis.toFixed(2)}<br />
                        Z-axis: {sensorData.zaxis.toFixed(2)}
                    </Card.Text>
                </Card.Body>
            </Card>
            <style jsx>{
                `
                .Sensor {
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                    transition: 0.3s;
                }
                
                .Sensor:hover {
                    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
                }
                `
            }
            </style>
        </div>
    );
}

export default XYZSensors;
