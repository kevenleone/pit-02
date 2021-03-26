import React from "react";
import classNames from "classnames";
import ClayButton, { ClayButtonWithIcon } from "@clayui/button";

const Colors = ({ colors, productState, setProductState }) => {
  if (!colors?.values.length) {
    return null;
  }

  return (
    <>
      <h3>Colors</h3>
      <div className="colors-component">
        {colors.values.map((value) => {
          const color = value.hexColors[0];

          return (
            <ClayButton
              key={value.label}
              className={classNames("colors-component__btn-color", {
                active: value.label === productState.color,
              })}
              displayType="unstyled"
              onClick={() =>
                setProductState({ ...productState, color: value.label })
              }
              style={{ backgroundColor: color }}
            >
              {productState.color === value.label && (
                <ClayButtonWithIcon
                  className={classNames("colors-component__btn-color__check", {
                    "color-white": color === "#000000",
                  })}
                  displayType="unstyled"
                  symbol="check"
                />
              )}
            </ClayButton>
          );
        })}
      </div>
    </>
  );
};

export default Colors;
