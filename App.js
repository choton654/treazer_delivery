import React, { Suspense } from "react";
import { ActivityIndicator, View } from "react-native";
import { lazy } from "@loadable/component";
const RootNavigation = lazy(() =>
  import("./src/screens/navigation/RootNavigation")
);
import { Provider as PaperProvider } from "react-native-paper";
import { UserContextProvider } from "./src/screens/context/userContext";
import { OrderContextProvider } from "./src/screens/context/orderContext";
import { LocationContextProvider } from "./src/screens/context/locationcontext";
import * as PusherPushNotifications from "@pusher/push-notifications-web";

const beamsClient = new PusherPushNotifications.Client({
  instanceId: "bbb31fea-4a4a-46e1-a801-fc0a31ca9569",
});
const App = () => {
  beamsClient
    .start()
    .then((beamsClient2) => beamsClient2.getDeviceId())
    .then((deviceId) =>
      console.log("Successfully registered with Beams. Device ID:", deviceId)
    )
    .then(() => beamsClient.addDeviceInterest("order"))
    .then(() => beamsClient.getDeviceInterests())
    .then((interests) => console.log("Current interests:", interests))
    .catch((err) => {
      console.log(err);
    });
  return (
    <PaperProvider>
      <OrderContextProvider>
        <UserContextProvider>
          <LocationContextProvider>
            <Suspense
              fallback={
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <ActivityIndicator
                    size='large'
                    color='#82b1ff'
                    style={{
                      margin: "auto",
                    }}
                  />
                </View>
              }>
              <RootNavigation />
            </Suspense>
          </LocationContextProvider>
        </UserContextProvider>
      </OrderContextProvider>
    </PaperProvider>
  );
};

export default App;
