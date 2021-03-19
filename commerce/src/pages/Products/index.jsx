import React, { useContext } from "react";
import Page from "../../components/page";
import ProductList from "../../components/Product/ProductList";
import ProductSearch from "../../components/Product/ProductSearch";

import AppContext from "../../AppContext";

const Search = ({ location }) => {
  const [{ products }] = useContext(AppContext);

  return (
    <Page>
      <ProductSearch location={location}></ProductSearch>
      <ProductList products={products} />
    </Page>
  );
};

export default Search;
