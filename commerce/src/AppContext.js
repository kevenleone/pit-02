import { createContext } from "react";

const AppContext = createContext();

const initialState = {
  loggedUser: null,
  products: [],
  cart: [],
  wishlist: [],
  search: "",
};

const Types = {
  SET_LOGGED_USER: 'SET_LOGGED_USER',
  SET_PRODUCTS: 'SET_PRODUCTS',
  SET_CART: 'SET_CART',
  SET_SEARCH: 'SET_SEARCH',
  TOGGLE_WISHLIST: 'TOGGLE_WISHLIST',
}

const AppReducer = (state, action) => {
  switch (action.type) {
    case Types.SET_LOGGED_USER: {
      return {
        ...state,
        loggedUser: action.payload,
      };
    }

    case Types.SET_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }

    case Types.SET_CART: {
      return {
        ...state,
        cart: action.payload,
      };
    }

    case Types.SET_SEARCH: {
      return {
        ...state,
        search: action.payload,
      };
    }

    case Types.TOGGLE_WISHLIST: {
      const productId = action.payload;
      const alreadyOnWishList = state.wishlist.includes(productId);
      let wishlist = [...state.wishlist];

      if (alreadyOnWishList) {
        wishlist = wishlist.filter((wish) => wish !== productId);
      } else {
        wishlist = [...wishlist, productId];
      }

      return {
        ...state,
        wishlist,
      };
    }

    default: {
      return state;
    }
  }
};

export { initialState, Types, AppReducer };

export default AppContext;
