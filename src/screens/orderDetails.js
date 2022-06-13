import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
} from "react-native";
const { height } = Dimensions.get("window");
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { geoLocationState } from "./context/locationcontext";
import { orderState } from "./context/orderContext";
import {
  Button,
  ActivityIndicator,
  Dialog,
  Portal,
  Snackbar,
  Paragraph,
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
import SellerInfo from "../components/OrderDetails/SellerInfo";
import BuyerInfo from "../components/OrderDetails/BuyerInfo";
import Header from "../components/OrderDetails/Header";
import OrderInfo from "../components/OrderDetails/OrderInfo";

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
  const [getRestaurantAddress, setGetRestaurantAddress] = useState(true);

  // const [sellerOTP, setSellerOTP] = useState("");
  const [buyerOTP, setBuyerOTP] = useState("");

  const orderAddressLongitude =
    odrState.pickupOrder &&
    odrState.pickupOrder.shippingaddress.coordinates &&
    odrState.pickupOrder.shippingaddress.coordinates[0];
  const orderAddressLattitude =
    odrState.pickupOrder &&
    odrState.pickupOrder.shippingaddress.coordinates &&
    odrState.pickupOrder.shippingaddress.coordinates[1];

  const restaurantAddressLongitude =
    odrState.pickupOrder &&
    odrState.pickupOrder.resturantId.location &&
    odrState.pickupOrder.resturantId.location.coordinates &&
    odrState.pickupOrder.resturantId.location.coordinates[0];
  const restaurantAddressLattitude =
    odrState.pickupOrder &&
    odrState.pickupOrder.resturantId.location &&
    odrState.pickupOrder.resturantId.location.coordinates &&
    odrState.pickupOrder.resturantId.location.coordinates[1];

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
    new mapboxgl.Marker({
      color: "#d32f2f",
      draggable: false,
    })
      .setLngLat([locationState.longitude, locationState.latitude])
      .addTo(map);

    if (orderAddressLongitude && orderAddressLattitude) {
      new mapboxgl.Marker({
        color: "#4caf50",
        draggable: false,
      })
        .setLngLat([orderAddressLongitude, orderAddressLattitude])
        .addTo(map);
    }
    if (restaurantAddressLongitude, restaurantAddressLattitude) {
      new mapboxgl.Marker({
        color: "#fbc02d",
        draggable: false,
      })
        .setLngLat([restaurantAddressLongitude, restaurantAddressLattitude])
        .addTo(map);
    }
    if (getAddress) {
      map.on("load", () => {
        axios
          .get(
            `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${locationState.longitude}%2C${locationState.latitude}%3B${orderAddressLongitude}%2C${orderAddressLattitude}?alternatives=true&geometries=geojson&steps=true&access_token=pk.eyJ1IjoidHJlYXplciIsImEiOiJja2xxYXJsZmgwMmJwMnBtaXR0M25leTY5In0.Iaj3HteMWU5ZQWCniy4KRA`
          )
          .then((res) => {
            // console.log(res.data.routes[0]);
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

    if (getRestaurantAddress && restaurantAddressLongitude && restaurantAddressLattitude) {
      // console.log(restaurantAddressLongitude, restaurantAddressLattitude, locationState.longitude, locationState.latitude);
      map.on("load", () => {
        axios
          .get(
            `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${locationState.longitude}%2C${locationState.latitude}%3B${restaurantAddressLongitude}%2C${restaurantAddressLattitude}?alternatives=true&geometries=geojson&steps=true&access_token=pk.eyJ1IjoidHJlYXplciIsImEiOiJja2xxYXJsZmgwMmJwMnBtaXR0M25leTY5In0.Iaj3HteMWU5ZQWCniy4KRA`
          )
          .then((res) => {
            // console.log(res.data.routes[0]);
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
  }, [getAddress, getRestaurantAddress]);

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [sendImgReq1, setSendImgReq1] = useState(true);
  const [sendImgReq2, setSendImgReq2] = useState(true);
  const [customerPic, setCustomerPic] = useState(null);
  const [sendImgReq3, setSendImgReq3] = useState(true);

  const pickImage1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    // console.log(result);
    if (!result.cancelled) {
      let data = {
        file: result.uri,
        upload_preset: "treazer",
        api_key: 489227552964764,
      };
      setSendImgReq1(false);
      fetch("https://api.cloudinary.com/v1_1/treazer/image/upload", {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      })
        .then((res) => res.json())
        .then((data1) => {
          console.log(data1.secure_url);
          setImage1(data1.secure_url);
          setSendImgReq1(true);
        })
        .catch((err) => {
          console.log(err);
          alert("An Error Occured While Uploading");
        });
    }
  };

  const pickImage2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    // console.log(result);
    if (!result.cancelled) {
      let data = {
        file: result.uri,
        upload_preset: "treazer",
        api_key: 489227552964764,
      };
      setSendImgReq2(false);
      fetch("https://api.cloudinary.com/v1_1/treazer/image/upload", {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      })
        .then((res) => res.json())
        .then((data1) => {
          console.log(data1.secure_url);
          setImage2(data1.secure_url);
          setSendImgReq2(true);
        })
        .catch((err) => {
          console.log(err);
          alert("An Error Occured While Uploading");
        });
    }
  };
  const pickImage3 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    // console.log(result);
    if (!result.cancelled) {
      let data = {
        file: result.uri,
        upload_preset: "treazer",
        api_key: 489227552964764,
      };
      setSendImgReq3(false);
      fetch("https://api.cloudinary.com/v1_1/treazer/image/upload", {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      })
        .then((res) => res.json())
        .then((data1) => {
          console.log(data1.secure_url);
          setCustomerPic(data1.secure_url);
          setSendImgReq3(true);
        })
        .catch((err) => {
          console.log(err);
          alert("An Error Occured While Uploading");
        });
    }
  };

  const token = localStorage.getItem("token");
  const refreshtoken = localStorage.getItem("refresh-token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user && user._id;

  const uploadPackagePic = () => {
    const orderId = odrState.pickupOrder && odrState.pickupOrder._id;
    axios
      .post(
        `${BASE_URL}/api/order/packageImageUpload`,
        { deliveryboyId: userId, image1, image2, orderId },
        {
          headers: {
            "x-token": token,
            "x-refresh-token": refreshtoken,
          },
        }
      )
      .then((res) => {
        const { order } = res.data;
        console.log(order);
        setImage1(null);
        setImage2(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadCustomerPic = () => {
    const orderId = odrState.pickupOrder && odrState.pickupOrder._id;
    axios
      .post(
        `${BASE_URL}/api/order/customerImageUpload`,
        { deliveryboyId: userId, customerPic, orderId },
        {
          headers: {
            "x-token": token,
            "x-refresh-token": refreshtoken,
          },
        }
      )
      .then((res) => {
        const { order } = res.data;
        console.log(order);
        setCustomerPic(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [OTPreq, setOTPreq] = useState(true);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [OTPmsg, setOTPmsg] = useState("");
  const hideDialog = () => setVisible(false);

  const OTPmatch = (OTP) => {
    const orderId = odrState.pickupOrder && odrState.pickupOrder._id;
    const sellerOTP = typeof OTP === 'string' ? OTP : ''
    setOTPreq(false);
    axios
      .post(
        `${BASE_URL}/api/order/orderOTPmatch`,
        { deliveryboyId: userId, orderId, sellerOTP, buyerOTP },
        {
          headers: {
            "x-token": token,
            "x-refresh-token": refreshtoken,
          },
        }
      )
      .then((res) => {
        const { order, msg } = res.data;
        orderDispatch({ type: "GET_ONE_PICKUP_ORDER", payload: order });
        setVisible(true);
        setOTPmsg(msg);
        setOTPreq(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!odrState.pickupOrder?.isSellerOTPmatched) {
      OTPmatch(odrState.pickupOrder?.OTP)
    }
  }, [odrState.pickupOrder?.isSellerOTPmatched])

  const orderDone = () => {
    if (!odrState.pickupOrder) {
      setVisible1(true);
    } else if (odrState.pickupOrder && !odrState.pickupOrder.isPaid) {
      setVisible1(true);
    } else if (odrState.pickupOrder && odrState.pickupOrder.isPaid) {
      axios
        .post(
          `${BASE_URL}/api/order/completedOrder`,
          { deliveryboyId: userId },
          {
            headers: {
              "x-token": token,
              "x-refresh-token": refreshtoken,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          const { completedOrder } = res.data;
          orderDispatch({
            type: "GET_COMPLETED_ORDERS",
            payload: completedOrder,
          });
          orderDispatch({ type: "ORDER_DONE", payload: odrState.pickupOrder });
          navigation.navigate("Tabs", { screen: "CompleteOrder" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title={"Order Details"} />
      <ScrollView style={{ flex: 1, backgroundColor: "#ffffff" }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: height * 1.8,
            width: "90%",
            marginHorizontal: "auto",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            top: height * 0.5,
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
              setGetRestaurantAddress(!getRestaurantAddress);
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
              Switch Route
            </Text>
          </TouchableOpacity>
          {odrState.pickupOrder ? (
            <View style={{ width: "100%", marginBottom: 10 }}>
              <BuyerInfo odrState={odrState} />
              {odrState.pickupOrder.isBuyerOTPmatched ? (
                <View
                  style={{
                    width: "100%",
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                      fontWeight: "900",
                      color: "#00c853",
                      letterSpacing: 2,
                    }}>
                    Buyer OTP matched
                  </Text>
                </View>
              ) : (
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "700",
                      color: "#37474f",
                      letterSpacing: 2,
                    }}>
                    Buyer OTP:
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                    }}>
                    <TextInput
                      placeholder='OTP'
                      value={buyerOTP}
                      // error={phoneError ? true : false}
                      onChangeText={(text) => {
                        setBuyerOTP(text);
                        // setSellerOTP("");
                      }}
                      mode='outlined'
                      style={{
                        height: 30,
                        paddingHorizontal: 10,
                        marginTop: 10,
                        width: "50%",
                        color: "#212121",
                        backgroundColor: "#eeeeee",
                      }}
                    />
                    {OTPreq ? (
                      <Button
                        mode='contained'
                        onPress={OTPmatch}
                        compact={true}
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
                    ) : (
                      <ActivityIndicator
                        animating={true}
                        color='#82b1ff'
                        size='small'
                        style={{ marginRight: 20 }}
                      />
                    )}
                  </View>
                </View>
              )}
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
                You have to view an order to show in map
              </Text>
            </View>
          )}
          {odrState.pickupOrder && (
            <View style={{ width: "100%", marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 15,
                  letterSpacing: 2,
                  fontWeight: "700",
                  fontFamily: "Open Sans",
                  color: "#bdbdbd",
                  textAlign: "center",
                  marginTop: 5,
                  marginBottom: 10,
                }}>
                Package Photo
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}>
                {image1 ? (
                  <View
                    style={{ width: 150, height: 200, marginHorizontal: "auto" }}>
                    <LazyLoadImage
                      src={image1}
                      resizemode='cover'
                      effect='blur'
                      style={{
                        width: 150,
                        marginLeft: "auto",
                        height: 200,
                        borderRadius: 20,
                        boxShadow: "1px 3px 6px 1px #C9CCD1",
                        resizeMode: "contain",
                      }}
                    />
                    <View
                      style={{
                        position: "absolute",
                        flexDirection: "row",
                        right: 0,
                        background: "none",
                        width: 30,
                        marginRight: 20,
                        marginTop: 15,
                        height: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 20,
                      }}>
                      <TouchableOpacity onPress={() => setImage1(null)}>
                        <Ionicons
                          name='close-circle-outline'
                          size={26}
                          color='#82b1ff'
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : sendImgReq1 ? (
                  <TouchableOpacity style={styles.div_2} onPress={pickImage1}>
                    <Ionicons name='add' size={26} color='#82b1ff' />
                    <Text style={styles.text_1}>Add Top View</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.div_2}>
                    <ActivityIndicator
                      animating={true}
                      color='#82b1ff'
                      size='large'
                    />
                  </View>
                )}
                {image2 ? (
                  <View
                    style={{ width: 150, height: 200, marginHorizontal: "auto" }}>
                    <LazyLoadImage
                      src={image2}
                      resizemode='cover'
                      effect='blur'
                      style={{
                        width: 150,
                        marginLeft: "auto",
                        height: 200,
                        borderRadius: 20,
                        boxShadow: "1px 3px 6px 1px #C9CCD1",
                        resizeMode: "contain",
                      }}
                    />
                    <View
                      style={{
                        position: "absolute",
                        flexDirection: "row",
                        right: 0,
                        background: "none",
                        width: 30,
                        marginRight: 20,
                        marginTop: 15,
                        height: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 20,
                      }}>
                      <TouchableOpacity onPress={() => setImage2(null)}>
                        <Ionicons
                          name='close-circle-outline'
                          size={26}
                          color='#82b1ff'
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : sendImgReq2 ? (
                  <TouchableOpacity style={styles.div_2} onPress={pickImage2}>
                    <Ionicons name='add' size={26} color='#82b1ff' />
                    <Text style={styles.text_1}>Add Side View</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.div_2}>
                    <ActivityIndicator
                      animating={true}
                      color='#82b1ff'
                      size='large'
                    />
                  </View>
                )}
              </View>
              <Button
                mode='contained'
                onPress={uploadPackagePic}
                style={{
                  marginTop: 20,
                  width: "80%",
                  height: 30,
                  marginHorizontal: "auto",
                  backgroundColor: "#81d4fa",
                  boxShadow: "0px 2px 5px 2px #bdbdbd",
                }}
                labelStyle={{
                  color: "#ffffff",
                  fontWeight: "700",
                  fontSize: 15,
                  letterSpacing: 1,
                }}>
                Upload Package Pic
              </Button>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    fontSize: 15,
                    letterSpacing: 2,
                    fontWeight: "700",
                    fontFamily: "Open Sans",
                    color: "#bdbdbd",
                    textAlign: "center",
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  Customer's Smile
                </Text>
                {customerPic ? (
                  <View
                    style={{
                      width: "100%",
                      height: 200,
                      marginHorizontal: "auto",
                    }}>
                    <LazyLoadImage
                      src={customerPic}
                      resizemode='cover'
                      effect='blur'
                      style={{
                        width: "100%",
                        margin: "auto",
                        height: 200,
                        borderRadius: 20,
                        boxShadow: "1px 3px 6px 1px #C9CCD1",
                        resizeMode: "contain",
                      }}
                    />
                    <View
                      style={{
                        position: "absolute",
                        flexDirection: "row",
                        right: 0,
                        background: "none",
                        width: 30,
                        marginRight: 20,
                        marginTop: 15,
                        height: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 20,
                      }}>
                      <TouchableOpacity onPress={() => setCustomerPic(null)}>
                        <Ionicons
                          name='close-circle-outline'
                          size={26}
                          color='#82b1ff'
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : sendImgReq3 ? (
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      marginHorizontal: "auto",
                      height: 200,
                      backgroundColor: "#eeeeee",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      borderRadius: 20,
                      boxShadow: "1px 3px 6px 1px #C9CCD1",
                      padding: 10,
                    }}
                    onPress={pickImage3}>
                    <Ionicons name='add' size={26} color='#82b1ff' />
                    <Text style={styles.text_1}>Add Side View</Text>
                  </TouchableOpacity>
                ) : (
                  <View
                    style={{
                      width: "100%",
                      marginHorizontal: "auto",
                      height: 200,
                      backgroundColor: "#eeeeee",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      borderRadius: 20,
                      boxShadow: "1px 3px 6px 1px #C9CCD1",
                      padding: 10,
                    }}>
                    <ActivityIndicator
                      animating={true}
                      color='#82b1ff'
                      size='large'
                    />
                  </View>
                )}
              </View>
              <Button
                mode='contained'
                onPress={uploadCustomerPic}
                style={{
                  marginTop: 20,
                  width: "80%",
                  height: 30,
                  marginHorizontal: "auto",
                  backgroundColor: "#81d4fa",
                  boxShadow: "0px 2px 5px 2px #bdbdbd",
                }}
                labelStyle={{
                  color: "#ffffff",
                  fontWeight: "700",
                  fontSize: 15,
                  letterSpacing: 1,
                }}>
                Upload Customer Pic
              </Button>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: 20,
            }}>
            <Button
              mode='contained'
              onPress={() => navigation.goBack()}
              style={{
                marginVertical: 10,
                width: 30,
                height: 30,
                borderRadius: 5,
                backgroundColor: "#ffffff",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 5px 2px #bdbdbd",
              }}>
              <Ionicons name='return-down-back' size={30} color='#c62828' />
            </Button>
            <Button
              mode='contained'
              onPress={orderDone}
              style={{
                marginVertical: 10,
                width: 30,
                height: 30,
                borderRadius: 5,
                backgroundColor: "#ffffff",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 5px 2px #bdbdbd",
              }}>
              <Ionicons name='checkmark-sharp' size={30} color='#2e7d32' />
            </Button>
            <Snackbar
              visible={visible1}
              onDismiss={() => setVisible1(false)}
              action={{
                label: "Close",
                onPress: () => setVisible1(false),
              }}>
              OOPS!! payment is not done.
            </Snackbar>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            height: height * 0.7,
            width: "100%",
            // border: "1px solid black",
          }}>
          {odrState.pickupOrder ? (
            <View style={{ width: "100%", padding: 20 }}>
              <OrderInfo odrState={odrState} />
              <SellerInfo odrState={odrState} />
              {odrState.pickupOrder.isSellerOTPmatched ? (
                <View
                  style={{
                    width: "100%",
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                      fontWeight: "900",
                      color: "#00c853",
                      letterSpacing: 2,
                    }}>
                    Seller OTP matched
                  </Text>
                </View>
              ) : (
                <View style={{ width: "100%", flex: 1, marginTop: 20 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "700",
                      color: "#37474f",
                      letterSpacing: 2,
                    }}>
                    Seller OTP:
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                    }}>
                    <TextInput
                      placeholder='OTP'
                      value={odrState.pickupOrder.OTP}
                      // error={phoneError ? true : false}
                      // onChangeText={(text) => {
                      //   setSellerOTP(text);
                      //   setBuyerOTP("");
                      // }}
                      mode='outlined'
                      style={{
                        marginTop: 10,
                        paddingHorizontal: 10,
                        height: 30,
                        width: "50%",
                        color: "#212121",
                        backgroundColor: "#eeeeee",
                      }}
                    />
                    {OTPreq ? (
                      <Button
                        mode='contained'
                        // onPress={OTPmatch}
                        compact={true}
                        // disabled={sellerOTP === "" ? true : false}
                        disabled={true}
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
                    ) : (
                      <ActivityIndicator
                        animating={true}
                        color='#82b1ff'
                        size='small'
                        style={{ marginRight: 20 }}
                      />
                    )}
                  </View>
                </View>
              )}
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
                You have to view an order to show in map
              </Text>
            </View>
          )}
        </View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content
              style={{ justifyContent: "center", alignItems: "center" }}>
              <Paragraph
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  textAlign: "center",
                  letterSpacing: 2,
                }}>
                {" "}
                {OTPmsg}
              </Paragraph>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </ScrollView>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  div_2: {
    width: 150,
    marginHorizontal: "auto",
    height: 200,
    backgroundColor: "#eeeeee",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 20,
    boxShadow: "1px 3px 6px 1px #C9CCD1",
    padding: 10,
  },
  text_1: {
    marginVertical: 10,
    color: "#9e9e9e",
    letterSpacing: 1,
    fontSize: 15,
    textShadow: "1px 0 #e0e0e0",
  },
});
