import React from "react";
import { ClayInput } from "@clayui/form";
import ClayLayout from "@clayui/layout";

export default function ProductSearch(location) {
  const { search } = location;

  const searchParams = new URLSearchParams(search);

  const value = searchParams.get("q");

  return (
    <>
      {value && (
        <div>
          There are no products that match <b>"{value}"</b>
        </div>
      )}

      <ClayLayout.Row>
        <ClayLayout.Col>
          <ClayInput placeholder="Search for a product name" />
        </ClayLayout.Col>
      </ClayLayout.Row>
    </>
  );
}
