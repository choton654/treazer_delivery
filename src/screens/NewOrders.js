import React from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
const { height } = Dimensions.get("window");
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-paper";
import axios from "axios";
import BASE_URL from "../api";
const NewOrders = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        width: "100%",
        backgroundColor: "#ffffff",
      }}>
      <View
        style={{
          height: 220,
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
              borderBottomWidth: 1,
              borderBottomColor: "#455a64",
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
          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
            }}>
            <Ionicons
              name='location-sharp'
              size={20}
              color='#4fc3f7'
              style={{ marginLeft: 10 }}
            />
            <Text
              style={{
                marginHorizontal: 5,
                fontWeight: "600",
                fontSize: 12,
                color: "#424242",
                letterSpacing: 1,
              }}>
              35 open St. kolkata-700001
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 5,
            }}>
            <Button
              mode='contained'
              //   onPress={() => navigation.navigate("Details")}
              style={{
                marginBottom: 10,
                width: "20%",
                height: 30,
                backgroundColor: "#4fc3f7",
                boxShadow: "0px 2px 2px 2px #bdbdbd",
              }}
              labelStyle={{
                color: "#ffffff",
                fontWeight: "700",
                fontSize: 12,
                marginHorizontal: "none",
              }}>
              Accept
            </Button>
            <Button
              mode='contained'
              //   onPress={() => navigation.navigate("Details")}
              style={{
                marginBottom: 10,
                width: "20%",
                height: 30,
                backgroundColor: "#ff5252",
                boxShadow: "0px 2px 2px 2px #bdbdbd",
              }}
              labelStyle={{
                color: "#ffffff",
                fontWeight: "700",
                fontSize: 12,
                marginHorizontal: "none",
              }}>
              Reject
            </Button>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 220,
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
              borderBottomWidth: 1,
              borderBottomColor: "#455a64",
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
          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
            }}>
            <Ionicons
              name='location-sharp'
              size={20}
              color='#4fc3f7'
              style={{ marginLeft: 10 }}
            />
            <Text
              style={{
                marginHorizontal: 5,
                fontWeight: "600",
                fontSize: 12,
                color: "#424242",
                letterSpacing: 1,
              }}>
              35 open St. kolkata-700001
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 5,
            }}>
            <Button
              mode='contained'
              //   onPress={() => navigation.navigate("Details")}
              style={{
                marginBottom: 10,
                width: "20%",
                height: 30,
                backgroundColor: "#4fc3f7",
                boxShadow: "0px 2px 2px 2px #bdbdbd",
              }}
              labelStyle={{
                color: "#ffffff",
                fontWeight: "700",
                fontSize: 12,
                marginHorizontal: "none",
              }}>
              Accept
            </Button>
            <Button
              mode='contained'
              //   onPress={() => navigation.navigate("Details")}
              style={{
                marginBottom: 10,
                width: "20%",
                height: 30,
                backgroundColor: "#ff5252",
                boxShadow: "0px 2px 2px 2px #bdbdbd",
              }}
              labelStyle={{
                color: "#ffffff",
                fontWeight: "700",
                fontSize: 12,
                marginHorizontal: "none",
              }}>
              Reject
            </Button>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 220,
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
              borderBottomWidth: 1,
              borderBottomColor: "#455a64",
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
          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
            }}>
            <Ionicons
              name='location-sharp'
              size={20}
              color='#4fc3f7'
              style={{ marginLeft: 10 }}
            />
            <Text
              style={{
                marginHorizontal: 5,
                fontWeight: "600",
                fontSize: 12,
                color: "#424242",
                letterSpacing: 1,
              }}>
              35 open St. kolkata-700001
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 5,
            }}>
            <Button
              mode='contained'
              //   onPress={() => navigation.navigate("Details")}
              style={{
                marginBottom: 10,
                width: "20%",
                height: 30,
                backgroundColor: "#4fc3f7",
                boxShadow: "0px 2px 2px 2px #bdbdbd",
              }}
              labelStyle={{
                color: "#ffffff",
                fontWeight: "700",
                fontSize: 12,
                marginHorizontal: "none",
              }}>
              Accept
            </Button>
            <Button
              mode='contained'
              //   onPress={() => navigation.navigate("Details")}
              style={{
                marginBottom: 10,
                width: "20%",
                height: 30,
                backgroundColor: "#ff5252",
                boxShadow: "0px 2px 2px 2px #bdbdbd",
              }}
              labelStyle={{
                color: "#ffffff",
                fontWeight: "700",
                fontSize: 12,
                marginHorizontal: "none",
              }}>
              Reject
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default NewOrders;

const styles = StyleSheet.create({});
