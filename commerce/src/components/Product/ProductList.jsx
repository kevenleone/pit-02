import React, { useContext } from "react";
import ClayLayout from "@clayui/layout";

import Product from "./Product";
import AppContext, { Types } from "../../AppContext";
import axios from "../../utils/axios";

import { useHistory } from "react-router";

export default function ProductList({ products = [] }) {
  const [{ wishlist }, dispatch] = useContext(AppContext);
  const history = useHistory();

  const onClickFavorite = async (product) => {
    await axios.post("/wishlist", {
      productId: product._id,
    });

    dispatch({ type: Types.TOGGLE_WISHLIST, payload: product });
  };

  return (
    <ClayLayout.Row className="mt-4">
      {products.map((product) => (
        <ClayLayout.Col key={product._id} size={4}>
          <Product
            favoriteIcon={
              wishlist.find((wish) => wish._id === product._id)
                ? "heart-full"
                : "heart"
            }
            onClickCard={() => history.push(`/product/${product.slug}`)}
            onClickFavorite={() => onClickFavorite(product)}
            image={product.images.find((image) => image.isDefault).url}
            title={product.name}
            description={product.description}
            price={`${product.price.value} - ${product.price.currencyCode}`}
          />
        </ClayLayout.Col>
      ))}
    </ClayLayout.Row>
  );
}
