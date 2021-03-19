import React, { useContext } from "react";
import AppContext from "../../AppContext";
import Page from "../../components/page";
import ProductDetail from "../../components/Product/ProductDetail";

const Product = ({
  match: {
    params: { slug },
  },
}) => {
  const [state] = useContext(AppContext);
  const product = state.products.find((product) => product.slug === slug);

  if (!product) {
    return (
      <Page>
        <h1>Loading</h1>
      </Page>
    );
  }

  return (
    <Page>
      <ProductDetail {...product} />
    </Page>
  );
};

export default Product;
