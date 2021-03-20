import React, { useContext, useState } from "react";
import ClayLayout from "@clayui/layout";

import ClayButton, { ClayButtonWithIcon } from "@clayui/button";
import AppContext, { Types } from "../../AppContext";
import HTML from "../html";
import Colors from "../colors";
import Sizes from "../sizes";

export default function ProductDetail({
  id,
  name,
  images = [],
  description,
  price,
  options,
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const [{ wishlist }, dispatch] = useContext(AppContext);

  const productInWishList = wishlist.includes(id);

  const optionColors = options.find((option) => option.displayName === "Color");
  const optionSize = options.find((option) => option.displayName === "Size");

  const onClickFavorite = () => {
    dispatch({ type: Types.TOGGLE_WISHLIST, payload: id });
  };

  const onClickPrev = () => {
    if (imageIndex !== 0) {
      setImageIndex(imageIndex - 1);
    }
  };

  const onClickNext = () => {
    if (imageIndex + 1 < images.length) {
      setImageIndex(imageIndex + 1);
    }
  };

  return (
    <ClayLayout.Row className="product-detail">
      <ClayLayout.Col>
        <h1>{name}</h1>
        <h3>
          ${price.value} {price.currencyCode}
        </h3>
        <div className="product-detail__actions">
          <img
            alt={`product name: ${name}`}
            draggable={false}
            width="500"
            height="500"
            src={images[imageIndex].url}
          />
          <ClayButtonWithIcon
            disabled={imageIndex === 0}
            displayType="unstyled"
            symbol="angle-left"
            onClick={onClickPrev}
          />
          <ClayButtonWithIcon
            disabled={imageIndex + 1 === images.length}
            displayType="unstyled"
            className="ml-2"
            symbol="angle-right"
            onClick={onClickNext}
          />
        </div>
      </ClayLayout.Col>
      <ClayLayout.Col>
        <ClayButtonWithIcon
          className="mb-4"
          onClick={onClickFavorite}
          symbol={productInWishList ? "heart-full" : "heart"}
          displayType="secondary"
        />

        <Colors
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          colors={optionColors}
        />

        <Sizes
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          sizes={optionSize}
        />

        <HTML html={description} className="mt-4" />
        <ClayButton>Add to Cart</ClayButton>
      </ClayLayout.Col>
    </ClayLayout.Row>
  );
}
