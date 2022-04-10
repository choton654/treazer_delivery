import { View, Text } from 'react-native'
import React from 'react'

const OrderInfo = ({ odrState }) => {
    return (
        <View>
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
                    flexDirection: "row"
                }}>
                <Text
                    style={{
                        fontSize: 12,
                        letterSpacing: 1,
                        fontWeight: "600",
                        fontFamily: "Open Sans",
                        color: "#212121",
                    }}>
                    order time:
                </Text>
                <Text
                    style={{
                        textAlign: "Center",
                        fontSize: 12,
                        letterSpacing: 1,
                        fontWeight: "600",
                        fontFamily: "Open Sans",
                        color: "#212121",
                    }}>
                    {new Date(odrState.pickupOrder.createdAt).toDateString()}
                </Text>
            </View>

            <View
                style={{
                    justifyContent: "space-between",
                    flexDirection: "row"
                }}>
                <Text
                    style={{
                        fontSize: 12,
                        letterSpacing: 1,
                        fontWeight: "600",
                        fontFamily: "Open Sans",
                        color: "#212121",
                    }}>
                    Order ID:{" "}
                </Text>
                <Text
                    style={{
                        textAlign: "Center",
                        fontSize: 12,
                        letterSpacing: 1,
                        fontWeight: "600",
                        fontFamily: "Open Sans",
                        color: "#212121",
                    }}>
                    {odrState.pickupOrder._id}
                </Text>
            </View>
            <View
                style={{
                    marginTop: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                <Text
                    style={{
                        textAlign: "Center",
                        fontSize: 12,
                        letterSpacing: 1,
                        fontWeight: "600",
                        fontFamily: "Open Sans",
                        color: "#212121",
                    }}>
                    Order Amount
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
                    Rs.{odrState.pickupOrder.totalPrice + odrState.pickupOrder.resturantId.deliveryPrice}
                </Text>
            </View>
            <View
                style={{
                    marginTop: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                <Text
                    style={{
                        textAlign: "Center",
                        fontSize: 12,
                        letterSpacing: 1,
                        fontWeight: "600",
                        fontFamily: "Open Sans",
                        color: "#212121",
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
        </View>
    )
}

export default OrderInfo