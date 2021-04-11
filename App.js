// import { StatusBar } from "expo-status-bar";
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

const App = () => {
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
