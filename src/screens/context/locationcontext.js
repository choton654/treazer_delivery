import React, { createContext, useReducer, useContext } from "react";
import { initialState, reducer } from "../reducer/locationReducer";
const LocationContext = createContext();
export const geoLocationState = () => useContext(LocationContext);
export const LocationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LocationContext.Provider value={{ state, dispatch }}>
      {children}
    </LocationContext.Provider>
  );
};
