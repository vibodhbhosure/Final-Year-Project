import React, { useEffect, useState } from 'react';
import { PubSub } from 'aws-amplify';
import Card from 'react-bootstrap/Card';

function AmbientSensor() {
    const [ambientTemp, setAmbientTemp] = useState(0);

    useEffect(() => {
        const subscription = PubSub.subscribe('device/12/data').subscribe({
            next: data => {
                try {
                    const sensorData = typeof data.value === 'object' ? data.value : JSON.parse(data.value);
                    const temp = parseFloat(sensorData.ambienttemperature);
                    if (!isNaN(temp)) {
                        setAmbientTemp(temp.toFixed(2)); // Format to two decimal places
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
        <div className="Sensor">
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Ambient Temperature</Card.Title>
                    <Card.Text>
                        {ambientTemp}&deg;C
                        <br/>
                        <br/>
                        <br/>
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

export default AmbientSensor;
