import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import {
  Button,
  TextInput,
  HelperText,
  Dialog,
  Portal,
} from "react-native-paper";
const { height } = Dimensions.get("window");

const Signup = ({ hideDialog, visible }) => {
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const fullnameErrors = () => {
    return phoneNo.includes("#");
  };
  const passwordErrors = () => {
    return phoneNo.includes("#");
  };
  const confirmPasswordErrors = () => {
    return phoneNo.includes("#");
  };
  const phoneErrors = () => {
    return phoneNo.includes("#");
  };
  return (
    <View>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{ height: height * 0.8 }}>
          <Dialog.Title>Sign Up Here</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label='Full Name'
              value={fullname}
              onChangeText={(text) => setFullName(text)}
              mode='outlined'
              style={{
                height: 40,
                marginTop: 10,
                width: "100%",
                color: "#212121",
              }}
            />
            <HelperText type='error' visible={fullnameErrors()}>
              Phone no. doesn't contain spacial charecters
            </HelperText>
            <TextInput
              label='Password'
              value={password}
              onChangeText={(text) => setPassword(text)}
              mode='outlined'
              style={{
                height: 40,
                width: "100%",
                color: "#212121",
              }}
            />
            <HelperText type='error' visible={passwordErrors()}>
              Phone no. doesn't contain spacial charecters
            </HelperText>
            <TextInput
              label='Confirm Password'
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              mode='outlined'
              style={{
                height: 40,
                width: "100%",
                color: "#212121",
              }}
            />
            <HelperText type='error' visible={confirmPasswordErrors()}>
              Phone no. doesn't contain spacial charecters
            </HelperText>
            <TextInput
              label='Phone'
              value={phoneNo}
              onChangeText={(text) => setPhoneNo(text)}
              mode='outlined'
              style={{
                height: 40,
                width: "100%",
                color: "#212121",
              }}
            />
            <HelperText type='error' visible={phoneErrors()}>
              Phone no. doesn't contain spacial charecters
            </HelperText>
          </Dialog.Content>
          <Dialog.Actions style={{ justifyContent: "center" }}>
            <Button onPress={hideDialog}>Sign up</Button>
            <Button onPress={hideDialog}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({});
