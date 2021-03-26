import React, { useContext, useState } from "react";
import { ClayButtonWithIcon } from "@clayui/button";
import AppContext, { Types } from "../../AppContext";
import HTML from "../html";
import Colors from "../colors";
import Sizes from "../sizes";
import axios from "../../utils/axios";

const ProductDescription = ({ product, ...props }) => {
  const [{ wishlist }, dispatch] = useContext(AppContext);

  const productInWishList = wishlist.find((wish) => wish._id === product._id);

  const optionColors = product.options.find(
    (option) => option.displayName === "Color"
  );
  
  const optionSize = product.options.find(
    (option) => option.displayName === "Size"
  );

  const onClickFavorite = async () => {
    await axios.post("/wishlist", {
      productId: product._id,
    });

    dispatch({ type: Types.TOGGLE_WISHLIST, payload: product });
  };

  return (
    <>
      <ClayButtonWithIcon
        className="mb-4"
        onClick={onClickFavorite}
        symbol={productInWishList ? "heart-full" : "heart"}
        displayType="secondary"
      />

      <Colors {...props} colors={optionColors} />
      <Sizes {...props} sizes={optionSize} />
      <HTML html={product.description} className="mt-4" />
    </>
  );
};

export default ProductDescription;
