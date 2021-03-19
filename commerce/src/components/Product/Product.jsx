import React from "react";
import ClayCard from "@clayui/card";
import { ClayButtonWithIcon } from "@clayui/button";

export default function index({
  onClickFavorite = () => {},
  onClickCard,
  favoriteIcon,
  title,
  description,
  price,
  image,
}) {
  return (
    <div onClick={onClickCard}>
      <ClayCard>
      <ClayButtonWithIcon
      color="red"
        onClick={onClickFavorite}
        className="ml-2 mt-2"
        symbol={favoriteIcon}
        displayType="unstyled"
      />

      <center>
        <img width="300" height="300" alt="product" src={image} />
      </center>
      <ClayCard.Body>
        <ClayCard.Row>
          <div className="autofit-col autofit-col-expand">
            <section className="autofit-section">
              <ClayCard.Description displayType="title">
                {title}
              </ClayCard.Description>
              <ClayCard.Description displayType="text">
                {description}
              </ClayCard.Description>
              <ClayCard.Description displayType="subtitle">
                {price}
              </ClayCard.Description>
            </section>
          </div>
        </ClayCard.Row>
      </ClayCard.Body>
    </ClayCard>
    </div>
  );
}
