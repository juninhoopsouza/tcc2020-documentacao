import React from 'react';
import { OrderProvider } from './order';
import { ProductProvider } from './product';

const AppProvider: React.FC = ({ children }) => (
  <OrderProvider>
    <ProductProvider>{children}</ProductProvider>
  </OrderProvider>
);

export default AppProvider;
