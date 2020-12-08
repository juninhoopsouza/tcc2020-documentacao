import React from 'react';
import MaterialTable, { Column } from 'material-table';

import { Icons, Localization, Options } from '../../../../configs';
import { IItem } from '../../models';
import { useProduct } from '../../../../hooks/product';

interface Props {
  items: IItem[];
  setItems: React.Dispatch<React.SetStateAction<IItem[]>>;
}

const Items: React.FC<Props> = ({ items, setItems }) => {
  const { products } = useProduct();

  const columns: Column<IItem>[] = [
    {
      title: 'Produto (Referência)',
      field: 'code',
      lookup: products?.map(p => p.code) || [],
    },
    {
      title: 'Número',
      field: 'number',
    },
    {
      title: 'Quantidade',
      field: 'quantity',
    },
  ];

  return (
    <MaterialTable
      title="Items do Pedido"
      icons={Icons}
      localization={Localization('Deletar')}
      options={Options<IItem>()}
      columns={columns}
      data={items}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setItems([...items, newData]);

            resolve();
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            const dataUpdate = [...items];
            const index = dataUpdate.indexOf(oldData);
            dataUpdate[index] = newData;
            setItems([...dataUpdate]);

            resolve();
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            const dataDelete = [...items];
            const index = dataDelete.indexOf(oldData);
            dataDelete.splice(index, 1);
            setItems([...dataDelete]);

            resolve();
          }),
      }}
    />
  );
};

export default Items;
