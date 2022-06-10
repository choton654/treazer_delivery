import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import axios from "axios";
import BASE_URL from "../api";
const { height } = Dimensions.get("window");
// import Ionicons from "react-native-vector-icons/Ionicons";
import { ActivityIndicator } from "react-native-paper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { orderState } from "./context/orderContext";
import Header from "../components/OrderDetails/Header";
const CompleteOrder = () => {
  const { state: odrState, dispatch: orderDispatch } = orderState();

  useEffect(() => {
    if (odrState.completedOrders.length === 0) {
      getCompletedOrder();
    }
  }, []);

  const [completeOrderReq, setCompletedOrderReq] = useState(true);

  const token = localStorage.getItem("token");
  const refreshtoken = localStorage.getItem("refresh-token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user && user._id;

  const getCompletedOrder = () => {
    setCompletedOrderReq(false);
    axios
      .post(
        `${BASE_URL}/api/order/completedOrder`,
        { deliveryboyId: userId },
        {
          headers: {
            "x-token": token,
            "x-refresh-token": refreshtoken,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        const { completedOrder } = res.data;
        orderDispatch({
          type: "GET_COMPLETED_ORDERS",
          payload: completedOrder,
        });
        setCompletedOrderReq(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Header title={"Completed Orders"} />
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          backgroundColor: "#ffffff",
        }}>
        {odrState.completedOrders && odrState.completedOrders.length > 0 ? (
          odrState.completedOrders.map((order, idx) => (
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
                  {order.userId ? order.userId?.userId : order.userId.username}
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
                    {new Date(order.paidAt).toDateString()}
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
              </View>
            </View>
          ))
        ) : completeOrderReq ? (
          <View
            style={{
              marginHorizontal: "auto",
              backgroundColor: "#ffffff",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: height * 0.8,
              marginVertical: 10,
              padding: 10,
            }}>
            <Text
              style={{
                textAlign: "Center",
                fontSize: 20,
                letterSpacing: 2,
                fontWeight: "700",
                fontFamily: "Open Sans",
                color: "#bdbdbd",
              }}>
              You haven't completed any order
            </Text>
          </View>
        ) : (
          <View
            style={{
              marginHorizontal: "auto",
              backgroundColor: "#ffffff",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: height * 0.8,
              marginVertical: 10,
              padding: 10,
            }}>
            <ActivityIndicator animating={true} color='#82b1ff' size='large' />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CompleteOrder;

const styles = StyleSheet.create({
  v1: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
