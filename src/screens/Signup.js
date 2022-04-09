import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TextInput,
} from "react-native";
import {
  Button,
  HelperText,
  Dialog,
  Portal,
  ActivityIndicator,
} from "react-native-paper";
import axios from "axios";
import BASE_URL from "../api";
const { height } = Dimensions.get("window");

const Signup = ({ hideDialog, visible }) => {
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [signupReq, setSignupReq] = useState(true);
  const [phoneError, setPhoneError] = useState("");

  // const fullnameErrors = () => {
  //   let fullnameRegEx = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
  //   let fullnameRegEx = /^(?=[a-zA-Z0-9._]{2,50}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  //   return !fullnameRegEx.test(fullname);
  // };
  const passwordErrors = () => {
    return password === "";
  };
  const confirmPasswordErrors = () => {
    return password !== confirmPassword;
  };
  const phoneErrors = () => {
    let phoneMatch = /^\d{10}$/;
    return !phoneMatch.test(phoneNo);
  };
  const signUp = () => {
    if (!passwordErrors() && !confirmPasswordErrors() && !phoneErrors()) {
      setSignupReq(false);
      const registerUser = {
        username: fullname,
        accountName: `${fullname.split(" ")[0]}${Date.now()}`,
        password,
        phone: phoneNo,
      }
      axios
        .post(`${BASE_URL}/api/user/signup`, { registerUser })
        .then((res) => {
          console.log(res.data);
          setSignupReq(true);
          hideDialog();
        })
        .catch((err) => {
          let error;
          if (err.response && err.response.data.username) {
            error = err.response && err.response.data.username;
          } else {
            error = err.response && err.response.data;
            setPhoneError(error);
          }
          setSignupReq(true);
          console.log(error);
        });
    }
  };
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={hideDialog}
        style={{ height: height * 0.8 }}>
        <ScrollView>
          <Dialog.Title style={{ textAlign: "center" }}>
            Sign Up Here
          </Dialog.Title>
          <Dialog.Content style={{ paddingBottom: 10 }}>
            <TextInput
              placeholder='Full Name'
              value={fullname}
              onChangeText={(text) => {
                setPhoneError("");
                setFullName(text);
              }}
              mode='outlined'
              style={{
                height: 40,
                paddingHorizontal: 10,
                marginTop: 10,
                width: "100%",
                color: "#212121",
                backgroundColor: "#eeeeee",
              }}
            />
            <HelperText
              type='info'
              // visible={fullnameErrors()}
              style={{ marginBottom: 10 }}>
              Fullname must contain 6 charecters
            </HelperText>
            <TextInput
              secureTextEntry={true}
              placeholder='Password'
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPhoneError("");
              }}
              mode='outlined'
              style={{
                paddingHorizontal: 10,
                height: 40,
                width: "100%",
                color: "#212121",
                backgroundColor: "#eeeeee",
              }}
            />
            <HelperText
              type='nfo'
              visible={passwordErrors()}
              style={{ marginBottom: 10 }}>
              Put a password
            </HelperText>
            <TextInput
              secureTextEntry={true}
              placeholder='Confirm Password'
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setPhoneError("");
              }}
              mode='outlined'
              style={{
                paddingHorizontal: 10,
                height: 40,
                width: "100%",
                color: "#212121",
                backgroundColor: "#eeeeee",
              }}
            />
            <HelperText
              type='info'
              visible={confirmPasswordErrors()}
              style={{ marginBottom: 10 }}>
              Re-type password
            </HelperText>
            <TextInput
              placeholder='Phone'
              value={phoneNo}
              error={phoneError ? true : false}
              onChangeText={(text) => {
                setPhoneNo(text);
                setPhoneError("");
              }}
              keyboardType='number-pad'
              mode='outlined'
              style={{
                paddingHorizontal: 10,
                height: 40,
                width: "100%",
                color: "#212121",
                backgroundColor: "#eeeeee",
              }}
            />
            <HelperText
              type={phoneError ? "error" : "info"}
              visible={phoneErrors() || phoneError ? true : false}
              style={{ marginBottom: 10 }}>
              {phoneError ? phoneError : "Phone no. must have 10 digits"}
            </HelperText>
          </Dialog.Content>
          <Dialog.Actions style={{ justifyContent: "space-around" }}>
            {signupReq ? (
              <Button
                onPress={signUp}
                disabled={
                  // fullnameErrors() &&
                  passwordErrors() && confirmPasswordErrors() && phoneErrors()
                    ? true
                    : false
                }
                style={{
                  marginBottom: 10,
                  width: "40%",
                  boxShadow: "0px 2px 10px 2px #bdbdbd",
                }}
                labelStyle={{
                  color: "#ffffff",
                  fontWeight: "700",
                  fontSize: 15,
                  letterSpacing: 2,
                }}
                contentStyle={{
                  backgroundColor: `${
                    // !fullnameErrors() &&
                    !passwordErrors() &&
                      !confirmPasswordErrors() &&
                      !phoneErrors()
                      ? "#4fc3f7"
                      : "#bdbdbd"
                    }`,
                }}>
                Sign up
              </Button>
            ) : (
              <View
                style={{
                  width: "40%",
                  backgroundColor: "#ffffff",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <ActivityIndicator
                  animating={true}
                  color='#82b1ff'
                  size='small'
                />
              </View>
            )}

            <Button
              onPress={hideDialog}
              disabled={signupReq ? false : true}
              style={{
                marginBottom: 10,
                width: "40%",
                boxShadow: "0px 2px 10px 2px #bdbdbd",
              }}
              labelStyle={{
                color: "#ffffff",
                fontWeight: "700",
                fontSize: 15,
                letterSpacing: 2,
              }}
              contentStyle={{
                backgroundColor: `${signupReq ? "#4fc3f7" : "#bdbdbd"}`,
              }}>
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
