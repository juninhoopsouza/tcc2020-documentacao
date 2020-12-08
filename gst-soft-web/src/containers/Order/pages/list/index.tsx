import React from 'react';
import { useHistory } from 'react-router-dom';
import AddBoxIcon from '@material-ui/icons/AddBoxRounded';
import EditIcon from '@material-ui/icons/EditRounded';
import MaterialTable, { Action, Column } from 'material-table';

import { Icons, Localization, Options } from '../../../../configs';
import Layout from '../../../../components/Layout';
import { IOrder } from '../../models';
import { useOrder } from '../../../../hooks/order';

const OrderList: React.FC = () => {
  const history = useHistory();
  const { orders } = useOrder();

  const columns: Column<IOrder>[] = [
    {
      title: 'Identificador',
      field: 'id',
    },
    {
      title: 'Data do Pedido',
      field: 'date',
    },
  ];

  const handleAdd = async (): Promise<void> => {
    history.push('/order/form');
  };

  const handleEdit = async (order: IOrder): Promise<void> => {
    history.push({ pathname: '/order/form', state: order });
  };

  const actions: Action<IOrder>[] = [
    {
      icon: () => <AddBoxIcon color="primary" />,
      tooltip: 'Novo Pedido',
      isFreeAction: true,
      onClick: () => handleAdd(),
    },
    {
      icon: () => <EditIcon color="secondary" />,
      tooltip: 'Editar',
      onClick: (_, order) => handleEdit(order as IOrder),
    },
  ];

  return (
    <Layout>
      <MaterialTable
        title="Pedidos"
        icons={Icons}
        localization={Localization('Editar')}
        options={Options<IOrder>()}
        columns={columns}
        actions={actions}
        data={orders}
      />
    </Layout>
  );
};

export default OrderList;
