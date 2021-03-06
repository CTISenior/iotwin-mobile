import * as React from 'react';
import {
  Button,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { List } from 'react-native-paper';

const Devices = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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
        <List.Item
          style={{ width: 200 }}
          title="Device 2"
          description="B Building"
          left={(props) => <List.Icon {...props} icon="radio-tower" />}
        />
      </View>
      <TouchableOpacity
        style={{
          bottom: 0,
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
        <Text style={{ fontSize: 20 }}>Go to Dashboard</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Devices;
/*
        <Button
          title="Go to Dashboard"
          onPress={() => navigation.navigate('Dashboard')}
        />
        */
