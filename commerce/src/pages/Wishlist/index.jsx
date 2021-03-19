import React, { useContext } from "react";
import AppContext from "../../AppContext";
import Page from "../../components/page";
import ProductList from "../../components/Product/ProductList";

const WishList = () => {
  const [{ wishlist, products }] = useContext(AppContext);

  const productInWishList = products.filter((product) =>
    wishlist.includes(product.id)
  );

  return (
    <Page title="Wishlist">
      <ProductList products={productInWishList}></ProductList>
    </Page>
  );
};

export default WishList;
