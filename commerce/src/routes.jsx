import { HashRouter, Switch, Route } from "react-router-dom";

import NavigationBar from './components/navigation-bar'
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Search from "./pages/Search";
import Product from "./pages/Product";

const Routes = () => (
  <HashRouter>
    <NavigationBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/auth" component={Auth} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/product/:id" component={Product} />
    </Switch>
  </HashRouter>
);

export default Routes;
