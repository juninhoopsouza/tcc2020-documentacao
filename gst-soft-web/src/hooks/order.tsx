import React, { createContext, useContext, useEffect, useState } from 'react';
import { IOrder } from '../containers/Order/models';

interface OrderContextData {
  orders: IOrder[];
  saveOrder(Order: IOrder): void;
}

const OrderContext = createContext<OrderContextData>({} as OrderContextData);

const OrderProvider: React.FC = ({ children }) => {
  const [orders, setOrders] = useState<IOrder[]>();

  useEffect(() => {
    const json = localStorage.getItem('@ordersData');
    if (json) setOrders(JSON.parse(json) || []);
    else setOrders([]);
  }, []);

  useEffect(() => {
    localStorage.setItem('@ordersData', JSON.stringify(orders));
  }, [orders]);

  const getOrderById = (id: number): IOrder => {
    return orders?.find(order => order.id === id);
  };

  const saveOrder = ({ id, ...rest }: IOrder): void => {
    const order = getOrderById(id);

    const list = [...orders];
    if (order) {
      const index = list.indexOf(order);
      list[index] = { id, ...rest };
      setOrders([...list]);
    } else {
      setOrders([...list, { id, ...rest }]);
    }
  };

  return (
    <OrderContext.Provider value={{ orders, saveOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

function useOrder(): OrderContextData {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}

export { OrderProvider, useOrder };
