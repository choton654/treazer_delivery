import React, { createContext, useReducer, useContext } from "react";
import { initialState, reducer } from "../reducer/userReducer";
const AuthContext = createContext();
export const userState = () => useContext(AuthContext);
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
