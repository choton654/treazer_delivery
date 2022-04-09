import React, { Suspense, useState, useEffect } from "react";
import loadable, { lazy } from "@loadable/component";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Constants = loadable(() => import("expo-constants"));
import { Platform } from "react-native";
import * as Location from "expo-location";
const Login = lazy(() => import("../Login"));
const MoreDetails = lazy(() => import("../MoreDetails"));
const AccountHold = lazy(() => import("../AccountHold"));
const Tabs = lazy(() => import("./tabs"));
const Loading = lazy(() => import("./Loading"));
import { geoLocationState } from "../context/locationcontext";
import { userState } from "../context/userContext";
import axios from "axios";

const Stack = createStackNavigator();

const RootNavigation = () => {
  const { state } = userState();
  const { dispatch: locationDispatch } = geoLocationState();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Constants.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let address = await Location.getCurrentPositionAsync({});
      setLocation(address);
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${address?.coords.longitude},${address?.coords.latitude}.json?country=IN&access_token=pk.eyJ1IjoidHJlYXplciIsImEiOiJja2xxYXJsZmgwMmJwMnBtaXR0M25leTY5In0.Iaj3HteMWU5ZQWCniy4KRA`
        )
        .then((res) => {
          const { features } = res.data;
          // console.log(features[0].place_name.split(",")[0]);
          // console.log(features[0].place_name.split(",")[1]);
          locationDispatch({
            type: "SET_LOCATION_ADDRESS",
            payload: {
              landmark: features[0].place_name.split(",")[0],
              locality: features[0].place_name.split(",")[1],
            },
          });
        })
        .catch((err) => console.log(err));
      // getuserLocation();
      locationDispatch({
        type: "SET_LOCATION",
        payload: {
          latitude: address.coords.latitude,
          longitude: address.coords.longitude,
        },
      });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
    console.log(text);
  } else if (location) {
    text = JSON.stringify(location);
    localStorage.setItem("location", text);
  }

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
        ) : state.user && state.user.isAdminAccountHold === true ? (
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
        ) : state.user && state.user.isAdminAccountHold === false ? (
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
            name='Loading'
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
                <Loading {...props} />
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
