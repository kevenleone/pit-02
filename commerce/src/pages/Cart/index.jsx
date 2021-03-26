import React, { useContext, useState } from "react";
import ClayLayout from "@clayui/layout";
import ClayButton, { ClayButtonWithIcon } from "@clayui/button";
import { useModal } from "@clayui/modal";

import Modal from "../../components/modal";
import AppContext from "../../AppContext";
import Page from "../../components/page";
import ProductCartInfo from "../../components/Product/ProductCartInfo";
import axios from "../../utils/axios";

const CartProduct = ({ cart: { product, ...cart }, onUpdateCart }) => {
  return (
    <ClayLayout.Row>
      <ClayLayout.Col>
        <img
          draggable="false"
          alt="product x"
          width={100}
          height={100}
          src={product.images[0].url}
        />
      </ClayLayout.Col>
      <ClayLayout.Col>
        <h2>{product.name}</h2>
        <ClayButton onClick={() => onUpdateCart(cart, product)}>
          Update Cart
        </ClayButton>
      </ClayLayout.Col>
      <ClayLayout.Col>
        <h3>
          $
          {`${product.price.value * cart.quantity} ${
            product.price.currencyCode
          }`}
        </h3>
        <ClayButtonWithIcon symbol="trash" displayType="secondary" />
      </ClayLayout.Col>
    </ClayLayout.Row>
  );
};

const Cart = () => {
  const [visible, setVisible] = useState(false);
  const [productState, setProductState] = useState({});
  const [product, setProduct] = useState();

  const { observer, onClose } = useModal({
    onClose: () => setVisible(false),
  });

  const [{ cart }] = useContext(AppContext);

  const onSubmit = () => {};

  const onUpdateCart = (cart, product) => {
    setVisible(true);
    setProduct(product);
    setProductState(cart);
  };

  return (
    <Page title="My Cart">
      <hr />

      {cart.map((cartProduct, index) => (
        <div className="mb-2">
          <CartProduct
            key={index}
            onUpdateCart={onUpdateCart}
            cart={cartProduct}
          />
          <hr />
        </div>
      ))}

      <Modal
        observer={observer}
        visible={visible}
        onClose={onClose}
        submitText="Save"
        title="Product Cart"
        onSubmit={onSubmit}
      >
        <ProductCartInfo
          product={product}
          productState={productState}
          setProductState={setProductState}
        />
      </Modal>
    </Page>
  );
};

export default Cart;
