import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { userState } from "./context/userContext";
import { orderState } from "./context/orderContext";

const Profile = () => {
  const { state, dispatch } = userState();
  const { dispatch: orderDispatch } = orderState();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh-token");
    dispatch({ type: "LOGOUT_USER" });
    orderDispatch({ type: "EMPTY_ORDER" });
  };

  return (
    <View style={styles.v1}>
      <View
        style={{
          // position: "absolute",
          width: "100%",
          height: 60,
          backgroundColor: "#00E0FF",
        }}>
        <View
          style={{
            height: 50,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}>
          <LazyLoadImage
            style={{
              width: 35,
              height: 35,
              marginLeft: 10,
              marginTop: 10,
              resizeMode: "cover",
              borderRadius: 30,
              boxShadow: "0px 2px 10px 1px #757575",
            }}
            src={require("../assets/logo/delivery_treazer_logo.png")}
            effect='blur'
          />
          <Text
            style={{
              marginHorizontal: "auto",
              color: "#ffffff",
              fontWeight: "700",
              fontSize: 20,
              letterSpacing: 1,
            }}>
            My Profile
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          // justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: 30,
        }}>
        <LazyLoadImage
          style={{
            width: 100,
            height: 100,
          }}
          src={require("../assets/logo/man.png")}
          effect='blur'
        />
        <Text
          style={{
            color: "#212121",
            fontSize: 20,
            fontWeight: "bold",
            letterSpacing: 1,
            textAlign: "center",
            marginVertical: 20,
          }}>
          {state.user && state.user.username}
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
            Phone No:
            <Text style={{ marginHorizontal: 10 }}>
              {state.user && state.user.mobile_no}
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
            Email ID:
            <Text style={{ marginHorizontal: 10 }}>
              {state.user && state.user.email}
            </Text>
          </Text>
          {state.user.referenceCode && state.user.referenceCode !== 0 && (
            <Text
              style={{
                color: "#212121",
                fontSize: 15,
                fontWeight: "600",
                letterSpacing: 1,
                textAlign: "center",
                marginVertical: 5,
              }}>
              Reference ID:
              <Text style={{ marginHorizontal: 10 }}>
                {state.user.referenceCode}
              </Text>
            </Text>
          )}
          {state.user.adminCode && (
            <Text
              style={{
                color: "#212121",
                fontSize: 15,
                fontWeight: "600",
                letterSpacing: 1,
                textAlign: "center",
                marginVertical: 5,
              }}>
              Admin ID:
              <Text style={{ marginHorizontal: 10 }}>
                {state.user.adminCode}
              </Text>
            </Text>
          )}
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
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  v1: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
