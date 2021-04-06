import React, { Suspense } from "react";
import { lazy } from "@loadable/component";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import Login from "../Login";
const Login = lazy(() => import("../Login"));
const MoreDetails = lazy(() => import("../MoreDetails"));
const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
