import React, { useContext, useState } from "react";
import ClayLayout from "@clayui/layout";
import ClayButton, { ClayButtonWithIcon } from "@clayui/button";
import { useModal } from "@clayui/modal";

import Modal from "../../components/modal";
import AppContext, { Types } from "../../AppContext";
import Page from "../../components/page";
import ProductCartInfo from "../../components/Product/ProductCartInfo";
import axios from "../../utils/axios";

const formatedMoney = (value, currencyCode = "USD") => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: currencyCode,
  });
};

const CartProduct = ({
  cart: { product, productId, ...cart },
  onUpdateCart,
}) => {
  const [{ cart: cartProducts }, dispatch] = useContext(AppContext);

  const onRemoveCartItem = async () => {
    await axios.delete(`/cart/${productId}`);

    const updateCartProducts = cartProducts.filter(
      (cartProduct) => cartProduct.productId !== productId
    );

    dispatch({
      type: Types.SET_CART,
      payload: updateCartProducts,
    });
  };

  return (
    <ClayLayout.Row className="cart-product-info">
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
        <ClayButton
          displayType="secondary"
          onClick={() => onUpdateCart(cart, product)}
        >
          Update Cart
        </ClayButton>
      </ClayLayout.Col>
      <ClayLayout.Col>
        <h3 className='product-value'>
          {`${formatedMoney(
            product.price.value * cart.quantity,
            product.price.currencyCode
          )}`}
        </h3>
        <ClayButtonWithIcon
          onClick={onRemoveCartItem}
          symbol="trash"
          displayType="secondary"
        />
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

  const [{ cart }, dispatch] = useContext(AppContext);

  const onSubmit = async () => {
    const cartProduct = { ...productState };

    delete cartProduct._id;

    const response = await axios.post("/cart", {
      ...cartProduct,
      productId: product._id,
    });

    dispatch({
      type: Types.SET_CART,
      payload: response.data,
    });

    onClose();
  };

  const onUpdateCart = (cart, product) => {
    setVisible(true);
    setProduct(product);
    setProductState(cart);
  };

  const getTotalValue = () => {
    let totalValue = 0;
    let currencyCode = "USD";

    if (cart.length) {
      cart.forEach((item) => {
        totalValue = totalValue + item.product.price.value * item.quantity;
        currencyCode = item.product.price.currencyCode;
      });
    }

    return [totalValue, currencyCode];
  };

  const [totalValue, currencyCode] = getTotalValue();

  return (
    <Page title="My Cart">
      <hr />

      {cart.map((cartProduct, index) => (
        <div key={index} className="mb-2">
          <CartProduct onUpdateCart={onUpdateCart} cart={cartProduct} />
          <hr />
        </div>
      ))}

      <h3>Order Summary</h3>

      <ClayLayout.Row>
        <ClayLayout.Col size={8}>
          <h3>Total</h3>
        </ClayLayout.Col>
        <ClayLayout.Col>
          <h3 className="total-product-value">
            {formatedMoney(totalValue, currencyCode)}
          </h3>
        </ClayLayout.Col>
      </ClayLayout.Row>
      <ClayLayout.Row>
        <ClayLayout.Col size={8}>
          <h3>Tax</h3>
        </ClayLayout.Col>
        <ClayLayout.Col>
          <h3>0</h3>
        </ClayLayout.Col>
      </ClayLayout.Row>

      {cart.length > 0 && (
        <ClayLayout.Row className="mt-4">
          <ClayLayout.Col>
            <ClayButton className="place-order">Place Order</ClayButton>
          </ClayLayout.Col>
        </ClayLayout.Row>
      )}

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
