import { render, fireEvent } from "@testing-library/react";

import Colors from "../../components/colors";

describe("Renders", () => {
  it("renders colors component empty", () => {
    const { queryByText } = render(<Colors />);

    expect(queryByText("Colors")).toBeNull();
  });

  it("renders colors component with colors props", () => {
    const props = {
      colors: {
        values: [
          {
            hexColors: ["#000000"],
            label: "black",
          },
          {
            hexColors: ["#ffffff"],
            label: "white",
          },
        ],
      },
      productState: {
        color: "black",
      },
      setProductState: jest.fn(),
    };

    const { container, queryByText } = render(<Colors {...props} />);

    const buttons = container.querySelectorAll(".colors-component__btn-color");

    expect(buttons.length).toBe(2);
    expect(queryByText("Colors")).toBeTruthy();
    expect(buttons[0].querySelector(".color-black")).toBeTruthy();
    expect(buttons[1].querySelector(".color-white")).toBeNull();

    fireEvent.click(buttons[1]);

    expect(props.setProductState).toBeCalledWith({
      color: "white",
    });
  });
});
