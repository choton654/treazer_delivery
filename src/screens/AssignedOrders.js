import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
const { height } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, ActivityIndicator } from "react-native-paper";
import axios from "axios";
import BASE_URL from "../api";
import { orderState } from "./context/orderContext";
const AssignedOrders = () => {
  const { state: odrState, dispatch: orderDispatch } = orderState();
  const [assignedOrderReq, setAssignedOrderReq] = useState(true);
  const [pickuporderReq, setPickupOrderReq] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    if (!odrState.assignedOrders) {
      get_assigned_order();
    }
  }, []);

  const token = localStorage.getItem("token");
  const refreshtoken = localStorage.getItem("refresh-token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user && user._id;

  const get_assigned_order = () => {
    setAssignedOrderReq(false);
    axios
      .post(
        `${BASE_URL}/api/order/assignedOrder`,
        { deliveryboyId: userId },
        {
          headers: {
            "x-token": token,
            "x-refresh-token": refreshtoken,
          },
        }
      )
      .then((res) => {
        const { assignedOrder } = res.data;
        console.log(assignedOrder);
        orderDispatch({ type: "ASSIGNED_ORDER", payload: assignedOrder });
        setAssignedOrderReq(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pickupOrder = (orderId) => {
    setPickupOrderReq(false);
    axios
      .post(
        `${BASE_URL}/api/order/pickedupOrder`,
        { deliveryboyId: userId, orderId },
        {
          headers: {
            "x-token": token,
            "x-refresh-token": refreshtoken,
          },
        }
      )
      .then((res) => {
        const { pickedupOrder, msg } = res.data;
        console.log(msg);
        orderDispatch({ type: "PICKUP_ORDERS", payload: pickedupOrder });
        setPickupOrderReq(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return assignedOrderReq ? (
    <ScrollView
      contentContainerStyle={{
        width: "100%",
        backgroundColor: "#ffffff",
      }}>
      {!odrState.assignedOrders || odrState.assignedOrders.length === 0 ? (
        <View
          style={{
            height: height * 0.7,
            marginHorizontal: "auto",
            backgroundColor: "#ffffff",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              fontWeight: "700",
              letterSpacing: 1,
            }}>
            You havn't assigned any orders
          </Text>
        </View>
      ) : (
        odrState.assignedOrders.map((order, idx) => (
          <View
            key={idx}
            style={{
              height: 220,
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
                {order.userId && order.userId.username}
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
                Order Time:
                <Text
                  style={{
                    marginHorizontal: 5,
                    fontWeight: "700",
                    fontSize: 12,
                    color: "#424242",
                    letterSpacing: 1,
                  }}>
                  {order.createdAt}
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
                  borderBottomWidth: 1,
                  borderBottomColor: "#455a64",
                  marginTop: 10,
                }}>
                <View
                  style={{
                    width: "50%",
                    borderRightColor: "#455a64",
                    borderRightWidth: 1,
                    borderStyle: "solid",
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
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 10,
                }}>
                <Ionicons
                  name='location-sharp'
                  size={20}
                  color='#4fc3f7'
                  style={{ marginLeft: 10 }}
                />
                <Text
                  style={{
                    marginHorizontal: 5,
                    fontWeight: "600",
                    fontSize: 12,
                    color: "#424242",
                    letterSpacing: 1,
                  }}>
                  {order.shippingaddress &&
                    order.shippingaddress.formattedAddress}
                </Text>
              </View>

              {pickuporderReq && order.isPickedup === false ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginBottom: 5,
                  }}>
                  <Button
                    mode='contained'
                    onPress={() => pickupOrder(order._id)}
                    style={{
                      marginBottom: 10,
                      width: "20%",
                      height: 30,
                      backgroundColor: "#4fc3f7",
                      boxShadow: "0px 2px 5px 2px #bdbdbd",
                    }}
                    labelStyle={{
                      color: "#ffffff",
                      fontWeight: "700",
                      fontSize: 12,
                      marginHorizontal: "none",
                    }}>
                    Pickup
                  </Button>
                  <Button
                    mode='contained'
                    //   onPress={() => navigation.navigate("Details")}
                    style={{
                      marginBottom: 10,
                      width: "20%",
                      height: 30,
                      backgroundColor: "#ff5252",
                      boxShadow: "0px 2px 5px 2px #bdbdbd",
                    }}
                    labelStyle={{
                      color: "#ffffff",
                      fontWeight: "700",
                      fontSize: 12,
                      marginHorizontal: "none",
                    }}>
                    Reject
                  </Button>
                </View>
              ) : order.isPickedup === true ? (
                <Button
                  mode='contained'
                  onPress={() =>
                    navigation.navigate("Tabs", { screen: "OrderDetails" })
                  }
                  style={{
                    marginVertical: 10,
                    width: "40%",
                    marginHorizontal: "auto",
                    height: 30,
                    backgroundColor: "#4fc3f7",
                    boxShadow: "0px 2px 5px 2px #bdbdbd",
                  }}
                  labelStyle={{
                    color: "#ffffff",
                    fontWeight: "700",
                    fontSize: 12,
                    marginHorizontal: "none",
                  }}>
                  View More
                </Button>
              ) : (
                <View
                  style={{
                    marginHorizontal: "auto",
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "60%",
                    height: 30,
                    marginVertical: 10,
                  }}>
                  <ActivityIndicator
                    animating={true}
                    color='#82b1ff'
                    size='small'
                  />
                </View>
              )}
            </View>
          </View>
        ))
      )}
    </ScrollView>
  ) : (
    <View
      style={{
        height: height * 0.7,
        marginHorizontal: "auto",
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}>
      <ActivityIndicator animating={true} color='#82b1ff' size='large' />
    </View>
  );
};

export default AssignedOrders;

const styles = StyleSheet.create({});
