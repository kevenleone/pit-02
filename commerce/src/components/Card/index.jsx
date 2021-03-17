import React from "react";
import ClayCard from "@clayui/card";

export default function index({ title, description }) {
  return (
    <ClayCard>
        <img
          width="150"
          height="150"
          alt="product"
          src="https://cdn11.bigcommerce.com/s-qfzerv205w/images/stencil/original/products/115/490/Hat-back-black__57260.1602591509.png"
        ></img>
      <ClayCard.Body>
        <ClayCard.Row>
          <div className="autofit-col autofit-col-expand">
            <section className="autofit-section">
              <ClayCard.Description displayType="title">
                {title}
              </ClayCard.Description>
              <ClayCard.Description displayType="subtitle">
                {description}
              </ClayCard.Description>
            </section>
          </div>
        </ClayCard.Row>
      </ClayCard.Body>
    </ClayCard>
  );
}
