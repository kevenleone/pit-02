import React from "react";
import ClayCard from "@clayui/card";
import { ClayButtonWithIcon } from "@clayui/button";
import HTML from "../html";

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
    <ClayCard className="product">
      <ClayButtonWithIcon
        onClick={onClickFavorite}
        className="ml-2 mt-2"
        symbol={favoriteIcon}
        displayType="unstyled"
      />

      <center>
        <img draggable="false" width="300" height="300" alt="product" src={image} />
      </center>
      <ClayCard.Body>
        <ClayCard.Row>
          <div className="autofit-col autofit-col-expand">
            <section>
              <ClayCard.Description className="product__title" displayType="title" onClick={onClickCard}>
                {title}
              </ClayCard.Description>
              <ClayCard.Description displayType="subtitle">
                <HTML html={`${description.substring(0, 50)}...`} />
              </ClayCard.Description>
              <ClayCard.Description displayType="subtitle">
                {price}
              </ClayCard.Description>
            </section>
          </div>
        </ClayCard.Row>
      </ClayCard.Body>
    </ClayCard>
  );
}
