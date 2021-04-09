// import { StatusBar } from "expo-status-bar";
import React from "react";
import loadable from "@loadable/component";
const RootNavigation = loadable(() =>
  import("./src/screens/navigation/RootNavigation")
);
import { Provider as PaperProvider } from "react-native-paper";
import { UserContextProvider } from "./src/screens/context/userContext";
import { OrderContextProvider } from "./src/screens/context/orderContext";

const App = () => {
  return (
    <PaperProvider>
      <OrderContextProvider>
        <UserContextProvider>
          <RootNavigation />
        </UserContextProvider>
      </OrderContextProvider>
    </PaperProvider>
  );
};

export default App;
