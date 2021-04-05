import React, { useState, Suspense } from "react";
import { lazy } from "@loadable/component";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { TextInput, Button, Divider, HelperText } from "react-native-paper";
import axios from "axios";
import BASE_URL from "../api";
const Signup = lazy(() => import("./Signup"));
const { height } = Dimensions.get("window");

const Login = () => {
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const passErrors = () => {
    return phoneNo.includes("#");
  };
  const phoneErrors = () => {
    return phoneNo.includes("#");
  };
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const login = () => {
    axios
      .post(`${BASE_URL}/api/user/login`, { phone: phoneNo, password })
      .then((res) => {
        const { user, token, refreshtoken } = res.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        localStorage.setItem("refresh-token", refreshtoken);
      })
      .catch((err) => {
        const error = err.response && err.response.data;
        setSendReq(true);
        if (error && error.phone) {
          setPhoneError(error.phone);
          // console.log(error.phone);
        }
        if (error && error.password) {
          setPassError(error.password);
        }
      });
  };

  return (
    <View style={styles.v1}>
      <LazyLoadImage
        style={{
          width: "100%",
          height: height * 0.3,
          resizeMode: "cover",
        }}
        src={require("../assets/logo/delivery_picture.png")}
        effect='blur'
      />
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}>
        <Divider
          style={{
            height: 1,
            width: 80,
            backgroundColor: "black",
            marginHorizontal: 20,
          }}
        />
        <LazyLoadImage
          style={{
            width: 60,
            height: 60,
            resizeMode: "cover",
            marginTop: 5,
            boxShadow: "0px 2px 2px 2px #bdbdbd",
            borderRadius: 30,
          }}
          src={require("../assets/logo/delivery_treazer_logo.png")}
          effect='blur'
        />
        <Divider
          style={{
            height: 1,
            width: 80,
            backgroundColor: "black",
            marginHorizontal: 20,
          }}
        />
      </View>
      <View
        style={{
          //   justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 15,
          height: height * 0.35,
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            // fontFamily: "Roboto Slab",
            letterSpacing: 1,
            marginBottom: 20,
            color: "#616161",
          }}>
          Welcome To Treazer Delivery
        </Text>
        <TextInput
          label='Phone'
          value={phoneNo}
          onChangeText={(text) => setPhoneNo(text)}
          mode='outlined'
          style={{
            height: 40,
            marginTop: 10,
            width: "80%",
            color: "#212121",
            backgroundColor: "#ffffff",
          }}
        />
        <HelperText type='error' visible={phoneErrors()}>
          Phone no. doesn't contain spacial charecters
        </HelperText>
        <TextInput
          label='Password'
          value={password}
          onChangeText={(text) => setPassword(text)}
          mode='outlined'
          style={{
            height: 40,
            width: "80%",
            color: "#212121",
            backgroundColor: "#ffffff",
          }}
        />
        <HelperText type='error' visible={passErrors()}>
          Phone no. doesn't contain spacial charecters
        </HelperText>
        <Button
          mode='contained'
          onPress={login}
          style={{
            marginBottom: 10,
            width: "50%",
            backgroundColor: "#4fc3f7",
            boxShadow: "0px 2px 2px 2px #bdbdbd",
          }}
          labelStyle={{
            color: "#ffffff",
            fontWeight: "700",
            fontSize: 15,
            letterSpacing: 2,
          }}>
          Log-in
        </Button>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: "auto",
          marginVertical: 5,
          //   border: "1px solid black",
          height: 20,
          alignItems: "center",
        }}>
        <Divider
          style={{
            height: 1,
            width: 80,
            backgroundColor: "black",
            marginHorizontal: 10,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "800",
            // fontFamily: "Roboto Slab",
            letterSpacing: 1,
          }}>
          or
        </Text>
        <Divider
          style={{
            height: 1,
            width: 80,
            backgroundColor: "black",
            marginHorizontal: 10,
          }}
        />
      </View>
      <View
        style={{
          marginHorizontal: "auto",
          alignItems: "center",
        }}>
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            // fontFamily: "Open Sans",
            letterSpacing: 1,
            fontSize: 15,
            marginTop: 10,
          }}>
          Don't have an account?
        </Text>
        <Text
          style={{
            marginTop: 10,
            color: "#4fc3f7",
            fontWeight: "bold",
            // fontFamily: "Open Sans",
            letterSpacing: 1,
            fontSize: 15,
          }}
          onPress={showDialog}>
          Signup Here
        </Text>
      </View>
      <Suspense
        fallback={
          <View
            style={{
              flex: 1,
              backgroundColor: "#ffffff",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <ActivityIndicator
              size='large'
              color='#82b1ff'
              style={{
                margin: "auto",
              }}
            />
          </View>
        }>
        <Signup visible={visible} hideDialog={hideDialog} />
      </Suspense>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  v1: {
    flex: 1,
    // border: "1px solid black",
    backgroundColor: "#ffffff",
  },
});
