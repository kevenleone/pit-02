import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Index from './pages';
import Header from './components/Header';
import Feature from './pages/Features';
import Todo from './pages/Todos';

const routes = [
  {
    path: '/',
    component: Index,
    name: 'Home',
  },
  {
    path: '/todo',
    component: Todo,
    name: 'Todo',
  },
  {
    path: '/feature',
    component: Feature,
    name: 'Feature',
  },
];

const Routes = () => (
  <BrowserRouter>
    <Header title="Pitang 2" routes={routes} />
    <Switch>
      {routes.map(({ component, path }) => (
        <Route
          exact
          key={path}
          path={path}
          component={component}
        />
      ))}
    </Switch>
  </BrowserRouter>
);

export default Routes;
