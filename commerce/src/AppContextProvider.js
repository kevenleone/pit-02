import React, { useReducer, useEffect } from "react";
import AppContext, { AppReducer, initialState, Types } from "./AppContext";

import axios from "./utils/axios";

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getProductData = async () => {
    const [responseProduct, responseWishList] = await Promise.all([
      axios.get("/product"),
      axios.get("/wishlist"),
    ]);

    dispatch({ type: "SET_PRODUCTS", payload: responseProduct.data.data });

    dispatch({
      type: Types.SET_WISHLIST,
      payload: responseWishList.data,
    });
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
