import React, { useContext } from "react";
import ClayLayout from "@clayui/layout";
import dompurify from "dompurify";

import ClayButton, { ClayButtonWithIcon } from "@clayui/button";
import AppContext, {Types} from "../../AppContext";

export default function ProductDetail({
  id,
  name,
  images = [],
  description,
  price,
}) {
  const [{ wishlist }, dispatch] = useContext(AppContext);

  const defaultImage = images.find((image) => image.isDefault)?.url;
  const productInWishList = wishlist.includes(id);

  const onClickFavorite = () => {
    dispatch({ type: Types.TOGGLE_WISHLIST, payload: id });
  };

  return (
    <ClayLayout.Row>
      <ClayLayout.Col>
        <h1>{name}</h1>
        <h3>
          ${price.value} {price.currencyCode}
        </h3>
        <img
          alt={`product name: ${name}`}
          draggable={false}
          width="500"
          height="500"
          src={defaultImage}
        />
      </ClayLayout.Col>
      <ClayLayout.Col>
        <ClayButtonWithIcon
          onClick={onClickFavorite}
          symbol={productInWishList ? "heart-full" : "heart"}
          displayType="secondary"
        />
        <p
          className="mt-4"
          dangerouslySetInnerHTML={{ __html: dompurify.sanitize(description) }}
        ></p>
        <ClayButton>Add to Cart</ClayButton>
      </ClayLayout.Col>
    </ClayLayout.Row>
  );
}
