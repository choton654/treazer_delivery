import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { userState } from "./context/userContext";
import {
  Button,
  TextInput,
  Snackbar,
  Dialog,
  Portal,
} from "react-native-paper";
import axios from "axios";
import BASE_URL from "../api";

const AdminDashboard = () => {
  const { state, dispatch } = userState();
  const [adminCode, setAdminCode] = useState("");
  const [boysError, setBoysError] = useState("");
  const [visible, setVisible] = useState(false);
  const [dialog, setDialog] = useState(true);
  const token = localStorage.getItem("token");
  const refreshtoken = localStorage.getItem("refresh-token");

  const hideDialog = () => setDialog(false);

  const getDeliveryPartner = () => {
    axios
      .post(
        `${BASE_URL}/api/user/getDeliverypartner`,
        { referenceCode: adminCode },
        {
          headers: {
            "x-token": token,
            "x-refresh-token": refreshtoken,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        const { foundUser } = res.data;
        dispatch({ type: "GET_DELIVERY_BOY_BY_ADMIN", payload: foundUser });
        hideDialog();
      })
      .catch((error) => {
        const { err } = error.response.data;
        console.log(err);
        setVisible(true);
        setBoysError(err);
      });
  };

  const onDismissSnackBar = () => setVisible(false);

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
            Admin
          </Text>
        </View>
      </View>

      <Portal>
        <Dialog visible={dialog} onDismiss={hideDialog}>
          <Dialog.Title>Find your boys</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label='Admin Code'
              value={adminCode}
              // error={passwordError ? true : false}
              onChangeText={(text) => {
                setAdminCode(text);
              }}
              mode='outlined'
              style={{
                height: 40,
                width: "60%",
                marginHorizontal: "auto",
                color: "#212121",
                backgroundColor: "#ffffff",
              }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode='contained'
              onPress={getDeliveryPartner}
              style={{
                marginVertical: 10,
                marginHorizontal: "auto",
                width: "60%",
                backgroundColor: "#4fc3f7",
                boxShadow: "0px 2px 2px 2px #bdbdbd",
              }}
              labelStyle={{
                color: "#ffffff",
                fontWeight: "700",
                fontSize: 15,
                letterSpacing: 2,
                marginHorizontal: 0,
              }}>
              View Your Boys
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Close",
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        {boysError}
      </Snackbar>
    </View>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  v1: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
