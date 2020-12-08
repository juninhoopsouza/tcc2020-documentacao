import React from 'react';
import MaterialTable, { Column } from 'material-table';

import { Icons, Localization, Options } from '../../../../configs';
import { IStock } from '../../models';

interface Props {
  stock: IStock[];
  setStock: React.Dispatch<React.SetStateAction<IStock[]>>;
}

const Stock: React.FC<Props> = ({ stock, setStock }) => {
  const columns: Column<IStock>[] = [
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
      title="Números / Quantidade"
      icons={Icons}
      localization={Localization('Deletar')}
      options={Options<IStock>()}
      columns={columns}
      data={stock}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setStock([...stock, newData]);

            resolve();
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            const dataUpdate = [...stock];
            const index = dataUpdate.indexOf(oldData);
            dataUpdate[index] = newData;
            setStock([...dataUpdate]);

            resolve();
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            const dataDelete = [...stock];
            const index = dataDelete.indexOf(oldData);
            dataDelete.splice(index, 1);
            setStock([...dataDelete]);

            resolve();
          }),
      }}
    />
  );
};

export default Stock;
