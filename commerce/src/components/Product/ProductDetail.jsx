import React, { useContext, useState } from "react";
import ClayLayout from "@clayui/layout";

import { useModal } from "@clayui/modal";
import ClayButton, { ClayButtonWithIcon } from "@clayui/button";
import AppContext, { Types } from "../../AppContext";
import HTML from "../html";
import Colors from "../colors";
import Sizes from "../sizes";
import axios from "../../utils/axios";
import Modal from "../modal";

export default function ProductDetail({ product }) {
  const [{ wishlist }, dispatch] = useContext(AppContext);
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const productInWishList = wishlist.find((wish) => wish._id === product._id);
  const { name, images = [], description, price, options } = product;
  const optionColors = options.find((option) => option.displayName === "Color");
  const optionSize = options.find((option) => option.displayName === "Size");

  const [visible, setVisible] = useState(false);
  const { observer, onClose } = useModal({
    onClose: () => setVisible(false),
  });

  const onClickFavorite = async () => {
    await axios.post("/wishlist", {
      productId: product._id,
    });

    dispatch({ type: Types.TOGGLE_WISHLIST, payload: product });
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
        <ClayButton onClick={() => setVisible(true)}>Add to Cart</ClayButton>
      </ClayLayout.Col>
      <Modal
        observer={observer}
        visible={visible}
        onClose={onClose}
        title={product.name}
      />
    </ClayLayout.Row>
  );
}
