import React, { useState } from "react";
import { ClayButtonWithIcon } from "@clayui/button";

export default function ProductActions({ product: { images, name, price } }) {
  const [imageIndex, setImageIndex] = useState(0);

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
    <>
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
    </>
  );
}
