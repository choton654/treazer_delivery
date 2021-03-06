import React, { Suspense, useState } from "react";
import { lazy } from "@loadable/component";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Button, ActivityIndicator, Snackbar } from "react-native-paper";
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
import Header from "../components/OrderDetails/Header";

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
  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const [visible1, setVisible1] = useState(false);
  const onDismissSnackBar1 = () => setVisible1(false);
  return (
    <View style={styles.v1}>
      <Header title={"Dashboard"} />
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
        <Tabs selectedTabClassName='selectedTab'>
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
                height: height * 0.75,
                width: "100%",
                paddingBottom: 10
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
                <NewOrders setVisible1={setVisible1} />
              </Suspense>
              <Snackbar
                visible={visible1}
                onDismiss={onDismissSnackBar1}
                style={{
                  backgroundColor: "#fff", borderWidth: 2,
                  borderColor: "#00E0FF"
                }}
                action={{
                  label: "Close",
                  onPress: () => {
                    onDismissSnackBar1();
                  },
                }}>
                <Text style={{ color: "#00E0FF", fontWeight: "700", letterSpacing: 1 }}>
                  You have accepted an order
                </Text>
              </Snackbar>
            </View>
          </TabPanel>
          <TabPanel>
            <View
              style={{
                height: height * 0.75,
                width: "100%",
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
                <AssignedOrders setVisible={setVisible} />
              </Suspense>
              <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                style={{
                  backgroundColor: "#fff", borderWidth: 2,
                  borderColor: "#00E0FF"
                }}
                action={{
                  label: "Close",
                  onPress: () => {
                    onDismissSnackBar();
                  },
                }}>
                <Text style={{ color: "#00E0FF", fontWeight: "700", letterSpacing: 1 }}>
                  You have rejected an order
                </Text>
              </Snackbar>
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
    backgroundColor: "#ffffff"
  },
});
