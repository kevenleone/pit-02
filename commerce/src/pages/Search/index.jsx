import ClayLayout from "@clayui/layout";
import React from "react";
import Page from "../../components/page";

import Card from "../../components/Card";

export default function index({ location }) {
  const { search } = location;

  const searchParams = new URLSearchParams(search);

  const value = searchParams.get("q");

  return (
    <Page>
      {value && (
        <div>
          There are no products that match <b>"{value}"</b>
        </div>
      )}

      <ClayLayout.Row>
        <ClayLayout.Col>
          <Card title="Black Hat" description="80 USD" />
        </ClayLayout.Col>
        <ClayLayout.Col>
          <Card title="Black Hat" description="80 USD" />
        </ClayLayout.Col>
        <ClayLayout.Col>
          <Card title="Black Hat" description="80 USD" />
        </ClayLayout.Col>
      </ClayLayout.Row>
    </Page>
  );
}
