import * as React from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';
import LineChart from '../screens/Chart';
import {List} from 'react-native-paper';

const Devices = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <List.Item
            style={{width: 200}}
            title="Device 1"
            description="A Building"
            left={(props) => <List.Icon {...props} icon="radio-tower" />}
          />
          <LineChart />
          <List.Item
            style={{width: 200}}
            title="Device 2"
            description="B Building"
            left={(props) => <List.Icon {...props} icon="radio-tower" />}
          />
          <LineChart />
        </View>
        <Button
          title="Go to Dashboard"
          onPress={() => navigation.navigate('Dashboard')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Devices;