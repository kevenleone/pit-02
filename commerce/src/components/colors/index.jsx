import React from "react";
import classNames from "classnames";
import ClayButton from "@clayui/button";
import ClayIcon from "@clayui/icon";

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
                <ClayIcon
                  className={classNames(
                    "colors-component__btn-color__check",
                    `color-${value.label}`,
                    {
                      "color-white": color === "#000000",
                    }
                  )}
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
