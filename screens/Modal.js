import * as React from 'react';
import {
  Alert,
  Button,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LineChart from '../screens/Chart';
import { List, Card } from 'react-native-paper';
import axios from 'axios';

const Modal = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
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
        <Text style={{bottom: 150, color: 'red'}}>Temperature</Text>
        <Text style={{bottom: 150, color: 'rgb(0,255,0)'}}>Humidity</Text>
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
        onPress={() => {
          navigation.navigate('Dashboard');
        }}>
        <Text style={{ fontSize: 20 }}>Go to Dashboard</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Modal;
/*         const callApi = () => {
    axios
      .get('http://webcode.me')
      .then(function (response) {
        Alert.alert(JSON.stringify(response.data));
      })
      .catch(function (error) {
        Alert.alert('error');
      });
  };
        <Button
          title="Go to Dashboard"
          onPress={() => navigation.navigate('Dashboard')}
        />
        */
