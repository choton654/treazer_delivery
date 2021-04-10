import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
const { height } = Dimensions.get("window");
import { geoLocationState } from "./context/locationcontext";
import { orderState } from "./context/orderContext";
import { ActivityIndicator } from "react-native-paper";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import "./site.css";
import axios from "axios";
import BASE_URL from "../api";
import { useNavigation } from "@react-navigation/native";

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
    if (getAddress) {
      map.addControl(geolocate);
    }
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
                "line-color": "#3887be",
                "line-width": 5,
                "line-opacity": 0.75,
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [getAddress]);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "#ffffff" }}>
      <View
        style={{
          width: "100%",
          height: "75%",
        }}>
        <div className='map-container-2' ref={mapContainer} />
      </View>
      <View
        style={{
          width: "100%",
          height: "15%",
          alignContent: "center",
          justifyContent: "center",
        }}>
        <TouchableOpacity
          onPress={() => {
            // navigation.goBack();
            setGetAddress(!getAddress);
          }}
          style={{
            width: 100,
            height: 60,
            padding: "auto",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: "auto",
            marginVertical: "auto",
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
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({});
