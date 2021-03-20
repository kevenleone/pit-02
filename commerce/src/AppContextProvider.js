import React, { useReducer, useEffect } from "react";
import AppContext, { AppReducer, initialState } from "./AppContext";

import axios from './utils/axios';

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getProducts = async () => {
    const {data} = await axios.get("/product");

    dispatch({ type: "SET_PRODUCTS", payload: data.data });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
