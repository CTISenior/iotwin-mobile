import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Icon,
  Text,
  Alert,
  Picker,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import LineChart from '../screens/Chart';
import {
  Card,
  IconButton,
  Colors,
  List,
  Avatar,
  Button,
  Title,
  Paragraph,
  Content,
} from 'react-native-paper';

const AllDevices = (props) => (
  <>
    {props.allDevices.map((element) => {

      return (
        <Card
          key={element.id}
          mode="outlined"
          style={{
            margin: 3,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '48%',
            marginTop: 5,
          }}>
          <Card.Content style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <Avatar.Icon {...props} icon="access-point" color="#2e323c" backgroundColor="white" size={100} />
            <Paragraph style={{ fontSize: 18, textAlign: 'center' }}> {element.name}</Paragraph>
            <Paragraph style={{ fontSize: 14, textAlign: 'center' }}>
              {element.types.join('&')}
            </Paragraph>
          </Card.Content>
          <Card.Actions style={{ justifyContent: 'center' }}>
            <Button
              icon="chart-line-variant"
              color={'#2e323c'}
              labelStyle={{ fontSize: 30 }}
              onPress={() =>
                props.navigation.navigate('Modal', {
                  deviceName: element.name,
                  deviceSn: element.sn,
                })
              }></Button>
          </Card.Actions>
        </Card>
      );
    })}
  </>
);

const Dashboard = ({ navigation }) => {
  const [allDevices, setAllDevices] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const tenantID = "ctis";
  const getDevices = () => {
    fetch(`http://176.235.202.77:4000/api/v1/tenants/${tenantID}/devices`)
      .then((response) => response.json())
      .then((json) => setAllDevices(json))
      .catch((error) => console.error(error))
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
      getDevices();
    }, 500);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ebeced',
          }}>
          {isLoading ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text
                style={{ textAlign: 'center', fontSize: 30, marginRight: 10 }}>
                Loading
              </Text>
              <ActivityIndicator size="large" color="#008000" />
            </View>
          ) : (
            allDevices.length > 0 && (
              <List.AccordionGroup>
                <ScrollView>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}>
                    <AllDevices navigation={navigation} allDevices={allDevices} />
                  </View>
                </ScrollView>
              </List.AccordionGroup>
            )
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Dashboard;
