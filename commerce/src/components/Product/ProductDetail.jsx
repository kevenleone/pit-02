import React, { useContext, useState } from "react";
import ClayLayout from "@clayui/layout";
import ClayButton from "@clayui/button";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { useModal } from "@clayui/modal";

import axios from "../../utils/axios";
import ProductShowCase from "./ProductActions";
import Modal from "../modal";
import ProductDescription from "./ProductDescription";
import ProductCartInfo from "./ProductCartInfo";
import AppContext, { Types } from "../../AppContext";

const ProductDetail = ({ product }) => {
  const [, dispatch] = useContext(AppContext);
  const [productState, setProductState] = useState({
    productId: product._id,
    size: "",
    color: "",
    quantity: 1,
  });

  const history = useHistory();

  const [visible, setVisible] = useState(false);
  const { observer, onClose } = useModal({
    onClose: () => setVisible(false),
  });

  const onSubmit = async () => {
    try {
      const response = await axios.post("/cart", productState);
      toast.info("Item added in cart with success");

      dispatch({
        type: Types.SET_CART,
        payload: response.data,
      });

      history.push("/cart");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <ClayLayout.Row className="product-detail">
      <ClayLayout.Col>
        <ProductShowCase product={product} />
      </ClayLayout.Col>
      <ClayLayout.Col>
        <ProductDescription
          product={product}
          productState={productState}
          setProductState={setProductState}
        />
        <ClayButton onClick={() => setVisible(true)}>Add to Cart</ClayButton>
      </ClayLayout.Col>
      <Modal
        observer={observer}
        visible={visible}
        onClose={onClose}
        submitText="Proceed to Checkout"
        title="Product Cart"
        onSubmit={onSubmit}
      >
        <ProductCartInfo
          product={product}
          productState={productState}
          setProductState={setProductState}
        />
      </Modal>
    </ClayLayout.Row>
  );
};

export default ProductDetail;
