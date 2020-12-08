import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Box } from '@material-ui/core';

import Layout from '../../../../components/Layout';
import { Card, Input } from '../../../../components/Form';
import Items from './items';
import { IItem, IOrder } from '../../models';
import { useOrder } from '../../../../hooks/order';

const OrderForm: React.FC = () => {
  const formRef = useRef(null);
  const printRef = useRef(null);
  const history = useHistory();
  const { state } = useLocation();
  const order = state as IOrder;
  const { saveOrder } = useOrder();
  const [items, setItems] = useState<IItem[]>();

  useEffect(() => {
    setItems(order?.items || []);
  }, [order]);

  const handleSubmit = (data: IOrder): void => {
    saveOrder({ ...data, items });
    history.goBack();
  };

  return (
    <Layout>
      <div ref={printRef}>
        <Card
          showPrint
          title={`${order ? 'Editar' : 'Novo'} Pedido`}
          formRef={formRef}
          onSubmit={handleSubmit}
          printComponentRef={printRef}
          initialData={
            order || {
              id: new Date().getTime(),
              date: new Date().toLocaleString(),
            }
          }
        >
          <Input
            md={6}
            disabled
            label="Identificador"
            name="id"
            type="number"
          />

          <Input md={6} disabled label="Data" name="date" />
        </Card>

        <Box pt={4}>
          <Items items={items} setItems={setItems} />
        </Box>
      </div>
    </Layout>
  );
};

export default OrderForm;
