/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';

import Header from './components/Header';
import routes from './routelist';
import { tokenKey } from './utils/constants';

const publicRoutes = routes.filter(({ private: isPrivate }) => !isPrivate);
const privateRoutes = routes.filter(({ private: isPrivate }) => isPrivate);

const PublicRoute = ({ component: Component, ...otherProps }) => {
  const isAuthenticated = localStorage.getItem(tokenKey);

  return (
    <Route
      exact
      {...otherProps}
      render={(props) => {
        if (isAuthenticated) {
          return <Redirect to={{ pathname: '/home' }} />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

const PrivateRoute = ({ component: Component, ...otherProps }) => {
  const isAuthenticated = localStorage.getItem(tokenKey);

  return (
    <Route
      exact
      {...otherProps}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        }

        return <Redirect to={{ pathname: '/login' }} />;
      }}
    />
  );
};

const Routes = () => (
  <BrowserRouter>
    <Header title="Pitang 2" routes={routes} />
    <Switch>
      {publicRoutes.map((route) => (
        <PublicRoute key={route.path} {...route} />
      ))}
      {privateRoutes.map((route) => (
        <PrivateRoute key={route.path} {...route} />
      ))}
    </Switch>
  </BrowserRouter>
);

export default Routes;
