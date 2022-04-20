import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import { IconButton, Colors, Button, Badge, Portal, Dialog, Provider, Paragraph } from 'react-native-paper';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import Modal from './screens/Modal';
import Notification from './screens/Notification';
import { DeleteNotification } from './screens/Fetch';
const navigationRef = createNavigationContainerRef()


async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

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
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          title: '', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
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
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
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
  const getNotification = () => {
    fetch('http://176.235.202.77:4000/api/v1/alerts')
      .then((response) => response.json())
      .then((json) => setAllNotification(json))
  }
  useEffect(() => {
    setTimeout(() => {
      getNotification();
    }, 500);
  }, []);

  const deleteAllNotification = () => {
    {
      allNotification.map(element => {
        DeleteNotification(element.id)
          .then(() => {
            const delNotify = allNotification.filter(notify => notify.id !== element.id);
            setAllNotification(delNotify);
          })
      })
    }

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
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
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
