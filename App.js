import React, { useState } from 'react';
import { StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native';
import DashboardScreen from './screens/dashboard';
import DevicesScreen from './screens/devices';
import BuildingsScreen from './screens/buildings';
import TemperatureScreen from './screens/temperature';
import LogoutScreen from './screens/logout';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createStackNavigator } from '@react-navigation/stack'

export default function App() {

  const MainStack = createStackNavigator();
  const Tabs = createBottomTabNavigator();

  const TabsScreen = () => (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: '#32CD32',
          borderBottomColor: '#0000'
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 30
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') {
            iconName = 'home';

          } else if (route.name === 'Devices') {
            iconName = 'fire';
          } else if (route.name === 'Buildings') {
            iconName = 'building';
          }
          else if (route.name === 'Temperature') {
            iconName = 'cog';
          }
          else {
            iconName = 'sign-out-alt';
          }
          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tabs.Screen name='Dashboard' component={DashboardScreen} />
      <Tabs.Screen name='Devices' component={DevicesScreen} />
      <Tabs.Screen name='Buildings' component={BuildingsScreen} />
      <Tabs.Screen name='Temperature & Humidity' component={TemperatureScreen} />
      <Tabs.Screen name='Logout' component={LogoutScreen} />
    </Tabs.Navigator>
  )
  return (
    <NavigationContainer>
      <MainStack.Navigator headerMode="none">
        <MainStack.Screen name='Tabs' component={TabsScreen} />
      </MainStack.Navigator>
    </NavigationContainer>

  );
}
const styles = StyleSheet.create({
  btnPress: {
    backgroundColor: 'red',
    fontSize: 40,
  }
});