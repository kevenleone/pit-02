import React from "react";
import ClayLayout from "@clayui/layout";
import ClayButton from "@clayui/button";

const InvoiceCategory = ({ title, value, children }) => (
  <ClayLayout.Row>
    <ClayLayout.Col>
      <b>{title}</b>
    </ClayLayout.Col>
    <ClayLayout.Col>{value}</ClayLayout.Col>
  </ClayLayout.Row>
);

const ProductCartInfo = ({ product, productState, setProductState }) => {
  const onQuantityChange = (operator) => {
    const { quantity } = productState;
    let newValue;

    if (operator === "-" && quantity === 1) {
      return;
    }

    newValue = operator === "+" ? quantity + 1 : quantity - 1;

    setProductState({ ...productState, quantity: newValue });
  };
  return (
    <>
      <ClayLayout.Row className="mb-4">
        <ClayLayout.Col>
          <img
            draggable="false"
            alt="product x"
            width={80}
            height={80}
            src={product.images[0].url}
          />
        </ClayLayout.Col>
        <ClayLayout.Col>
          <span>Quantity</span>
          <div className="mt-2">
            <ClayButton
              disabled={productState.quantity === 1}
              onClick={() => onQuantityChange("-")}
              displayType="secondary"
              small
            >
              -
            </ClayButton>
            <span className="ml-2 mr-2">{productState.quantity}</span>
            <ClayButton
              onClick={() => onQuantityChange("+")}
              displayType="secondary"
              small
            >
              +
            </ClayButton>
          </div>
        </ClayLayout.Col>
      </ClayLayout.Row>
      <InvoiceCategory title="Product Name" value={product.name} />
      <InvoiceCategory
        title="Product Value"
        value={`$${product.price.value}`}
      />
      <InvoiceCategory title="Taxes" value="Calculated at checkout" />
      <InvoiceCategory title="Shipping" value="FREE" />
      <hr />
      <InvoiceCategory
        title="Total"
        value={`$${product.price.value * productState.quantity}`}
      />
    </>
  );
};

export default ProductCartInfo