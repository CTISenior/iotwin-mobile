import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  LineChart,
} from 'react-native-chart-kit';
import io from 'socket.io-client';
const socket = io('http://176.235.202.77:4001/');

const temp = [];
const hum = [];
const tempLabel = [];

export default function Chart(props) {
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
    socket.emit('telemetry_topic', [props.deviceSn]);
    socket.on('telemetry_topic_message', function (msg) {
      let info = JSON.parse(msg);
      console.log(info);
      const date = new Date();
      if (tempLabel.length > 15) {
        tempLabel.shift();
        temp.shift();
      }
      temp.push(info.values.temperature);
      console.log(temp);
      tempLabel.push(date.getHours() + ':' + date.getMinutes());
    });
    setTimeout(() => {
      setChart([temp]);
    }, 500);
    /*
    setTimeout(() => {

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
    }, 500)*/

  }, []);
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    backgroundColor: "#32CD32",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={chart}
        width={400}
        height={220}
        chartConfig={chartConfig}
      />
      <Text>{chart}</Text>
    </View>

  );
}
/*
<LineChart
        //data={chart}
        //width={400}
        //height={220}
        //chartConfig={chartConfig}
      />*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
