import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import LineChart from '../screens/Chart';
import { List, Colors, Avatar } from 'react-native-paper';
const Modal = ({ route, navigation }) => {
  const { deviceName, deviceSn } = route.params;
  console.log(deviceSn)

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.cardComponent}>
            <View style={styles.cardItem}>
              <Avatar.Icon icon="access-point" color="white" backgroundColor={"#2e323c"} size={70} style={styles.cardItemIcon} />
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemContentHeader}>Device ID</Text>
                <Text style={styles.cardItemContentText}>{deviceSn}</Text>
              </View>
            </View>
            <View style={styles.cardItem}>
              <Avatar.Icon icon="access-point" color="white" backgroundColor={"#2e323c"} size={70} style={styles.cardItemIcon} />
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemContentHeader}>Device Name</Text>
                <Text style={styles.cardItemContentText}>{deviceName}</Text>
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
            <LineChart deviceSn={deviceSn} />
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
    backgroundColor: '#7FFF00',
  },
});
