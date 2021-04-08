import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Divider, Button } from "react-native-paper";
const { height } = Dimensions.get("window");
import { userState } from "./context/userContext";

const AccountHold = () => {
  const { dispatch } = userState();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh-token");
    dispatch({ type: "LOGOUT_USER" });
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
          marginVertical: 15,
          height: height * 0.35,
          width: "100%",
          paddingHorizontal: 20,
          justifyContent: "space-between",
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
          Your account is on hold
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
            textAlign: "center",
            letterSpacing: 1,
            marginBottom: 20,
            color: "#616161",
          }}>
          Please Contact TREAZER Support Team For Activation Of Your Account
        </Text>
        <View style={{ padding: 10 }}>
          <Text
            style={{
              color: "#212121",
              fontSize: 15,
              fontWeight: "600",
              letterSpacing: 1,
              textAlign: "center",
              marginVertical: 5,
            }}>
            Email ID:
            <Text style={{ marginHorizontal: 10, fontWeight: "bold" }}>
              info.treazer@gmail.com
            </Text>
          </Text>
          <Text
            style={{
              color: "#212121",
              fontSize: 15,
              fontWeight: "600",
              letterSpacing: 1,
              textAlign: "center",
              marginVertical: 5,
            }}>
            Phone No:
            <Text style={{ marginHorizontal: 10, fontWeight: "bold" }}>
              74562136985
            </Text>
          </Text>
        </View>
      </View>

      <Button
        mode='contained'
        onPress={logout}
        style={{
          marginVertical: 20,
          marginHorizontal: "auto",
          width: "40%",
          backgroundColor: "#4fc3f7",
          boxShadow: "0px 2px 2px 2px #bdbdbd",
        }}
        labelStyle={{
          color: "#ffffff",
          fontWeight: "700",
          fontSize: 15,
          letterSpacing: 2,
        }}>
        Log-out
      </Button>
    </View>
  );
};

export default AccountHold;

const styles = StyleSheet.create({
  v1: {
    flex: 1,
    // border: "1px solid black",
    backgroundColor: "#ffffff",
  },
});
