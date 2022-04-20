import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,

  StyleSheet,
} from 'react-native';
import LineChart from '../screens/Chart';
import { List, Colors } from 'react-native-paper';
const Modal = ({ route, navigation }) => {
  const { deviceName, deviceType, deviceBuilding, deviceSn } = route.params;

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.cardComponent}>
          <View style={styles.cardItem}>
            <List.Icon color={Colors.white} icon="access-point" />
            <View style={styles.cardItemContent}>
              <Text style={styles.cardItemContentHeader}>Device ID</Text>
              <Text style={styles.cardItemContentText}>{deviceSn}</Text>
            </View>
          </View>
          <View style={styles.cardItem}>
            <List.Icon color={Colors.white} icon="access-point" />
            <View style={styles.cardItemContent}>
              <Text style={styles.cardItemContentHeader}>Device Name</Text>
              <Text style={styles.cardItemContentText}>{deviceName}</Text>
            </View>
          </View>
          <View style={styles.cardItem}>
            <List.Icon color={Colors.white} icon="thermometer-lines" />
            <View style={styles.cardItemContent}>
              <Text style={styles.cardItemContentHeader}>Max Heat</Text>
              <Text style={styles.cardItemContentText}>{deviceName}</Text>
            </View>
          </View>
          <View style={styles.cardItem}>
            <List.Icon color={Colors.white} icon="thermometer-lines" />
            <View style={styles.cardItemContent}>
              <Text style={styles.cardItemContentHeader}>Average Heat</Text>
              <Text style={styles.cardItemContentText}>{deviceName}</Text>
            </View>
          </View>
        </View>
        <View style={styles.chart}>
          <LineChart />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Modal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
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
    margin: 3,
    padding: 5,
    flexDirection: 'row',
    marginTop: 15,
    color: 'white',
  },
  cardItemContent: {
    flexDirection: 'column',
    paddingRight: 45,
  },
  cardItemContentHeader: {
    fontSize: 18,
    color: '#7FFF00',
    marginBottom: 5,
  },
  cardItemContentText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  chart: {
    marginTop: 100,
    width: '100%',
    backgroundColor: '#7FFF00',
  },
});
