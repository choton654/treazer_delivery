import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { userState } from "./context/userContext";
import { orderState } from "./context/orderContext";
// import {
//   Button,
//   TextInput,
//   Snackbar,
//   Dialog,
//   Portal,
// } from "react-native-paper";
import axios from "axios";
import BASE_URL from "../api";
import { ScrollView } from "react-native-gesture-handler";

const { height } = Dimensions.get("window");

const AdminDashboard = () => {
  const { state, dispatch } = userState();
  const { state: odrState, dispatch: orderDispatch } = orderState();

  const token = localStorage.getItem("token");
  const refreshtoken = localStorage.getItem("refresh-token");
  const user = JSON.parse(localStorage.getItem("user"));
  const adminCode = user && user.adminCode;
  // const hideDialog = () => setDialog(false);

  useEffect(() => {
    if (!state.deliveryBoys) {
      getDeliveryPartner();
    }
  }, []);

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
        const { foundUser, err } = res.data;
        console.log(err);
        if (err) {
          dispatch({ type: "GET_DELIVERY_BOY_BY_ADMIN", payload: err });
        } else if (foundUser) {
          dispatch({ type: "GET_DELIVERY_BOY_BY_ADMIN", payload: foundUser });
        }

        let deliveryBoysIds = [];
        foundUser.forEach((deliveryBoy) => {
          deliveryBoysIds.push(deliveryBoy._id);
        });

        axios
          .post(
            `${BASE_URL}/api/order/completedOrder`,
            { deliveryboyId: deliveryBoysIds },
            {
              headers: {
                "x-token": token,
                "x-refresh-token": refreshtoken,
              },
            }
          )
          .then((res1) => {
            const { completedOrder } = res1.data;
            console.log(completedOrder);
            orderDispatch({
              type: "MY_BOYS_COMPLETED_ORDERS",
              payload: completedOrder,
            });
          })
          .catch((err1) => {
            console.log(err1);
          });
      })
      .catch((error1) => {
        // const { err } = error.response;
        console.log(error1);
        // setVisible(true);
        // setBoysError(err);
      });
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
            Admin
          </Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          backgroundColor: "#ffffff",
        }}>
        {odrState.myBoysOrder && odrState.myBoysOrder.length > 0 ? (
          odrState.myBoysOrder.map((order, idx) => (
            <View
              key={idx}
              style={{
                height: 120,
                paddingHorizontal: 10,
                marginTop: 10,
              }}>
              <View
                style={{
                  borderColor: "#455a64",
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                }}>
                <Text
                  style={{
                    marginTop: 5,
                    marginLeft: 10,
                    fontWeight: "600",
                    fontSize: 15,
                    color: "#424242",
                    letterSpacing: 1,
                  }}>
                  {order.userId.username}
                </Text>
                <Text
                  style={{
                    marginVertical: 5,
                    marginLeft: 10,
                    fontWeight: "400",
                    fontSize: 12,
                    letterSpacing: 1,
                    color: "#424242",
                  }}>
                  Order Completed At:{" "}
                  <Text
                    style={{
                      marginHorizontal: 5,
                      fontWeight: "700",
                      fontSize: 12,
                      color: "#424242",
                      letterSpacing: 1,
                    }}>
                    {order.paidAt}
                  </Text>
                </Text>
                <View
                  style={{
                    height: 50,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderTopWidth: 1,
                    borderTopColor: "#455a64",
                    borderStyle: "solid",
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      width: "50%",
                      borderRightColor: "#455a64",
                      borderRightWidth: 1,
                      borderStyle: "solid",
                      justifyContent: "space-between",
                      alignItems: "center",
                      // padding: 5,
                    }}>
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 15,
                        color: "#9e9e9e",
                        letterSpacing: 1,
                      }}>
                      Order Amount
                    </Text>
                    <Text
                      style={{
                        marginBottom: 5,
                        fontWeight: "800",
                        fontSize: 15,
                        color: "#424242",
                        letterSpacing: 1,
                      }}>
                      Rs.{order.totalPrice}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "50%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 15,
                        color: "#9e9e9e",
                        letterSpacing: 1,
                      }}>
                      Payment Type
                    </Text>
                    <Text
                      style={{
                        marginBottom: 5,
                        fontWeight: "800",
                        fontSize: 15,
                        color: "#424242",
                        letterSpacing: 1,
                      }}>
                      Pre-paid
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View
            style={{
              height: height * 0.7,
              marginHorizontal: "auto",
              backgroundColor: "#ffffff",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: "700",
                letterSpacing: 1,
              }}>
              {!Array.isArray(state.deliveryBoys) && !state.deliveryBoys
                ? state.deliveryBoys
                : "There is no order completed by your boys"}
            </Text>
          </View>
        )}
      </ScrollView>
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

{
  /* <TextInput
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
</Snackbar> */
}
