/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from 'react';

import AddBoxIcon from '@material-ui/icons/AddBoxRounded';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import CheckIcon from '@material-ui/icons/CheckRounded';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightIcon from '@material-ui/icons/ChevronRightRounded';
import ClearIcon from '@material-ui/icons/ClearRounded';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutlineRounded';
import EditIcon from '@material-ui/icons/EditRounded';
import FilterListIcon from '@material-ui/icons/FilterListRounded';
import FirstPageIcon from '@material-ui/icons/FirstPageRounded';
import LastPageIcon from '@material-ui/icons/LastPageRounded';
import RemoveIcon from '@material-ui/icons/RemoveRounded';
import SaveAltIcon from '@material-ui/icons/SaveAltRounded';
import SearchIcon from '@material-ui/icons/SearchRounded';
import ViewColumnIcon from '@material-ui/icons/ViewColumnRounded';

import {
  Icons as TypeIcons,
  Options as TypeOptions,
  Localization as TypeLocalization,
} from 'material-table';

const Icons: TypeIcons = {
  Add: forwardRef((props: any, ref: any) => (
    <AddBoxIcon {...props} ref={ref} color="primary" />
  )),
  Check: forwardRef((props: any, ref: any) => (
    <CheckIcon {...props} ref={ref} />
  )),
  Clear: forwardRef((props: any, ref: any) => (
    <ClearIcon {...props} ref={ref} />
  )),
  Edit: forwardRef((props: any, ref: any) => (
    <EditIcon {...props} ref={ref} color="secondary" />
  )),
  Delete: forwardRef((props: any, ref: any) => (
    <DeleteOutlineIcon {...props} ref={ref} color="secondary" />
  )),
  DetailPanel: forwardRef((props: any, ref: any) => (
    <ChevronRightIcon {...props} ref={ref} />
  )),
  Export: forwardRef((props: any, ref: any) => (
    <SaveAltIcon {...props} ref={ref} />
  )),
  Filter: forwardRef((props: any, ref: any) => (
    <FilterListIcon {...props} ref={ref} />
  )),
  FirstPage: forwardRef((props: any, ref: any) => (
    <FirstPageIcon {...props} ref={ref} />
  )),
  LastPage: forwardRef((props: any, ref: any) => (
    <LastPageIcon {...props} ref={ref} />
  )),
  NextPage: forwardRef((props: any, ref: any) => (
    <ChevronRightIcon {...props} ref={ref} />
  )),
  PreviousPage: forwardRef((props: any, ref: any) => (
    <ChevronLeftIcon {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props: any, ref: any) => (
    <ClearIcon {...props} ref={ref} />
  )),
  Search: forwardRef((props: any, ref: any) => (
    <SearchIcon {...props} ref={ref} />
  )),
  SortArrow: forwardRef((props: any, ref: any) => (
    <KeyboardArrowUpIcon {...props} ref={ref} />
  )),
  ThirdStateCheck: forwardRef((props: any, ref: any) => (
    <RemoveIcon {...props} ref={ref} />
  )),
  ViewColumn: forwardRef((props: any, ref: any) => (
    <ViewColumnIcon {...props} ref={ref} />
  )),
};

const Localization = (actionsTitle = ''): TypeLocalization => {
  return {
    toolbar: {
      searchPlaceholder: 'Pesquisar',
      nRowsSelected: '{0} Linha(s) selecionada(s)',
    },
    header: {
      actions: actionsTitle,
    },
    pagination: {
      labelRowsSelect: 'linhas',
      labelDisplayedRows: '{from}-{to} de {count}',
      nextTooltip: 'Próxima página',
      previousTooltip: 'Página anterior',
      lastTooltip: 'Última página',
      firstTooltip: 'Primeira página',
    },
    body: {
      emptyDataSourceMessage: 'Nenhum registro encontrado',
      addTooltip: 'Adicionar',
      deleteTooltip: 'Deletar',
      editTooltip: 'Editar',
      editRow: {
        cancelTooltip: 'Cancelar',
        deleteText: 'Tem certeza que deseja deletar esse registro?',
        saveTooltip: 'Salvar',
      },
    },
  };
};

const Options = <T extends object>(): TypeOptions<T> => {
  return {
    loadingType: 'linear',
    pageSize: 10,
    actionsColumnIndex: -1,
    paginationType: 'stepped',
    emptyRowsWhenPaging: false,
    headerStyle: {
      zIndex: 0,
      fontFamily: 'Maven Pro',
      color: 'rgba(0,0,0,.5)',
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '1rem',
    },
    rowStyle: {
      fontFamily: 'Maven Pro',
      fontSize: '14px',
    },
  };
};

export { Icons, Options, Localization };
