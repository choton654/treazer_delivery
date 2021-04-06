import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Dimensions } from "react-native";
import {
  Button,
  TextInput,
  HelperText,
  Dialog,
  Portal,
} from "react-native-paper";
import axios from "axios";
import BASE_URL from "../api";
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
  const signUp = () => {
    axios
      .post(`${BASE_URL}/api/user/signup`, {
        username: fullname,
        password,
        phone: phoneNo,
      })
      .then((res) => {
        console.log(res.data);
        hideDialog();
      })
      .catch((err) => {
        const error = err.response && err.response.data.username;
        console.log(error);
      });
  };
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={hideDialog}
        style={{ height: height * 0.75 }}>
        <ScrollView>
          <Dialog.Title style={{ textAlign: "center" }}>
            Sign Up Here
          </Dialog.Title>
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
                backgroundColor: "#ffffff",
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
                backgroundColor: "#ffffff",
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
                backgroundColor: "#ffffff",
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
                backgroundColor: "#ffffff",
              }}
            />
            <HelperText type='error' visible={phoneErrors()}>
              Phone no. doesn't contain spacial charecters
            </HelperText>
          </Dialog.Content>
          <Dialog.Actions style={{ justifyContent: "space-around" }}>
            <Button
              onPress={signUp}
              style={{
                marginBottom: 10,
                width: "40%",
                backgroundColor: "#2196f3",
                boxShadow: "0px 2px 2px 2px #bdbdbd",
              }}
              labelStyle={{
                color: "#ffffff",
                fontWeight: "700",
                fontSize: 15,
                letterSpacing: 2,
              }}
              contentStyle={{ backgroundColor: "#4fc3f7" }}>
              Sign up
            </Button>
            <Button
              onPress={hideDialog}
              style={{
                marginBottom: 10,
                width: "40%",
                backgroundColor: "#2196f3",
                boxShadow: "0px 2px 2px 2px #bdbdbd",
              }}
              labelStyle={{
                color: "#ffffff",
                fontWeight: "700",
                fontSize: 15,
                letterSpacing: 2,
              }}
              contentStyle={{ backgroundColor: "#4fc3f7" }}>
              Cancel
            </Button>
          </Dialog.Actions>
        </ScrollView>
      </Dialog>
    </Portal>
  );
};

export default Signup;

const styles = StyleSheet.create({});
