import React from "react";
import ClayButton from "@clayui/button";
import classNames from "classnames";

const Sizes = ({ selectedSize, setSelectedSize, sizes = [] }) => {
  if (!sizes.length) {
    return null;
  }

  return (
    <div className="mt-4">
      <h3>Sizes</h3>
      <div className="sizes">
        {sizes?.values.map((value) => {
          return (
            <ClayButton
              key={value.label}
              className={classNames("sizes__btn-color", {
                active: value.label === selectedSize,
              })}
              displayType="unstyled"
              onClick={() => setSelectedSize(value.label)}
            >
              {value.label}
            </ClayButton>
          );
        })}
      </div>
    </div>
  );
};

export default Sizes;
