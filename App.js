import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, Alert, Platform, ToastAndroid } from 'react-native';
import { IconButton, Colors, Button, Badge, Portal, Dialog, Provider, Paragraph } from 'react-native-paper';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import Modal from './screens/Modal';
import Notification from './screens/Notification';
import { DeleteNotification } from './screens/Fetch';
import { Snackbar } from 'react-native-paper';

const navigationRef = createNavigationContainerRef()
function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return <View style={{ flexDirection: 'row' }}></View>;
};
function LoginScreenStack({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}


function FirstScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard "
        component={Dashboard}
        options={{
          headerShown: false,
          title: '', //Set Header Title

        }}
      />
    </Stack.Navigator>
  );
}

function SecondScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Notification"
      screenOptions={{
        headerShown: false,

        headerStyle: {
          backgroundColor: '#2e323c', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          title: 'Notification', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}
//<Drawer.Screen name="A" component={LoginScreenStack} />
function App() {
  //getting the list of notification from the backend
  const [allNotification, setAllNotification] = useState([]);
  const [deleteNotificationResponse, setDeleteNotificationResponse] = useState("");
  const tenantID = "ctis";
  const getNotification = () => {
    fetch(`http://127.0.0.1:4000/api/v1/tenants/${tenantID}/alerts`)
      .then((response) => response.json())
      .then((json) => setAllNotification(json))
  }
  useEffect(() => {
    setTimeout(() => {
      getNotification();
    }, 500);
  }, []);

  const deleteAllNotification = () => {
    allNotification.map(element => {
      DeleteNotification(element.id)
        .then(response => response.text())
        .then(data => setDeleteNotificationResponse(data))
        .then(() => {
          setTimeout(() => {
            const delNotify = allNotification.filter(notify => notify.id !== element.id);
            setAllNotification(delNotify);
            navigate('Dashboard');
          }, 1000)
        }).finally(() => {
          if (Platform.OS != 'android')
            Snackbar.show({ text: { deleteNotificationResponse }, duration: Snackbar.LENGTH_SHORT });
          else
            ToastAndroid.show(deleteNotificationResponse, ToastAndroid.SHORT);

        })
    });
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Dashboard"
            component={FirstScreenStack}
            options={{
              headerRight: () => (
                <IconButton style={{ right: 10 }} icon="bell" color={Colors.red500} size={30}
                  onPress={() => navigate('Notification')} />),
              headerStyle: {
                backgroundColor: '#fff', //Set Header colo
              }
            }}
          />
          <Stack.Screen
            name="Notification"
            options={{
              drawerLabel: 'Notification',
              headerRight: () => (
                <Button icon="close" style={{ right: 8, backgroundColor: 'red', width: Platform.OS === 'ios' ? '87%' : '65%' }}
                  contentStyle={{ flexDirection: 'row-reverse' }}
                  labelStyle={{ color: '#fff' }}
                  mode="contained"
                  onPress={() => deleteAllNotification(allNotification)}>
                  Clear All
                </Button>
              ),
            }}
            component={SecondScreenStack} />
        </Stack.Group>
        <Stack.Group >
          <Stack.Screen
            name="Modal"
            options={{ title: 'Graph of Selected Device' }}
            component={Modal} />
        </Stack.Group>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
export default App;
