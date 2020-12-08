import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import ReceiptIcon from '@material-ui/icons/Receipt';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import { Drawer, DrawerContainer } from './styles';

const DrawerComponent: React.FC = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const handleClick = (path: string): void => {
    history.push(path);
  };

  const getBackground = (path: string): string => {
    return pathname === path ? '#e0e0e047' : 'transparent';
  };

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        style: {
          width: 200,
        },
      }}
    >
      <Toolbar />
      <DrawerContainer>
        <List>
          <ListItem
            button
            onClick={() => handleClick('/order/list')}
            style={{ background: getBackground('/order/list') }}
          >
            <ListItemIcon>
              <ReceiptIcon style={{ color: '#ffffffcc' }} />
            </ListItemIcon>
            <ListItemText primary="Pedidos" style={{ color: '#fff' }} />
          </ListItem>

          <ListItem
            button
            onClick={() => handleClick('/product/list')}
            style={{ background: getBackground('/product/list') }}
          >
            <ListItemIcon>
              <ShoppingBasketIcon style={{ color: '#ffffffcc' }} />
            </ListItemIcon>
            <ListItemText primary="Produtos" style={{ color: '#fff' }} />
          </ListItem>
        </List>
      </DrawerContainer>
    </Drawer>
  );
};

export default DrawerComponent;
