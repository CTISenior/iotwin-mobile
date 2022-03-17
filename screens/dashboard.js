import * as React from 'react';
import { Button, View, Text, Picker, SafeAreaView } from 'react-native';
import LineChart from '../screens/Chart';
import { List, Divider } from 'react-native-paper';

const Dashboard = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <List.AccordionGroup>
            <View>
              <Text
                style={{
                  width: 300,
                  fontSize: 25,
                  textAlign: 'center',
                  marginBottom: 16,
                }}>
                YOUR DEVICES
              </Text>
              <List.Accordion title="Device 1" id="1">
                <Button
                  onPress={() => navigation.navigate('Devices')}
                  title="See the Graph"
                />
              </List.Accordion>
              <Divider />
              <Divider />
              <Divider />
              <List.Accordion title="Device 2" id="3">
                <Button
                  onPress={() => navigation.navigate('Devices')}
                  title="See the Graph"
                />
              </List.Accordion>
            </View>
          </List.AccordionGroup>
        </View>
      </View>
      <Button
        onPress={() => navigation.navigate('Devices')}
        title="Go to Devices Screen"
      />
    </SafeAreaView>
  );
};

export default Dashboard;
