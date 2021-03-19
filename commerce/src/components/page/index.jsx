import React from "react";
import ClayLayout from "@clayui/layout";

export default function Page({ title, children }) {
  return (
    <ClayLayout.Container className="mt-4">
      <h1>{title}</h1>
      <section>{children}</section>
    </ClayLayout.Container>
  );
}
