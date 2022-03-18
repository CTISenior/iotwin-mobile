import * as React from 'react';
import {
  Button,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LineChart from '../screens/Chart';
import { List } from 'react-native-paper';

const Modal = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor:'white', flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <List.Item
            style={{ width: 200 }}
            title="Device 1"
            description="A Building"
            left={(props) => <List.Icon {...props} icon="radio-tower" />}
          />
          <LineChart />
        </View>
        <TouchableOpacity
          style={{
            bottom: 30,
            left: 100,
            marginTop: 10,
            borderWidth: 0,
            borderColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
            width: 200,
            height: 30,
            backgroundColor: '#00FF7F',
            borderRadius: 50,
          }}
          onPress={() => navigation.navigate('Dashboard')}>
          <Text style={{fontSize: 20}}>Go to Dashboard</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Modal;