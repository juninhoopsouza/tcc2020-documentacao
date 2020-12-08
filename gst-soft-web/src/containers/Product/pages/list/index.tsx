import React from 'react';
import { useHistory } from 'react-router-dom';
import AddBoxIcon from '@material-ui/icons/AddBoxRounded';
import EditIcon from '@material-ui/icons/EditRounded';
import MaterialTable, { Action, Column } from 'material-table';

import { Icons, Localization, Options } from '../../../../configs';
import Layout from '../../../../components/Layout';
import { IProduct } from '../../models';
import { useProduct } from '../../../../hooks/product';

const ProductList: React.FC = () => {
  const history = useHistory();
  const { products } = useProduct();

  const renderNumbers = ({ stock }: IProduct): any => {
    const numbers = stock?.map(({ number }, index) => {
      if (index === 0) {
        return number;
      }
      return `, ${number}`;
    });
    return <span>{numbers || '-'}</span>;
  };

  const columns: Column<IProduct>[] = [
    {
      title: 'Referência',
      field: 'code',
    },
    {
      title: 'Cor',
      field: 'color',
    },
    {
      title: 'Números',
      render: (data: IProduct) => renderNumbers(data),
    },
  ];

  const handleAdd = async (): Promise<void> => {
    history.push('/product/form');
  };

  const handleEdit = async (product: IProduct): Promise<void> => {
    history.push({ pathname: '/product/form', state: product });
  };

  const actions: Action<IProduct>[] = [
    {
      icon: () => <AddBoxIcon color="primary" />,
      tooltip: 'Novo Produto',
      isFreeAction: true,
      onClick: () => handleAdd(),
    },
    {
      icon: () => <EditIcon color="secondary" />,
      tooltip: 'Editar',
      onClick: (_, product) => handleEdit(product as IProduct),
    },
  ];

  return (
    <Layout>
      <MaterialTable
        title="Produtos"
        icons={Icons}
        localization={Localization('Editar')}
        options={Options<IProduct>()}
        columns={columns}
        actions={actions}
        data={products}
      />
    </Layout>
  );
};

export default ProductList;
