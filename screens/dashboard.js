import React from 'react';
import { useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Button,
  Icon,
  Text,
  Alert,
  Picker,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import LineChart from '../screens/Chart';
import { Card, IconButton, Colors, List, Divider } from 'react-native-paper';
import Snackbar from 'react-native-snackbar-component';

import axios from 'axios';

const showAlert = () =>
  Alert.alert('Warning', 'The temperature was reached 40 degree at B Building.', [
    {
      text: 'Ok',
      onPress: () => Alert.alert('Warning Seen and Deleted.'),
      style: 'cancel',
    },
  ]);

const AllDevices = () => (
  <View>
    <Text>AAAAAA</Text>
  </View>
);

const Dashboard = ({ navigation }) => {
  const [snackIsVisible, setSnackIsVisible] = useState(true);
  const [distance, setDistance] = useState(0);

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View>
          <Snackbar
            style={{}}
            visible={snackIsVisible}
            textMessage="You have 1 more notification."
            actionHandler={() => {
              showAlert();
              setSnackIsVisible(false);
            }}
            actionText="OK"
            distanceCallback={(distance) => {
              setDistance(distance);
            }}
          />
          <IconButton
            style={{
              left: 280,
            }}
            icon="bell"
            color={Colors.red500}
            size={50}
            onPress={showAlert}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <List.AccordionGroup>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  width: 400,
                  fontSize: 35,
                  textAlign: 'center',
                  marginBottom: 0,
                  backgroundColor: '#00FF7F',
                  borderRadius: 50,
                }}>
                YOUR DEVICES
              </Text>
              <List.Accordion title="Device 1" id="1">
                <TouchableOpacity
                  style={{
                    left: 100,
                    bottom: 0,
                    borderWidth: 0,
                    borderColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 200,
                    height: 30,
                    backgroundColor: '#00FF7F',
                    borderRadius: 50,
                  }}
                  onPress={() => navigation.navigate('Modal')}>
                  <Text>See Graph</Text>
                </TouchableOpacity>
              </List.Accordion>
              <Divider />
              <Divider />
              <Divider />
              <List.Accordion title="Device 2" id="2">
                <TouchableOpacity
                  style={{
                    left: 100,
                    bottom: 0,
                    borderWidth: 0,
                    borderColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 200,
                    height: 30,
                    backgroundColor: '#00FF7F',
                    borderRadius: 50,
                  }}
                  onPress={() => navigation.navigate('Modal')}>
                  <Text>See Graph</Text>
                </TouchableOpacity>
              </List.Accordion>
            </View>
          </List.AccordionGroup>
        </View>
      </View>
      <TouchableOpacity
        style={{
          left: 70,
          bottom: 70,
          borderWidth: 0,
          borderColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
          width: 250,
          height: 40,
          backgroundColor: '#00FF7F',
          borderRadius: 50,
        }}
        onPress={() => navigation.navigate('Devices')}>
        <Text style={{ fontSize: 20 }}>See Graph of All Devices</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Dashboard;

/*   const deviceList = [];

  axios
    .get('http://176.235.202.77:4000/api/v1/devices')
    .then((response) => {
      console.log(response);
      response.data.forEach((element) => {
        const temp = {
          id: element.id,
          name: element.name,
          sn: element.sn,
          protocol: element.protocol,
          model: element.model,
          type: element.type.join('-'),
          building_id: element.building_id,
          description: element.description ? element.description : '-',
          created_at: element.created_at,
          status: element.status,
        };
        deviceList.push(temp);
      });
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });

  const ShowDevice = () => (
    //   deviceList.map((element) => {
    //  for(let i = 0;i < 5; i++)
    <View>
      <List.Accordion title={deviceList} id="3">
        <TouchableOpacity
          style={{
            left: 100,
            bottom: 0,
            borderWidth: 0,
            borderColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
            width: 200,
            height: 30,
            backgroundColor: '#00FF7F',
            borderRadius: 50,
          }}
          onPress={() => navigation.navigate('Modal')}>
          <Text>See Graph</Text>
        </TouchableOpacity>
      </List.Accordion>
    </View>
  );
//   });*/
