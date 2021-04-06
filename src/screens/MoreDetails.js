import React, { useState } from "react";
// import { lazy } from "@loadable/component";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  // ActivityIndicator,
  // ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { TextInput, Button, Divider, HelperText } from "react-native-paper";
// import axios from "axios";
// import BASE_URL from "../api";
const { height } = Dimensions.get("window");

const MoreDetails = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [referenceCode, setReferenceCode] = useState("");
  const [deliveryType, setDeliveryType] = useState("Self_Delivery");
  const [disable, setDisable] = useState(false);
  const emailErrors = () => {
    return !email.includes("@");
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
          label='Email'
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode='outlined'
          style={{
            height: 40,
            marginTop: 10,
            width: "80%",
            color: "#212121",
            backgroundColor: "#ffffff",
          }}
        />
        <HelperText type='error' visible={emailErrors()}>
          Email must contain '@' symbol
        </HelperText>
        <Picker
          selectedValue={deliveryType}
          onValueChange={(itemValue, itemIndex) => {
            if (itemValue === "Delivery_Partner") {
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
            background: "#ffffff",
            border: "1px solid black",
            color: "#757575",
            fontWeight: "bold",
            letterSpacing: 2,
            fontSize: 15,
            fontFamily: "Open Sans",
          }}>
          <Picker.Item label='Self Delivery' value='Self_Delivery' />
          <Picker.Item label='Delivery Admin' value='Delivery_Admin' />
          <Picker.Item label='Delivery Partner' value='Delivery_Partner' />
        </Picker>
        <TextInput
          label='Reference Code'
          disabled={disable ? false : true}
          value={referenceCode}
          onChangeText={(text) => setReferenceCode(text)}
          mode='outlined'
          style={{
            height: 40,
            marginTop: 10,
            width: "80%",
            color: "#212121",
            backgroundColor: "#ffffff",
          }}
        />
        <Button
          mode='contained'
          onPress={() => navigation.navigate("Tabs", { screen: "Dashboard" })}
          style={{
            marginVertical: 20,
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
          Get Started
        </Button>
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
