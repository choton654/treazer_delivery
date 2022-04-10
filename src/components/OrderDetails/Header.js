import { View, Text } from 'react-native'
import React from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component";

const Header = ({ title }) => {
    return (
        <View
            style={{
                width: "100%",
                backgroundColor: "#fff",
                shadowColor: "#bdbdbd",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1, shadowRadius: 5,
                zIndex: 3
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
                        marginTop: 5,
                        marginBottom: 5,
                        resizeMode: "cover",
                        borderRadius: 30,
                    }}
                    src={require("../../assets/logo/TZ_logo.png")}
                    effect='blur'
                />
                <Text
                    style={{
                        marginHorizontal: "auto",
                        color: "#00E0FF",
                        fontWeight: "700",
                        fontSize: 20,
                        letterSpacing: 1,
                        marginVertical: "auto",
                    }}>
                    {title}
                </Text>
            </View>
        </View>
    )
}

export default Header