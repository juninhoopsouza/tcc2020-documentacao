import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Auth from '../containers/Auth';

import OrderList from '../containers/Order/pages/list';
import OrderForm from '../containers/Order/pages/form';

import ProductList from '../containers/Product/pages/list';
import ProductForm from '../containers/Product/pages/form';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact component={Auth} path="/" />

        <Route exact component={OrderList} path="/order/list" />
        <Route exact component={OrderForm} path="/order/form" />

        <Route exact component={ProductList} path="/product/list" />
        <Route exact component={ProductForm} path="/product/form" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
