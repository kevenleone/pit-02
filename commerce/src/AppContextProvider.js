import React, { useReducer, useEffect } from "react";
import AppContext, {AppReducer, initialState} from "./AppContext";

const AppContextProvider = ({ children }) => {
   const [state, dispatch]  = useReducer(AppReducer, initialState);

   const getProducts = async () => {
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://demo.vercel.store/api/bigcommerce/catalog/products');
      const data = await response.json();

      dispatch({ type: 'SET_PRODUCTS', payload: data.data.products })
   }

   useEffect(() => {
    getProducts();
   }, [])

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
