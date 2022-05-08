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
  const [sn, setSn] = useState("");
  const [assetName, setAssetName] = useState("");
  const [name, setName] = useState("");
  const [sensorTypes, setSensorTypes] = useState([]);
  const [updateHeat, setUpdateHeat] = useState(0);
  const [updateHum, setUpdateHum] = useState(0);

  React.useEffect(() => {
    getDeviceInformation();
    socket.emit("telemetry_topic", props.deviceSn);
    socket.on("telemetry_topic_message", function (msg) {

      let info = JSON.parse(msg);
      const date = new Date();
      if (tempLabel.length > 5) {
        tempLabel.shift();
        if (temp.length > 0)
          temp.shift();
        if (hum.length > 0)
          hum.shift();
      }
      if (!info.values.temperature.includes("{")) {
        temp.push(parseFloat(info.values.temperature));
        setUpdateHeat((prev) => prev + 1);
      }
      if (!info.values.humidity.includes("{")) {
        hum.push(parseFloat(info.values.humidity));
        setUpdateHum((prev) => prev + 1);
      }
      tempLabel.push(date.getHours() + ":" + date.getMinutes());
    });
  }, []);

  const getDeviceInformation = async () => {

    fetch(`http://176.235.202.77:4000/api/v1/devices/${props.deviceSn}`)
      .then((response) => response.json())
      .then((json) => {
        setSn(json.sn);
        setName(json.name);
        setAssetName(json.asset_name);
        setSensorTypes(json.sensor_types);
      })
  };

  const [tempChart, setTempChart] = useState({
    labels: [0],
    datasets: [
      {
        label: 'Temperature',
        data: [0],
        borderColor: '#FF0000',
        fill: true,
      },
    ],
  })
  const [humChart, setHumChart] = useState({
    labels: [0],
    datasets: [
      {
        label: 'Humidity',
        data: [0],
        borderColor: '#FF0000',
        fill: true,
      },
    ],
  })

  React.useEffect(() => {
    if (temp.length > 1) {
      setTempChart({
        labels: tempLabel,
        datasets: [
          {
            label: 'Temperature',
            data: temp,
            fill: true,
          },
        ],
      })
    }
  }, [updateHeat])
  React.useEffect(() => {
    if (hum.length > 1) {
      setHumChart({
        labels: tempLabel,
        datasets: [
          {
            label: 'Humidity',
            data: hum,
            fill: true,
          },
        ],
      })
    }

  }, [updateHum])

  const chartConfig_temp = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };
  const chartConfig_hum = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(62, 149, 205, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <View style={styles.container}>
      <>
        <Text>Temperature</Text>
        <LineChart
          data={tempChart}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig_temp}
          yAxisSuffix=" C°"
        />
        <Text>Humidity</Text>
        <LineChart
          data={humChart}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig_hum}
          yAxisSuffix=" C°"
        />
      </>
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
