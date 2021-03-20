import { Switch, Route, BrowserRouter } from "react-router-dom";

import NavigationBar from './components/navigation-bar'
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Search from "./pages/Search";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import WishList from "./pages/Wishlist";

const Routes = () => (
  <BrowserRouter>
    <NavigationBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/auth" component={Auth} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/product" component={Products} />
      <Route exact path="/wishlist" component={WishList} />
      <Route exact path="/product/:slug" component={Product} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
