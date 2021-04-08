import React, { Suspense } from "react";
import { lazy } from "@loadable/component";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import Login from "../Login";
const Login = lazy(() => import("../Login"));
const MoreDetails = lazy(() => import("../MoreDetails"));
const AccountHold = lazy(() => import("../AccountHold"));

const Tabs = lazy(() => import("./tabs"));
const Stack = createStackNavigator();
import { userState } from "../context/userContext";
const RootNavigation = () => {
  const { state } = userState();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!state.isLogin ? (
          <Stack.Screen
            name='Home'
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
                <Login {...props} />
              </Suspense>
            )}
          />
        ) : state.user && state.user.deliveryType === "none" ? (
          <Stack.Screen
            name='Details'
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
                <MoreDetails {...props} />
              </Suspense>
            )}
          />
        ) : state.user && state.user.deliveryType !== "admin" ? (
          <Stack.Screen
            name='Tabs'
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
                <Tabs {...props} />
              </Suspense>
            )}
          />
        ) : (
          <Stack.Screen
            name='Account_Hold'
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
                <AccountHold {...props} />
              </Suspense>
            )}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
