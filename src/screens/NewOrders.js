import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
const { height } = Dimensions.get("window");
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, ActivityIndicator } from "react-native-paper";
import axios from "axios";
import BASE_URL from "../api";
import { orderState } from "./context/orderContext";

const NewOrders = ({ setVisible1 }) => {

  const { state: odrState, dispatch: orderDispatch } = orderState();
  const [acceptOrderReq, setAcceptOrderReq] = useState(true);

  const token = localStorage.getItem("token");
  const refreshtoken = localStorage.getItem("refresh-token");
  const phone = JSON.parse(localStorage.getItem("user"))?.mobile_no;
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user && user._id;
  const resturantId =
    user && user.resturantId !== undefined && user.resturantId;
  const deliveryType = user && user.deliveryType;

  useEffect(() => {
    if (odrState !== undefined) {
      if (!odrState.orders || odrState.orders.length === 0) {
        getAllOrders();
      }
    }
  }, []);

  const getAllOrders = () => {
    axios
      .post(
        `${BASE_URL}/api/order/allorders`,
        { phone, resturantId, deliveryType },
        {
          headers: {
            "x-token": token,
            "x-refresh-token": refreshtoken,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        const { order, msg } = res.data;
        if (msg !== undefined) {
          orderDispatch({ type: "ORDER_ERROR", payload: msg });
        } else {
          orderDispatch({ type: "GET_RESTAURENTS_ORDERS", payload: order });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const acceptOrder = (deliveryboyId, orderId) => {
    setAcceptOrderReq(false);
    axios
      .post(
        `${BASE_URL}/api/order/acceptOrder`,
        { deliveryboyId, orderId },
        {
          headers: {
            "x-token": token,
            "x-refresh-token": refreshtoken,
          },
        }
      )
      .then((res) => {
        const { acceptedOrder } = res.data;
        // console.log(acceptedOrder);
        orderDispatch({ type: "ACCEPT_ORDER", payload: acceptedOrder });
        setAcceptOrderReq(true);
        setVisible1(true);
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
          .then((res1) => {
            const { assignedOrder } = res1.data;
            // console.log(assignedOrder);
            orderDispatch({ type: "ASSIGNED_ORDER", payload: assignedOrder });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rejectOrder = (orderId) => {
    orderDispatch({ type: "REJECT_NEW_ORDER", payload: orderId });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 20,
        width: "100%",
        backgroundColor: "#ffffff",
      }}>
      {odrState !== undefined && odrState.orders ? (
        odrState.orders.length > 0 ? (
          odrState.orders.map((order, idx) => (
            <View
              key={idx}
              style={{
                paddingHorizontal: 10,
                marginTop: 20,
              }}>
              <View
                style={{
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  shadowColor: "#bdbdbd",
                  shadowOpacity: 1,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 3 },
                }}>
                <View style={{ flexDirection: "row" }}>

                  <Text
                    style={{
                      marginTop: 5,
                      marginLeft: 10,
                      fontWeight: "600",
                      fontSize: 15,
                      color: "#424242",
                      letterSpacing: 1,
                    }}>
                    {order.userId && order.userId?.userId}
                  </Text>
                  <Text
                    style={{
                      marginTop: 5,
                      marginLeft: 10,
                      fontWeight: "600",
                      fontSize: 15,
                      color: "#424242",
                      letterSpacing: 1,
                    }}>
                    {order.userId && order.userId.mobile_no}
                  </Text>
                </View>
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
                    {new Date(order.createdAt).toDateString()}
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
                      Rs.{order.totalPrice + order.resturantId.deliveryPrice}
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
                    Land mark: {order.shippingaddress &&
                      order.shippingaddress?.landmark}
                  </Text>
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
                    Flat No: {order.shippingaddress &&
                      order.shippingaddress?.flatNo}
                  </Text>
                </View>
                <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
                  <Text style={{
                    marginBottom: 5,
                    fontWeight: "600",
                    fontSize: 15
                  }}>Order Items
                  </Text>
                  {order.orderItems.map((item, idx) =>
                    <View key={idx}>
                      <View style={{
                        flexDirection: "row", justifyContent: "space-between",
                        alignItems: "center"
                      }}>
                        <Text>{item.product?.name}</Text>
                        <Text>{item.quantity}x{item.product?.price}={parseInt(item.quantity) * parseInt(item.product?.price)}</Text>
                      </View>
                    </View>
                  )}
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text>Total</Text>
                    <Text>{order.totalPrice}</Text>
                  </View>
                </View>
                {acceptOrderReq ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginBottom: 5,
                    }}>
                    {!order.isRestaurantOwnerVerify &&
                      <Text style={{ fontSize: 15, fontWeight: "600" }}>Restaurant owner hasn't verify order yet</Text>
                    }
                    {order.isRestaurantOwnerVerify &&
                      <Button
                        mode='contained'
                        onPress={() => acceptOrder(user._id, order._id)}
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
                        Accept
                      </Button>
                    }
                    {order.isRestaurantOwnerVerify &&
                      <Button
                        mode='contained'
                        onPress={() => rejectOrder(order._id)}
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
                    }
                  </View>
                ) : (
                  <View
                    style={{
                      marginHorizontal: "auto",
                      backgroundColor: "#ffffff",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "60%",
                      height: 40,
                    }}>
                    <ActivityIndicator
                      animating={true}
                      color='#82b1ff'
                      size='small'
                      style={{ marginVertical: 10 }}
                    />
                  </View>
                )}
              </View>
            </View>
          ))
        ) : (
          <View
            style={{
              height: height * 0.7,
              backgroundColor: "#ffffff",
              justifyContent: "center",
              padding: 20,
            }}>
            <Text
              style={{
                textAlign: "Center",
                fontSize: 20,
                letterSpacing: 3,
                fontWeight: "700",
                fontFamily: "Open Sans",
                color: "#bdbdbd",
              }}>
              There is no new orders for you right now
            </Text>
          </View>
        )
      ) : (
        <View
          style={{
            height: height * 0.7,
            backgroundColor: "#ffffff",
            justifyContent: "center",
          }}>
          <ActivityIndicator animating={true} color='#82b1ff' size='large' />
        </View>
      )}
    </ScrollView>
  );
};

export default NewOrders;

const styles = StyleSheet.create({});
