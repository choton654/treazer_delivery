// import { StatusBar } from "expo-status-bar";
import React from "react";
import loadable from "@loadable/component";
const RootNavigation = loadable(() =>
  import("./src/screens/navigation/RootNavigation")
);
import { Provider as PaperProvider } from "react-native-paper";
import { UserContextProvider } from "./src/screens/context/userContext";
const App = () => {
  return (
    <PaperProvider>
      <UserContextProvider>
        <RootNavigation />
      </UserContextProvider>
    </PaperProvider>
  );
};

export default App;
