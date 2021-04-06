import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CompleteOrder = () => {
  return (
    <View style={styles.v1}>
      <Text>From complete order</Text>
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
