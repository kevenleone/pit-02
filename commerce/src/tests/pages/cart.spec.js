import Cart from "../../pages/Cart";
import AppContext, { initialState } from "../../AppContext";
import React from "react";

import { render } from "@testing-library/react";

const cartArray = [
  {
    _id: "605f45d1c19bce0e2c2ac892",
    productId: "6055f8fabedbed186f70ca03",
    size: "",
    color: "",
    quantity: 1,
    product: {
      _id: "6055f8fabedbed186f70ca03",
      prices: {
        price: {
          value: 80,
          currencyCode: "USD",
        },
      },
      options: [],
      name: "Black Hat",
      path: "/next-js-enamel-mug/",
      images: [
        {
          isDefault: true,
          _id: "6055f8fabedbed186f70ca04",
          url:
            "https://cdn11.bigcommerce.com/s-qfzerv205w/images/stencil/original/products/115/489/Hat-front-black__72990.1603748583.png",
          alt: "",
        },
      ],
      id: 115,
      slug: "next-js-enamel-mug",
      price: {
        value: 80,
        currencyCode: "USD",
      },
    },
  },
];

const CartWrapper = ({
  children,
  state = initialState,
  dispatch = jest.fn(),
}) => (
  <AppContext.Provider value={[state, dispatch]}>
    {children}
  </AppContext.Provider>
);

describe("Cart", () => {
  it("renders cart empty", () => {
    const { container } = render(
      <CartWrapper>
        <Cart />
      </CartWrapper>
    );

    expect(container.querySelector(".total-product-value").textContent).toBe(
      "$0.00"
    );
    expect(container.querySelector(".place-order")).toBeNull();
  });

  it("renders cart with one product", () => {
    const state = {
      ...initialState,
      cart: cartArray,
    };

    const { container } = render(
      <CartWrapper state={state}>
        <Cart />
      </CartWrapper>
    );

    const cartProductInfos = container.querySelectorAll(".cart-product-info");

    expect(container.querySelector(".place-order")).toBeTruthy();
    expect(cartProductInfos.length).toBe(1);
    expect(
      cartProductInfos[0].querySelector(".product-value").textContent
    ).toBe("$80.00");
    expect(container.querySelector(".total-product-value").textContent).toBe(
      "$80.00"
    );
  });

  it("renders cart with many products", () => {
    const newProduct = {
      _id: "605f4774c19bce0e2c2ac893",
      productId: "6055f8fabedbed186f70ca35",
      size: "M",
      color: "White",
      quantity: 5,
      product: {
        _id: "6055f8fabedbed186f70ca35",
        prices: {
          price: {
            value: 44,
            currencyCode: "USD",
          },
        },
        name: "Unisex Skinny Joggers",
        images: [
          {
            isDefault: false,
            _id: "6055f8fabedbed186f70ca36",
            url:
              "https://cdn11.bigcommerce.com/s-qfzerv205w/images/stencil/original/products/126/423/mockup-9c5e3634__60853.1603747807.png",
            alt: "",
          },
        ],
        id: 126,
        slug: "unisex-skinny-joggers",
        price: {
          value: 44,
          currencyCode: "USD",
        },
        __v: 0,
      },
    };

    const state = {
      ...initialState,
      cart: [...cartArray, newProduct],
    };

    const { container, asFragment } = render(
      <CartWrapper state={state}>
        <Cart />
      </CartWrapper>
    );

    const cartProductInfos = container.querySelectorAll(".cart-product-info");

    expect(container.querySelector(".place-order")).toBeTruthy();
    expect(cartProductInfos.length).toBe(2);
    expect(
      cartProductInfos[0].querySelector(".product-value").textContent
    ).toBe("$80.00");
    expect(
      cartProductInfos[1].querySelector(".product-value").textContent
    ).toBe("$220.00");

    expect(container.querySelector(".total-product-value").textContent).toBe(
      "$300.00"
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
