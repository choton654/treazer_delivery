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
    map.addControl(geolocate);

    geolocate.on("geolocate", (data, err) => {
      // console.log(data);
      setLat(data.coords.latitude);
      setLng(data.coords.longitude);
    });
  }, []);

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
            navigation.goBack();
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
