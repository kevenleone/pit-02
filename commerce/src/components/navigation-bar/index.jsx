import ClayNavigationBar from "@clayui/navigation-bar";
import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = ({ history }) => {
  return (
    <ClayNavigationBar triggerLabel="Item 1">
      <ClayNavigationBar.Item active>
        <Link to="/search" className="nav-link">All</Link>
      </ClayNavigationBar.Item>
      <ClayNavigationBar.Item>
        <Link to="/search?q=clothes" className="nav-link">Clothes</Link>
      </ClayNavigationBar.Item>
      <ClayNavigationBar.Item>
        <Link to="/search?q=acessories" className="nav-link">Acessories</Link>
      </ClayNavigationBar.Item>
      <ClayNavigationBar.Item>
        <Link to="/search?q=shoes" className="nav-link">Shoes</Link>
      </ClayNavigationBar.Item>
    </ClayNavigationBar>
  );
};

export default NavigationBar;
