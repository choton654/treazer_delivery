// import { StatusBar } from "expo-status-bar";
import React from "react";
import loadable from "@loadable/component";
const RootNavigation = loadable(() =>
  import("./src/screens/navigation/RootNavigation")
);
import { Provider as PaperProvider } from "react-native-paper";
const App = () => {
  return (
    <PaperProvider>
      <RootNavigation />
    </PaperProvider>
  );
};

export default App;
