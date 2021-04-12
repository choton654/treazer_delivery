import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
const { height } = Dimensions.get("window");
import { geoLocationState } from "./context/locationcontext";
import { orderState } from "./context/orderContext";
import {
  ActivityIndicator,
  Divider,
  Button,
  TextInput,
} from "react-native-paper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import "./site.css";
import axios from "axios";
import BASE_URL from "../api";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
  "pk.eyJ1IjoidHJlYXplciIsImEiOiJja2xxYXJsZmgwMmJwMnBtaXR0M25leTY5In0.Iaj3HteMWU5ZQWCniy4KRA";

const OrderDetails = ({ route }) => {
  const navigation = useNavigation();
  const { state: locationState } = geoLocationState();
  const { state: odrState, dispatch: orderDispatch } = orderState();
  const mapContainer = useRef();
  const [lng, setLng] = useState(locationState.longitude);
  const [lat, setLat] = useState(locationState.latitude);
  const [zoom, setZoom] = useState(15);
  const [getAddress, setGetAddress] = useState(false);
  const [sellerOTP, setSellerOTP] = useState("");

  const orderAddressLongitude =
    odrState.pickupOrder &&
    odrState.pickupOrder.shippingaddress.coordinates &&
    odrState.pickupOrder.shippingaddress.coordinates[0];
  const orderAddressLattitude =
    odrState.pickupOrder &&
    odrState.pickupOrder.shippingaddress.coordinates &&
    odrState.pickupOrder.shippingaddress.coordinates[1];

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    const nav = new mapboxgl.NavigationControl({ visualizePitch: true });
    map.addControl(nav, "bottom-left");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      fitBoundsOptions: {
        maxZoom: 18,
      },
    });
    geolocate.on("geolocate", (data, err) => {
      // console.log(data);
      setLat(data.coords.latitude);
      setLng(data.coords.longitude);
    });
    map.addControl(geolocate);

    // Set options
    const userMarker = new mapboxgl.Marker({
      color: "#d32f2f",
      draggable: false,
    })
      .setLngLat([locationState.longitude, locationState.latitude])
      .addTo(map);

    map.addControl(userMarker);

    var destinationMarker = new mapboxgl.Marker({
      color: "#4caf50",
      draggable: false,
    })
      .setLngLat([orderAddressLongitude, orderAddressLattitude])
      .addTo(map);

    map.addControl(destinationMarker);

    if (getAddress) {
      map.on("load", () => {
        axios
          .get(
            `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${locationState.longitude}%2C${locationState.latitude}%3B${orderAddressLongitude}%2C${orderAddressLattitude}?alternatives=true&geometries=geojson&steps=true&access_token=pk.eyJ1IjoidHJlYXplciIsImEiOiJja2xxYXJsZmgwMmJwMnBtaXR0M25leTY5In0.Iaj3HteMWU5ZQWCniy4KRA`
          )
          .then((res) => {
            console.log(res.data.routes[0]);
            const route2 = res.data.routes[0].geometry.coordinates;
            const geojson = {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: route2,
              },
            };
            // if the route already exists on the map, reset it using setData
            if (map.getSource("route")) {
              map.getSource("route").setData(geojson);
            } else {
              // otherwise, make a new request
              map.addLayer({
                id: "route",
                type: "line",
                source: {
                  type: "geojson",
                  data: {
                    type: "Feature",
                    properties: {},
                    geometry: {
                      type: "LineString",
                      coordinates: route2,
                    },
                  },
                },
                layout: {
                  "line-join": "round",
                  "line-cap": "round",
                },
                paint: {
                  "line-color": "#ffab00",
                  "line-width": 5,
                  "line-opacity": 1,
                },
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }, [getAddress]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View
        style={{
          height: height * 1.5,
          width: "90%",
          marginHorizontal: "auto",
          alignItems: "center",
          backgroundColor: "#ffffff",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          top: height * 0.7,
        }}>
        <View
          style={{
            width: "100%",
            height: 400,
          }}>
          <div className='map-container-2' ref={mapContainer} />
        </View>
        <TouchableOpacity
          onPress={() => {
            // navigation.goBack();
            setGetAddress(!getAddress);
          }}
          style={{
            width: "80%",
            height: 40,
            padding: "auto",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: "auto",
            marginVertical: 10,
            borderRadius: 20,
            boxShadow: "3px 4px 6px #C9CCD1, -3px -4px 6px #ffffff",
            backgroundColor: "#4fc3f7",
          }}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontFamily: "Roboto Slab",
              fontSize: 20,
              color: "#ffffff",
            }}>
            On/Off Route
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: "100%",
            backgroundColor: "#ffffff",
            marginHorizontal: "auto",
            marginVertical: 5,
            paddingRight: 10,
          }}>
          <Text
            style={{
              fontSize: 15,
              letterSpacing: 2,
              fontWeight: "700",
              fontFamily: "Open Sans",
              color: "#bdbdbd",
              marginVertical: 5,
            }}>
            Buyer Info
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  letterSpacing: 2,
                  fontWeight: "400",
                  fontFamily: "Open Sans",
                  color: "#212121",
                }}>
                Buyer Name
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  letterSpacing: 2,
                  fontWeight: "400",
                  fontFamily: "Open Sans",
                  color: "#212121",
                }}>
                Phone No
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  letterSpacing: 2,
                  fontWeight: "400",
                  fontFamily: "Open Sans",
                  color: "#212121",
                }}>
                Address
              </Text>
            </View>
            <View
              style={{
                marginLeft: 5,
                width: "70%",
              }}>
              <Text
                style={{
                  fontSize: 12,
                  letterSpacing: 2,
                  fontWeight: "400",
                  fontFamily: "Open Sans",
                  color: "#212121",
                }}>
                :{odrState.pickupOrder.userId.username}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  letterSpacing: 2,
                  fontWeight: "400",
                  fontFamily: "Open Sans",
                  color: "#212121",
                }}>
                :{odrState.pickupOrder.userId.mobile_no}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  letterSpacing: 2,
                  fontWeight: "400",
                  fontFamily: "Open Sans",
                  color: "#212121",
                }}>
                :{odrState.pickupOrder.resturantId.address}
              </Text>
            </View>
          </View>
        </View>
        <Divider
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#bdbdbd",
            marginHorizontal: "auto",
            marginVertical: 5,
          }}
        />
        <View style={{ width: "100%" }}>
          <Text>Buyer OTP:</Text>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}>
            <TextInput
              label='OTP'
              value={sellerOTP}
              // error={phoneError ? true : false}
              onChangeText={(text) => {
                setSellerOTP(text);
              }}
              mode='outlined'
              style={{
                height: 30,
                width: "50%",
                color: "#212121",
                backgroundColor: "#ffffff",
              }}
            />
            <Button
              mode='contained'
              // onPress={login}
              compact={true}
              // disabled={
              //   !phoneErrors() && !phoneError && !passwordError ? false : true
              // }
              style={{
                marginVertical: 5,
                width: 80,
                height: 30,
                backgroundColor: "#81d4fa",
                boxShadow: "0px 2px 5px 2px #bdbdbd",
              }}
              labelStyle={{
                color: "#ffffff",
                fontWeight: "700",
                fontSize: 12,
                letterSpacing: 1,
              }}>
              Match
            </Button>
          </View>
        </View>
        <Divider
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#bdbdbd",
            marginHorizontal: "auto",
            marginVertical: 10,
          }}
        />
        <View style={{ width: "100%", marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 15,
              letterSpacing: 2,
              fontWeight: "700",
              fontFamily: "Open Sans",
              color: "#bdbdbd",
              marginTop: 5,
              marginBottom: 10,
            }}>
            Packeg Photo
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}>
            <View
              style={{
                width: 150,
                height: 200,
                backgroundColor: "#eeeeee",
              }}></View>
            <View
              style={{
                width: 150,
                height: 200,
                backgroundColor: "#eeeeee",
              }}></View>
          </View>
        </View>
        <Button
          mode='contained'
          onPress={() => navigation.goBack()}
          style={{
            marginVertical: 10,
            width: 80,
            height: 30,
            backgroundColor: "#81d4fa",
            boxShadow: "0px 2px 5px 2px #bdbdbd",
          }}
          labelStyle={{
            color: "#ffffff",
            fontWeight: "700",
            fontSize: 12,
            letterSpacing: 1,
          }}>
          Back
        </Button>
      </View>

      <View
        style={{
          position: "absolute",
          height: height * 0.7,
          width: "100%",
          // border: "1px solid black",
        }}>
        <View
          style={{
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
        {odrState.pickupOrder ? (
          <View style={{ width: "100%", padding: 20 }}>
            <Text
              style={{
                fontSize: 15,
                letterSpacing: 2,
                fontWeight: "700",
                fontFamily: "Open Sans",
                color: "#212121",
              }}>
              {odrState.pickupOrder.userId.username}
            </Text>
            <View
              style={{
                justifyContent: "space-between",
                marginVertical: 10,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  letterSpacing: 2,
                  fontWeight: "400",
                  fontFamily: "Open Sans",
                  color: "#212121",
                }}>
                order time:
                <Text
                  style={{
                    textAlign: "Center",
                    fontSize: 12,
                    letterSpacing: 2,
                    fontWeight: "400",
                    fontFamily: "Open Sans",
                    color: "#212121",
                  }}>
                  {odrState.pickupOrder.createdAt}
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  letterSpacing: 2,
                  fontWeight: "600",
                  fontFamily: "Open Sans",
                  color: "#212121",
                  marginVertical: 5,
                }}>
                Order ID:{" "}
                <Text
                  style={{
                    textAlign: "Center",
                    fontSize: 12,
                    letterSpacing: 2,
                    fontWeight: "600",
                    fontFamily: "Open Sans",
                    color: "#212121",
                  }}>
                  {odrState.pickupOrder._id}
                </Text>
              </Text>
            </View>
            <Divider
              style={{
                height: 3,
                width: "100%",
                backgroundColor: "#bdbdbd",
                marginHorizontal: "auto",
              }}
            />
            <View
              style={{
                justifyContent: "space-between",
                marginVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    letterSpacing: 2,
                    fontWeight: "600",
                    fontFamily: "Open Sans",
                    color: "#212121",
                  }}>
                  order Amount
                </Text>
                <Text
                  style={{
                    textAlign: "Center",
                    fontSize: 12,
                    letterSpacing: 2,
                    fontWeight: "600",
                    fontFamily: "Open Sans",
                    color: "#212121",
                  }}>
                  Rs.{odrState.pickupOrder.totalPrice}
                </Text>
              </View>
              <Divider
                style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: "#bdbdbd",
                  marginHorizontal: "auto",
                  marginVertical: 5,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    letterSpacing: 2,
                    fontWeight: "600",
                    fontFamily: "Open Sans",
                    color: "#212121",
                    marginVertical: 5,
                  }}>
                  Payment Type
                </Text>
                <Text
                  style={{
                    textAlign: "Center",
                    fontSize: 12,
                    letterSpacing: 2,
                    fontWeight: "600",
                    fontFamily: "Open Sans",
                    color: "#212121",
                  }}>
                  Pre-paid
                </Text>
              </View>
              <Divider
                style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: "#bdbdbd",
                  marginHorizontal: "auto",
                  marginVertical: 5,
                }}
              />
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  backgroundColor: "#ffffff",
                  marginHorizontal: "auto",
                  marginVertical: 5,
                  paddingRight: 10,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    letterSpacing: 2,
                    fontWeight: "700",
                    fontFamily: "Open Sans",
                    color: "#bdbdbd",
                    marginVertical: 5,
                  }}>
                  Seller Info
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        letterSpacing: 2,
                        fontWeight: "400",
                        fontFamily: "Open Sans",
                        color: "#212121",
                      }}>
                      Store Name
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        letterSpacing: 2,
                        fontWeight: "400",
                        fontFamily: "Open Sans",
                        color: "#212121",
                      }}>
                      Seller Name
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        letterSpacing: 2,
                        fontWeight: "400",
                        fontFamily: "Open Sans",
                        color: "#212121",
                      }}>
                      Phone No
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        letterSpacing: 2,
                        fontWeight: "400",
                        fontFamily: "Open Sans",
                        color: "#212121",
                      }}>
                      Address
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 5,
                      width: "70%",
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        letterSpacing: 2,
                        fontWeight: "400",
                        fontFamily: "Open Sans",
                        color: "#212121",
                      }}>
                      :{odrState.pickupOrder.resturantId.resturant_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        letterSpacing: 2,
                        fontWeight: "400",
                        fontFamily: "Open Sans",
                        color: "#212121",
                      }}>
                      :{odrState.pickupOrder.resturantId.resturant_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        letterSpacing: 2,
                        fontWeight: "400",
                        fontFamily: "Open Sans",
                        color: "#212121",
                      }}>
                      :{odrState.pickupOrder.resturantId.phone}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        letterSpacing: 2,
                        fontWeight: "400",
                        fontFamily: "Open Sans",
                        color: "#212121",
                      }}>
                      :{odrState.pickupOrder.resturantId.address}
                    </Text>
                  </View>
                </View>
              </View>
              <Divider
                style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: "#bdbdbd",
                  marginHorizontal: "auto",
                  marginVertical: 5,
                }}
              />
              <View style={{ width: "100%", flex: 1 }}>
                <Text>Seller OTP:</Text>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                  }}>
                  <TextInput
                    label='OTP'
                    value={sellerOTP}
                    // error={phoneError ? true : false}
                    onChangeText={(text) => {
                      setSellerOTP(text);
                    }}
                    mode='outlined'
                    style={{
                      height: 30,
                      width: "50%",
                      color: "#212121",
                      backgroundColor: "#ffffff",
                    }}
                  />
                  <Button
                    mode='contained'
                    // onPress={login}
                    compact={true}
                    // disabled={
                    //   !phoneErrors() && !phoneError && !passwordError ? false : true
                    // }
                    style={{
                      marginVertical: 5,
                      width: 80,
                      height: 30,
                      backgroundColor: "#81d4fa",
                      boxShadow: "0px 2px 5px 2px #bdbdbd",
                    }}
                    labelStyle={{
                      color: "#ffffff",
                      fontWeight: "700",
                      fontSize: 12,
                      letterSpacing: 1,
                    }}>
                    Match
                  </Button>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ width: "100%", marginVertical: "auto", padding: 20 }}>
            <Text
              style={{
                textAlign: "Center",
                fontSize: 20,
                letterSpacing: 2,
                fontWeight: "700",
                fontFamily: "Open Sans",
                color: "#bdbdbd",
              }}>
              You have not picked up any order
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({});
