import ClayNavigationBar from "@clayui/navigation-bar";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import NavigationOptions from "../navigation-options";

const routes = [
  {
    name: "Product",
    path: "/product",
  },
  {
    name: "Wish List",
    path: "/wishlist",
  },
  {
    name: "Cart",
    path: "/cart",
  },
];

const NavigationBar = () => {
  const location = useLocation();

  return (
    <ClayNavigationBar
      triggerLabel="Item 1"
      className="NavigationBar"
      style={{ margin: "auto", width: "100%" }}
    >
      <>
        {routes.map(({ path, name }) => (
          <ClayNavigationBar.Item
            key={path}
            active={location.pathname === path}
          >
            <Link to={path} className="nav-link">
              {name}
            </Link>
          </ClayNavigationBar.Item>
        ))}
      </>
      <ClayNavigationBar.Item>
        <NavigationOptions />
      </ClayNavigationBar.Item>
    </ClayNavigationBar>
  );
};

export default NavigationBar;
