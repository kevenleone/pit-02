import React, { useContext } from "react";
import ClayLayout from "@clayui/layout";

import Product from "./Product";
import AppContext, { Types } from "../../AppContext";
import { useHistory } from "react-router";

export default function ProductList({ products = [] }) {
  const [{ wishlist }, dispatch] = useContext(AppContext);
  const history = useHistory();

  const onClickFavorite = (product) => {
    dispatch({ type: Types.TOGGLE_WISHLIST, payload: product.id });
  };

  return (
    <ClayLayout.Row className="mt-4">
      {products.map((product) => (
        <ClayLayout.Col key={product.id} size={4}>
          <Product
            favoriteIcon={
              wishlist.includes(product.id) ? "heart-full" : "heart"
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
