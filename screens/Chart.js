import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  LineChart,
} from 'react-native-chart-kit';
import io from 'socket.io-client';
const socket = io('http://176.235.202.77:4001/');

const temp = [];
const hum = [];
const tempLabel = [];

export default function App(props) {
  const { id } = props;
  socket.emit('telemetry_topic', id);

  socket.on('telemetry_topic_message', function (msg) {
    let info = JSON.parse(msg);
    console.log(info);
    console.log(temp);
    const date = new Date();
    if (tempLabel.length > 15) {
      tempLabel.shift();
      temp.shift();
    }
    temp.push(info.temperature);
    tempLabel.push(date.getHours() + ':' + date.getMinutes());
  });
  const [chart, setChart] = useState({
    labels: [],
    datasets: [
      {
        label: 'Temperature',
        data: [],
        borderColor: '#FF0000',
        fill: true,
      },
      {
        label: 'Humidity',
        data: [],
        borderColor: '#3e95cd',
        fill: true,
      },
    ],
  });
  useEffect(() => {
    // setTimeout(() => {
    setChart(
      {
        labels: tempLabel,
        datasets: [
          {
            label: 'Temperature',
            data: temp,
            borderColor: '#FF0000',
            fill: true,
          },
          {
            label: 'Humidity',
            data: hum,
            borderColor: '#3e95cd',
            fill: true,
          },
        ],
      },
      [tempLabel, temp, hum]
    );
    // }, 500)
  }, [temp]);
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: 'red',
  };
  return (
    <View style={styles.container}>
      <LineChart
        data={chart}
        width={400}
        height={220}
        chartConfig={chartConfig}
      />
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
