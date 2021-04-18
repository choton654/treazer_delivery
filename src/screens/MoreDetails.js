import React, { useState, useEffect } from "react";
// import { lazy } from "@loadable/component";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  // ScrollView,
} from "react-native";
import { userState } from "./context/userContext";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  Button,
  Divider,
  HelperText,
  ActivityIndicator,
} from "react-native-paper";
import axios from "axios";
import BASE_URL from "../api";
const { height } = Dimensions.get("window");

const MoreDetails = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [referenceCode, setReferenceCode] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const restaurentId = user && user.resturantId ? user.resturantId : null;

  const [deliveryType, setDeliveryType] = useState(
    restaurentId ? "self" : "admin"
  );
  const [disable, setDisable] = useState(false);
  const [deliveryReq, setDeliveryReq] = useState(true);

  useEffect(() => {
    if (isNaN(referenceCode)) {
      setReferenceCode(0);
    }
  }, [referenceCode]);

  const { dispatch } = userState();
  const token = localStorage.getItem("token");
  const refreshtoken = localStorage.getItem("refresh-token");
  const emailErrors = () => {
    return !email.includes("@");
  };

  const deliveryRegister = () => {
    if (!emailErrors()) {
      setDeliveryReq(false);
      axios
        .post(
          `${BASE_URL}/api/user/deliveryRegistration`,
          { email, deliveryType, referenceCode },
          {
            headers: {
              "x-token": token,
              "x-refresh-token": refreshtoken,
            },
          }
        )
        .then((res) => {
          const { updatedUser } = res.data;
          dispatch({ type: "USER_PROFILE", payload: updatedUser });
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setDeliveryReq(true);
          if (user.isAdminAccountHold) {
            navigation.navigate("Account_Hold");
          } else {
            navigation.navigate("Tabs");
          }
        })
        .catch((err) => {
          const error = err.response && err.response.data;
          console.log(error);
        });
    }
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
          height: height * 0.1,
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
          marginVertical: 15,
          height: height * 0.5,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            textAlign: "center",
            letterSpacing: 1,
            marginBottom: 20,
            color: "#616161",
          }}>
          Please Enter Your Details
        </Text>
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode='outlined'
          keyboardType='email-address'
          style={{
            height: 40,
            paddingHorizontal: 10,
            marginTop: 10,
            width: "80%",
            color: "#212121",
            backgroundColor: "#eeeeee",
          }}
        />
        <HelperText type='info' visible={emailErrors()}>
          Email must contain '@' symbol
        </HelperText>
        {restaurentId ? (
          <Picker
            selectedValue={deliveryType}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue === "partner") {
                setDisable(true);
              } else {
                setDisable(false);
              }
              setDeliveryType(itemValue);
            }}
            style={{
              marginVertical: 10,
              width: "80%",
              height: 40,
              marginHorizontal: "auto",
              paddingVertical: 5,
              borderRadius: 3,
              paddingHorizontal: 10,
              background: "#eeeeee",
              border: "1px solid black",
              color: "#757575",
              fontWeight: "bold",
              letterSpacing: 2,
              fontSize: 15,
              fontFamily: "Open Sans",
            }}>
            <Picker.Item label='Self Delivery' value='self' />
          </Picker>
        ) : (
          <Picker
            selectedValue={deliveryType}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue === "partner") {
                setDisable(true);
              } else {
                setDisable(false);
              }
              setDeliveryType(itemValue);
            }}
            style={{
              marginVertical: 10,
              width: "80%",
              height: 40,
              marginHorizontal: "auto",
              paddingVertical: 5,
              borderRadius: 3,
              paddingHorizontal: 10,
              background: "#eeeeee",
              border: "1px solid black",
              color: "#757575",
              fontWeight: "bold",
              letterSpacing: 2,
              fontSize: 15,
              fontFamily: "Open Sans",
            }}>
            <Picker.Item label='Delivery Admin' value='admin' />
            <Picker.Item label='Delivery Partner' value='partner' />
          </Picker>
        )}
        {!restaurentId && (
          <TextInput
            placeholder='Reference Code'
            placeholderTextColor={disable ? "#212121" : "#ffffff"}
            disabled={disable ? false : true}
            value={referenceCode}
            onChangeText={(text) => setReferenceCode(parseInt(text))}
            mode='outlined'
            keyboardType='number-pad'
            style={{
              height: 40,
              paddingHorizontal: 10,
              marginTop: 10,
              width: "80%",
              color: "#212121",
              backgroundColor: `${disable ? "#eeeeee" : "#ffffff"}`,
            }}
          />
        )}

        {deliveryReq ? (
          <Button
            mode='contained'
            disabled={emailErrors() ? true : false}
            onPress={() => {
              deliveryRegister();
              navigation.navigate("Tabs", { screen: "Profile" });
            }}
            style={{
              marginVertical: 20,
              width: "50%",
              backgroundColor: `${emailErrors() ? "#bdbdbd" : "#4fc3f7"}`,
              boxShadow: "0px 2px 5px 2px #bdbdbd",
            }}
            labelStyle={{
              color: "#ffffff",
              fontWeight: "700",
              fontSize: 15,
              letterSpacing: 2,
            }}>
            Get Started
          </Button>
        ) : (
          <View
            style={{
              marginVertical: 10,
              width: "50%",
              backgroundColor: "#ffffff",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <ActivityIndicator animating={true} color='#82b1ff' size='small' />
          </View>
        )}
      </View>
    </View>
  );
};

export default MoreDetails;

const styles = StyleSheet.create({
  v1: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
