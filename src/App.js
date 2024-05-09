import React from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Sensors from "./components/sensorData";
import Navb from "./components/AdminNavbar";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui/dist/styles.css";
import XYZSensors from "./components/accel";
import HumiditySensor from "./components/humidityData";
import AmbientSensor from "./components/ambientTemp";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import { ApexChart } from "./components/ApexChart";

Amplify.configure(awsconfig);

Auth.currentCredentials().then((creds) => console.log(creds));

// Define the months function
const months = ({ count }) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const labels = [];
  for (let i = count - 1; i >= 0; i--) {
    const monthIndex = (currentDate.getMonth() - i + 12) % 12;
    labels.push(monthNames[monthIndex]);
  }
  return labels;
};

const labels = months({ count: 7 });
const barChartData = {
  labels: labels,
  datasets: [
    {
      label: "Average Temperature",
      data: [38, 37, 40, 39, 40, 38, 37],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
      ],
      borderWidth: 1,
    },
  ],
};

const barChartConfig = {
  type: "bar",
  data: barChartData,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

function App() {
  const sampleData = [10, 20, 30, 40, 50];
  // Pie chart data
  const pieChartData = {
    labels: ["Green", "Orange", "Alert"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(46, 204, 113)", // Green
          "rgb(255, 159, 64)", // Orange
          "rgb(255, 69, 0)", // Alert (Moderate Red)
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="App">
      <div>
        <Navb />
      </div>
      <Container className="p-4">
        <Row className="p-3 justify-content-md-center">
          <Col md="auto">
            {" "}
            <Sensors name="Temperature" unit="°C" />{" "}
          </Col>
          <Col md="auto">
            {" "}
            <HumiditySensor name="Humidity" unit="%" />{" "}
          </Col>
          <Col md="auto">
            {" "}
            <XYZSensors name="accel" />{" "}
          </Col>
          <Col md="auto">
            {" "}
            <AmbientSensor name="AmbientTemperature" unit="°F" />{" "}
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col md="6">
            <h1>Bar Chart</h1>
            <BarChart config={barChartConfig} data={barChartData} />
          </Col>
          <Col md="6">
            <h1>Pie Chart</h1>
            <PieChart data={pieChartData} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
        <ApexChart args={sampleData} />

        </Row>
      </Container>
    </div>
  );
}

export default withAuthenticator(App, true);
