import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ToastAndroid
} from 'react-native';
import {
  List,
  Colors,
  Divider,
  Button,
  Provider,
} from 'react-native-paper';
import { DeleteNotification, GetAllNotification } from './Fetch';
import moment from "moment";
import { Snackbar } from 'react-native-paper';


const Notification = ({ navigation }) => {
  //getting the list of notification from the backend
  const [allNotification, setAllNotification] = useState([]);
  const [deleteNotificationResponse, setDeleteNotificationResponse] = useState("");
  const [isNotificationLoading, setIsNotificationLoading] = useState(false);
  const tenantID = "ctis";
  const getNotification = () => {
    fetch(`http://176.235.202.77:4000/api/v1/tenants/${tenantID}/alerts`)
      .then((response) => response.json())
      .then((json) => setAllNotification(json))
      .finally(() => {
        setTimeout(() => {
          setIsNotificationLoading(false);
        }, 1000);
      });
  };
  useEffect(() => {
    setTimeout(() => {
      getNotification();
      setIsNotificationLoading(true);
    }, 500);
  }, []);

  //created each item in the below Item
  const Item = ({ item, onPress }) => (
    <>
      <List.Item
        titleNumberOfLines={2}
        title={item.message}
        description={moment(item.timestamptz).format("Do MMMM YYYY, h:mm:ss a")}
        left={(props) => (
          <List.Icon
            {...props}
            icon={item.type === 'warning' ? 'alert' : 'alert-rhombus'}
            color={item.type === 'warning' ? Colors.orangeA700 : Colors.redA700}
          />
        )}
        right={(props) => (
          <Button
            {...props}
            icon="close-thick"
            color={'#000'}
            labelStyle={{ fontSize: 25 }}
            onPress={onPress}></Button>
        )}
      />
      <Divider />
    </>
  );
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          DeleteNotification(item.id)
            .then(response => response.text())
            .then(data => setDeleteNotificationResponse(data))
            .then(() => {
              setTimeout(() => {
                const delNotify = allNotification.filter(
                  (notify) => notify.id !== item.id
                );
                setAllNotification(delNotify);
              }, 500);
            }).finally(() => {
              if (Platform.OS != 'android')
                Snackbar.show({ text: { deleteNotificationResponse }, duration: Snackbar.LENGTH_SHORT });
              else
                ToastAndroid.show(deleteNotificationResponse, ToastAndroid.SHORT);
            })
        }
        }
      />
    );
  };

  //The notification listed on notification page

  return (
    <Provider>
      {isNotificationLoading ? (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, padding: 16 }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ebeced',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 30,
                    marginRight: 10,
                  }}>
                  Loading
                </Text>
                <ActivityIndicator size="large" color="#008000" />
              </View>
            </View>
          </View>
        </SafeAreaView>
      ) : (allNotification.length > 0 && (
        <List.AccordionGroup>
          <FlatList
            data={allNotification}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={(item) => item.id}
          />
        </List.AccordionGroup>
      ))}
    </Provider>
  );
};
export default Notification;
