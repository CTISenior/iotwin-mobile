import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  Input,
  NativeBaseProvider,
  Icon,
  Button,
  Box,
  Image,
  AspectRatio,
} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { alignContent, flex, flexDirection, width } from 'styled-system';

function Login() {
  this.state = {
    username: 'admin',
    password: 'Samet',
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.Middle}>
        <Text style={styles.LoginText}>IoTwin</Text>
      </View>
      {/* Username Input Field */}
      <View style={styles.buttonStyle}>
        <View style={styles.emailInput}>
          <Input
            InputLeftElement={
              <Icon
                as={<FontAwesome5 name="user-secret" />}
                size="sm"
                m={2}
                _light={{
                  color: 'black',
                }}
                _dark={{
                  color: 'gray.300',
                }}
              />
            }
            variant="outline"
            placeholder="Username"
            _light={{
              placeholderTextColor: 'blueGray.400',
            }}
            _dark={{
              placeholderTextColor: 'blueGray.50',
            }}
          />
        </View>
      </View>

      {/* Password Input Field */}
      <View style={styles.buttonStyleX}>
        <View style={styles.emailInput}>
          <Input
            InputLeftElement={
              <Icon
                as={<FontAwesome5 name="key" />}
                size="sm"
                m={2}
                _light={{
                  color: 'black',
                }}
                _dark={{
                  color: 'gray.300',
                }}
              />
            }
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            variant="outline"
            secureTextEntry={true}
            placeholder="Password"
            _light={{
              placeholderTextColor: 'blueGray.400',
            }}
            _dark={{
              placeholderTextColor: 'blueGray.50',
            }}
          />
        </View>
      </View>

      {/* Button */}
      <View style={styles.buttonStyle}>
        <TouchableOpacity
          style={{
            left: 50,
            bottom: 0,
            borderWidth: 0,
            borderColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
            width: 250,
            height: 50,
            backgroundColor: '#00FF7F',
            borderRadius: 50,
          }}
          onPress={() => navigation.navigate('Dashboard')}>
          <Text style={{fontSize: 30}}>Login</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Login />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  LoginText: {
    marginTop: 100,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00FF7F',
  },
  Middle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailInput: {
    marginTop: 10,
    marginRight: 5,
  },
  buttonStyle: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonStyleX: {
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonDesign: {
    backgroundColor: '#026efd',
  },
});
/*
      <View style={styles.text2}>
        <Text>Sign in as guest -></Text>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.signupText}> Sign In</Text>
        </TouchableOpacity>
      </View>
*/
