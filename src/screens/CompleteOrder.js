import React from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
const { height } = Dimensions.get("window");
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-paper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const CompleteOrder = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View
        style={{
          // position: "absolute",
          width: "100%",
          height: 60,
          backgroundColor: "#00E0FF",
        }}>
        <View
          style={{
            height: 50,
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
              boxShadow: "0px 2px 5px 1px #546e7a",
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
            }}>
            Completed Orders
          </Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          backgroundColor: "#ffffff",
        }}>
        <View
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
              Soumyajit Chakraborty
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
              Order Time:{" "}
              <Text
                style={{
                  marginHorizontal: 5,
                  fontWeight: "700",
                  fontSize: 12,
                  color: "#424242",
                  letterSpacing: 1,
                }}>
                Jan 08 09:48AM
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
                  Rs.300
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
                  Online
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
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
              Soumyajit Chakraborty
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
              Order Time:{" "}
              <Text
                style={{
                  marginHorizontal: 5,
                  fontWeight: "700",
                  fontSize: 12,
                  color: "#424242",
                  letterSpacing: 1,
                }}>
                Jan 08 09:48AM
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
                  Rs.300
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
                  Online
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
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
              Soumyajit Chakraborty
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
              Order Time:{" "}
              <Text
                style={{
                  marginHorizontal: 5,
                  fontWeight: "700",
                  fontSize: 12,
                  color: "#424242",
                  letterSpacing: 1,
                }}>
                Jan 08 09:48AM
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
                  Rs.300
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
                  Online
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
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
              Soumyajit Chakraborty
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
              Order Time:{" "}
              <Text
                style={{
                  marginHorizontal: 5,
                  fontWeight: "700",
                  fontSize: 12,
                  color: "#424242",
                  letterSpacing: 1,
                }}>
                Jan 08 09:48AM
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
                  Rs.300
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
                  Online
                </Text>
              </View>
            </View>
          </View>
        </View>
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
