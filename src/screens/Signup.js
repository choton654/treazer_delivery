import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Paragraph, Dialog, Portal } from "react-native-paper";
const Signup = ({ hideDialog, visible }) => {
  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>This is simple dialog</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({});
