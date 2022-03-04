import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, Platform, StatusBar, View, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import io from 'socket.io-client/dist/socket.io';
import LineChart from '../charts/lineChart';

const image = { uri: "https://cdn.retarus.com/wp-content/uploads/sites/14/2018/06/retarus_use-case_iot.jpg" };
const socket = io("http://176.235.202.77:8080/", { transports: ['websocket', 'polling', 'flashsocket'] })
const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
const heat = [];
const hum = [];
const avg = 0;
const max = 0;

socket.on("getDeviceInfo", function (msg) {
  let info = JSON.parse(msg);
  if (parseInt(info.values.temperature) == 0) {
    hum.push(parseInt(info.values.humidity));
    avg = average(hum).toFixed(2);
    max = Math.max(...hum);
  }
  else if (parseInt(info.values.humidity) == 0) {
    heat.push(parseInt(info.values.temperature));
    avg = average(heat).toFixed(2);
    max = Math.max(...heat);
  }
});

export default class DashboardScreen extends Component {
  constructor() {
    super()
    this.state = {
      average: Math.trunc(Math.random() * 100 / 3),
      max: Math.trunc(Math.random() * 100 / 2)
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.displayFlex}>
              <View style={styles.widgetBoxes}>
                  <Text style={styles.widgetHeading}>DEVICE ID</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.widgetVal}>1</Text>
                    <Icon style={styles.widgetIconStyle} name="fire" size={30} />
                  </View>
              </View>
              <View style={styles.widgetBoxes}>
                <Text style={styles.widgetHeading}>Building</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.widgetVal}>CTIS</Text>
                  <Icon style={styles.widgetIconStyle} name="building" size={30} />
                </View>
              </View>
              <View style={styles.widgetBoxes}>
                <Text style={styles.widgetHeading}>Average Heat</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.widgetVal}>{this.state.average}</Text>
                  <Icon style={styles.widgetIconStyle} name="chart-line" size={30} />
                </View>
              </View>
              <View style={styles.widgetBoxes}>
                <Text style={styles.widgetHeading}>Humidity %</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.widgetVal}>{this.state.max}</Text>
                  <Icon style={styles.widgetIconStyle} name="chart-line" size={30} />
                </View>
              </View>
            </View>
            <LineChart />
          </ScrollView>
      </SafeAreaView >
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  displayFlex: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: '5%',
    marginBottom: '4%'
  },
  widgetBoxes: {
    backgroundColor: '#32CD32',
    width: '15%',
    height: '110%',
    padding: '3%',
    flexDirection: 'column',
    borderRadius: 40,
  },
  widgetHeading: {
    fontSize: 19,
    color: 'white',
    fontWeight: 'bold',
  },
  widgetIconStyle: {
    backgroundColor: '#32CD32',
    color: 'white',
    borderRadius: 25,
    width: '30%',
    height: '140%',
    textAlign: 'center',
    position: 'absolute',
    right: 10,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: '#32CD32'
  },
  widgetVal: {
    fontSize: 17,
    color: 'white',
    marginTop: 10
  }
});

