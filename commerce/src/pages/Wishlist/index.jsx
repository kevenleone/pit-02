import React, { useContext } from "react";
import AppContext from "../../AppContext";
import Page from "../../components/page";
import ProductList from "../../components/Product/ProductList";

const WishList = () => {
  const [{wishlist}] = useContext(AppContext);

  return (
    <Page title="Wishlist">
      <ProductList products={wishlist} />
    </Page>
  );
};

export default WishList;
