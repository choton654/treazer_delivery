import React, { Suspense } from "react";
import { lazy } from "@loadable/component";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./tab.css";
// import { useNavigation } from "@react-navigation/native";
const { height } = Dimensions.get("window");
const NewOrders = lazy(() => import("./NewOrders"));
const AssignedOrders = lazy(() => import("./AssignedOrders"));
import { orderState } from "./context/orderContext";
import { userState } from "./context/userContext";

const Dashboard = () => {
  const { state: odrState, dispatch: orderDispatch } = orderState();
  // const navigation = useNavigation();
  const { dispatch } = userState();
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
          position: "absolute",
          width: "100%",
          height: 60,
          backgroundColor: "#00E0FF",
        }}>
        <View
          style={{
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
              marginVertical: "auto",
            }}>
            Dashboard
          </Text>
        </View>
      </View>
      {odrState && odrState.error ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text
            style={{
              textAlign: "center",
              marginHorizontal: "auto",
              color: "#bdbdbd",
              fontWeight: "700",
              fontSize: 15,
              letterSpacing: 2,
              marginVertical: 10,
              padding: 20,
            }}>
            {odrState.error}
          </Text>
          <Button
            mode='contained'
            onPress={logout}
            style={{
              marginVertical: 20,
              marginHorizontal: "auto",
              width: "80%",
              backgroundColor: "#4fc3f7",
              boxShadow: "0px 2px 5px 2px #bdbdbd",
            }}
            labelStyle={{
              color: "#ffffff",
              fontWeight: "700",
              fontSize: 15,
              letterSpacing: 2,
            }}>
            Log Out
          </Button>
        </View>
      ) : (
        <Tabs selectedTabClassName='selectedTab' className='tabs'>
          <TabList className='tabList'>
            <Tab>
              <Text
                style={{ fontWeight: "600", fontSize: 15, color: "#4fc3f7" }}>
                New Orders
              </Text>
            </Tab>
            <Tab>
              <Text
                style={{ fontWeight: "600", fontSize: 15, color: "#4fc3f7" }}>
                Assigned Orders
              </Text>
            </Tab>
          </TabList>
          <TabPanel>
            <View
              style={{
                height: height * 0.7,
                width: "100%",
                //   border: "1px solid black",
              }}>
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
                <NewOrders />
              </Suspense>
            </View>
          </TabPanel>
          <TabPanel>
            <View
              style={{
                height: height * 0.7,
                width: "100%",
                //   border: "1px solid black",
              }}>
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
                      animating={true}
                      color='#82b1ff'
                      style={{
                        margin: "auto",
                      }}
                    />
                  </View>
                }>
                <AssignedOrders />
              </Suspense>
            </View>
          </TabPanel>
        </Tabs>
      )}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  v1: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
