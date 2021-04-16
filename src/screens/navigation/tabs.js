import React, { Suspense } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { lazy } from "@loadable/component";
const Dashboard = lazy(() => import("../Dashboard"));
const CompleteOrder = lazy(() => import("../CompleteOrder"));
const Profile = lazy(() => import("../Profile"));
const OrderDetails = lazy(() => import("../orderDetails"));
const AdminDashboard = lazy(() => import("../adminDashboard"));
import Ionicons from "react-native-vector-icons/Ionicons";
import { userState } from "../context/userContext";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { state } = userState();
  const user = JSON.parse(localStorage.getItem("user"));
  const deliveryType = user && user.deliveryType;
  const isAdminAccountHold = user && user.isAdminAccountHold;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconColor;
          let iconSize;
          if (route.name === "Dashboard") {
            iconName = focused ? "md-home" : "md-home-outline";
            iconColor = focused ? "#4fc3f7" : "#424242";
            iconSize = focused ? 35 : 25;
          } else if (route.name === "CompleteOrder") {
            iconName = focused ? "md-list-circle" : "md-list-circle-outline";
            iconColor = focused ? "#4fc3f7" : "#424242";
            iconSize = focused ? 35 : 25;
          } else if (route.name === "Profile") {
            iconName = focused ? "md-person" : "md-person-outline";
            iconColor = focused ? "#4fc3f7" : "#424242";
            iconSize = focused ? 35 : 25;
          } else if (route.name === "OrderDetails") {
            iconName = focused ? "map" : "map-outline";
            iconColor = focused ? "#4fc3f7" : "#424242";
            iconSize = focused ? 35 : 25;
          } else if (route.name === "AdminDashboard") {
            iconName = focused
              ? "ios-analytics-sharp"
              : "ios-analytics-outline";
            iconColor = focused ? "#4fc3f7" : "#424242";
            iconSize = focused ? 35 : 25;
          }
          return <Ionicons name={iconName} size={iconSize} color={iconColor} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#4fc3f7",
        inactiveTintColor: "gray",
        showLabel: false,
      }}>
      <Tab.Screen
        name='Dashboard'
        component={(props) => (
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
            <Dashboard {...props} />
          </Suspense>
        )}
      />
      <Tab.Screen
        name='CompleteOrder'
        component={(props) => (
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
            <CompleteOrder {...props} />
          </Suspense>
        )}
      />
      <Tab.Screen
        name='OrderDetails'
        component={(props) => (
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
            <OrderDetails {...props} />
          </Suspense>
        )}
      />
      {deliveryType === "admin" && isAdminAccountHold === false && (
        <Tab.Screen
          name='AdminDashboard'
          component={(props) => (
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
              <AdminDashboard {...props} />
            </Suspense>
          )}
        />
      )}
      {state.isLogin && (
        <Tab.Screen
          name='Profile'
          component={(props) => (
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
              <Profile {...props} />
            </Suspense>
          )}
        />
      )}
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
