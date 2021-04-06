import React, { Suspense } from "react";
import { lazy } from "@loadable/component";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {} from "react-native-paper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./tab.css";
const { height } = Dimensions.get("window");
const NewOrders = lazy(() => import("./NewOrders"));
const AssignedOrders = lazy(() => import("./AssignedOrders"));

const Dashboard = () => {
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
      <Tabs selectedTabClassName='selectedTab' className='tabs'>
        <TabList className='tabList'>
          <Tab>
            <Text style={{ fontWeight: "600", fontSize: 15, color: "#4fc3f7" }}>
              New Orders
            </Text>
          </Tab>
          <Tab>
            <Text style={{ fontWeight: "600", fontSize: 15, color: "#4fc3f7" }}>
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
