import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Alert,
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

const DeleteNotificationDialog = ({
  visible,
  hideModal,
  containerStyle,
  deleteNotification,
  id,
}) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <Dialog.Title>Delete notification {id}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            Are you sure you want to delete this notification?
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideModal}>Cancel</Button>
          <Button onPress={() => deleteNotification(id)}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
export default DeleteNotificationDialog;
