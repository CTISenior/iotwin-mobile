import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  LineChart,
} from 'react-native-chart-kit';
import io from 'socket.io-client';
import { Dimensions } from "react-native";

const socket = io('http://176.235.202.77:4001/');

const temp = [];
const hum = [];
const tempLabel = [];

export default function Chart(props) {
  const screenWidth = Dimensions.get("window").width - Dimensions.get("window").width * 0.05;
  const [updateHeat, setUpdateHeat] = useState(0);
  const [updateHum, setUpdateHum] = useState(0);
  const types = "humidity"
  const [chart, setChart] = useState({
    labels: [0],
    datasets: [
      {
        label: 'Temperature',
        data: [0],
        borderColor: '#FF0000',
        fill: true,
      },
    ],
  });
  const [number, setNumber] = useState([]);
  useEffect(() => {
    let count = 1;

    setInterval(() => {
      let value = Math.floor(Math.random() * 40) + 30;
      let label = count++;

      tempLabel.push(label);
      temp.push(value);

      setChart({
        labels: tempLabel,
        datasets: [
          {
            label: 'Temperature',
            data: temp,
            fill: true,
          },
        ],
      })
    }, 2000);

  }, [])

  const chartConfig_temp = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };
  const chartConfig1_hum = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(62, 149, 205, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <View style={styles.container}>
      {types.includes('temperature') &&
        <>
          <Text>Temperature</Text>
          <LineChart
            data={chart}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig_temp}
            yAxisSuffix=" C° "
          />
        </>

      }
      {types.includes('humidity') &&
        <>
          <Text>Humidity</Text>
          <LineChart
            data={chart}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig1_hum}
            yAxisSuffix=" C°"
          />
        </>
      }

    </View>




  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
