import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  LineChart,
} from 'react-native-chart-kit';
import { List, Colors, Avatar } from 'react-native-paper';
import io from 'socket.io-client';
import { Dimensions } from "react-native";

const socket = io('http://176.235.202.77:4001/');

const temp = [];
const hum = [];
const tempLabel = [];
const Modal = ({ route, navigation }) => {
  const { deviceName, deviceSn } = route.params;

  const screenWidth = Dimensions.get("window").width - Dimensions.get("window").width * 0.05;
  const [sn, setSn] = useState("");
  const [assetName, setAssetName] = useState("");
  const [name, setName] = useState("");
  const [sensorTypes, setSensorTypes] = useState([]);
  const [updateHeat, setUpdateHeat] = useState(0);
  const [updateHum, setUpdateHum] = useState(0);

  useEffect(() => {
    getDeviceInformation();
    socket.emit("telemetry_topic", deviceSn);
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

    fetch(`http://176.235.202.77:4000/api/v1/devices/${deviceSn}`)
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

  useEffect(() => {
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
  useEffect(() => {
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
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.cardComponent}>
            <View style={styles.cardItem}>
              <Avatar.Icon icon="access-point" color="white" backgroundColor={"#2e323c"} size={70} style={styles.cardItemIcon} />
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemContentHeader}>Device ID</Text>
                <Text style={styles.cardItemContentText}>{sn}</Text>
              </View>
            </View>
            <View style={styles.cardItem}>
              <Avatar.Icon icon="access-point" color="white" backgroundColor={"#2e323c"} size={70} style={styles.cardItemIcon} />
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemContentHeader}>Device Name</Text>
                <Text style={styles.cardItemContentText}>{name}</Text>
              </View>
            </View>
            <View style={styles.cardItem}>
              <Avatar.Icon icon="thermometer-lines" color="white" backgroundColor={"#2e323c"} size={70} style={styles.cardItemIcon} />
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemContentHeader}>Max Heat</Text>
                <Text style={styles.cardItemContentText}>{deviceName}</Text>
              </View>
            </View>
            <View style={styles.cardItem}>
              <Avatar.Icon icon="thermometer-lines" color="white" backgroundColor={"#2e323c"} size={70} style={styles.cardItemIcon} />
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemContentHeader}>Average Heat</Text>
                <Text style={styles.cardItemContentText}>{deviceName}</Text>
              </View>
            </View>
          </View>
          <View style={styles.chart}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Modal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardComponent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '100%',
  },
  cardItem: {
    width: '48%',
    backgroundColor: '#2e323c',
    marginLeft: 4,
    marginTop: 4,
    padding: 4,
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
  },
  cardItemContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardItemContentHeader: {
    fontSize: 18,
    color: '#ebeced',
    marginBottom: 5,
  },
  cardItemContentText: {
    fontSize: 16,
    color: '#ebeced',
    marginBottom: 5,
  },
  cardItemIcon: {
    marginBottom: 1
  },
  chart: {
    marginTop: 50,
    width: '100%',
  },
});
