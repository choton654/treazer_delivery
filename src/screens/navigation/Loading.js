import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { userState } from "../context/userContext";
import axios from "axios";
import BASE_URL from "../../api";

const Loading = () => {
  const { state, dispatch } = userState();

  const token = localStorage.getItem("token");
  const refreshtoken = localStorage.getItem("refresh-token");
  const userId = JSON.parse(localStorage.getItem("user"))?._id;
  useEffect(() => {
    if (!state.user) {
      getSingleUser();
    }
  }, []);
  const getSingleUser = () => {
    axios
      .get(`${BASE_URL}/api/user/${userId}/profile`, {
        headers: {
          "x-token": token,
          "x-refresh-token": refreshtoken,
        },
      })
      .then((res) => {
        const { user } = res.data;
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: "USER_PROFILE", payload: user });
      })
      .catch((err) => console.log(err));
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <ActivityIndicator animating={true} color='#82b1ff' size='large' />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
