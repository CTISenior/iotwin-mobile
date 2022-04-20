import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Alert,
  FlatList,
  Text,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {
  List,
  Colors,
  Divider,
  Paragraph,
  Button,
  Modal,
  Portal,
  Dialog,
  Provider,
} from 'react-native-paper';
import { DeleteNotification, GetAllNotification } from './Fetch';

const Notification = ({ navigation }) => {
  //getting the list of notification from the backend
  const [allNotification, setAllNotification] = useState([]);
  const [alert, setAlert] = useState(false);
  const [selectedNotificationSerialNo, setSelectedNotificationSerialNo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isNotificationLoading, setIsNotificationLoading] = useState(false);
  const getNotification = () => {
    fetch('http://176.235.202.77:4000/api/v1/tenants/ctis/alerts')
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
        description={item.created_at}
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
            .finally(() => {
              setTimeout(() => {
                setAlert(false);
                setLoading(true);
              }, 500);
            })
            .then(() => {
              setTimeout(() => {
                setSelectedNotificationSerialNo(item.sn);
                const delNotify = allNotification.filter(
                  (notify) => notify.id !== item.id
                );
                setAllNotification(delNotify);
                setLoading(false);
                setAlert(true);
              }, 1500);
            });
        }}
      />
    );
  };
  const closeInfoText = () => {
    setAlert(false);
    setLoading(false);
  };

  //The notification listed on notification page

  return (
    <Provider>
      {loading ? (
        <View>
          <List.Item title="Loading..." />
        </View>
      ) : null}
      {alert ? (
        <View>
          <List.Item
            titleNumberOfLines={2}
            title={
              'The notification ' + selectedNotificationSerialNo + ' has been deleted'
            }
            labelStyle={{ fontSize: 50 }}
            left={(props) => (
              <List.Icon {...props} icon="information" color={Colors.blue500} />
            )}
            right={(props) => (
              <Button
                {...props}
                icon="close-thick"
                color={'#000'}
                labelStyle={{ fontSize: 25 }}
                onPress={closeInfoText}></Button>
            )}
          />
        </View>
      ) : null}
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
          <ScrollView>
            <FlatList
              data={allNotification}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={(item) => item.id}
            />
          </ScrollView>
        </List.AccordionGroup>
      ))}

    </Provider>
  );
};
export default Notification;

const styles = StyleSheet.create({
  navigationButton: {
    width: '50%',
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: '#228B22'
  },
  navigationButtonText: {
    fontSize: 25,
    padding: 5,
    color: '#FFFAF0',
    fontWeight: 'bold',
  },
  displayInfoText: {
    fontSize: 25,
    color: '#000'
  }
});
