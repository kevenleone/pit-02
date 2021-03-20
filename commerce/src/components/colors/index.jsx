import React from "react";
import ClayButton, { ClayButtonWithIcon } from "@clayui/button";

const Colors = ({ selectedColor, setSelectedColor, colors }) => {
  if (!colors?.values.length) {
    return null;
  }

  return (
    <>
      <h3>Colors</h3>
      <div className="colors">
        {colors.values.map((value) => {
          const color = value.hexColors[0];

          return (
            <ClayButton
              key={value.label}
              className="colors__btn-color"
              displayType="unstyled"
              onClick={() => setSelectedColor(value.label)}
              style={{ backgroundColor: color }}
            >
              {selectedColor === value.label && (
                <ClayButtonWithIcon
                  className="colors__btn-color__check"
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
