import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import copy from "copy-to-clipboard";

const { width } = Dimensions.get("window")

const SellerInfo = ({ odrState }) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#ffffff",
        marginHorizontal: "auto",
        marginVertical: 10,
      }}>
      <Text
        style={{
          fontSize: 15,
          letterSpacing: 2,
          fontWeight: "700",
          fontFamily: "Open Sans",
          color: "#37474f",
          marginVertical: 5,
        }}>
        Seller Info
      </Text>
      <View>
        <View style={{
          flexDirection: "row", justifyContent: "space-between"
        }}>
          <Text
            style={{
              width: 100,
              fontSize: 12,
              letterSpacing: 2,
              fontWeight: "600",
              fontFamily: "Open Sans",
              color: "#212121",
              textAlign: "left"
            }}>
            Store Name
          </Text>
          <Text
            style={{
              width: width * 0.6,
              fontSize: 12,
              letterSpacing: 2,
              fontWeight: "400",
              fontFamily: "Open Sans",
              color: "#212121",
              textAlign: "right"
            }}>
            {odrState.pickupOrder.resturantId.resturant_name}
          </Text>
        </View>
        <View style={{
          flexDirection: "row", alignItems: "center", justifyContent: "space-between"
        }}>
          <Text
            style={{
              width: 100,
              fontSize: 12,
              letterSpacing: 2,
              fontWeight: "600",
              fontFamily: "Open Sans",
              color: "#212121",
            }}>
            Phone No
          </Text>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5
          }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                fontFamily: "Open Sans",
                color: "#212121",
              }}>
              {odrState.pickupOrder.resturantId.phone}
            </Text>
            <TouchableOpacity onPress={() =>
              copy(odrState.pickupOrder.resturantId.phone)}
              style={{
                flexDirection: "row", alignItems: "center",
                marginLeft: 10
              }}>
              <Ionicons name='copy-outline' size={20} color='#82b1ff' />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          flexDirection: "row", justifyContent: "space-between",
        }}>
          <Text
            style={{
              width: 100,
              fontSize: 12,
              letterSpacing: 2,
              fontWeight: "600",
              fontFamily: "Open Sans",
              color: "#212121",
            }}>
            Address
          </Text>
          <Text
            style={{
              width: width * 0.6,
              fontSize: 12,
              letterSpacing: 2,
              fontWeight: "600",
              fontFamily: "Open Sans",
              textAlign: "right",
              color: "#212121",
            }}>
            {odrState.pickupOrder.resturantId.address}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default SellerInfo