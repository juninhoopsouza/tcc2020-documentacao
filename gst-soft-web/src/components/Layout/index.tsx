import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@material-ui/core';

import AppBar from '../AppBar';
import Drawer from '../Drawer';
import { Root, Container } from './styles';

const LayoutComponent: React.FC = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;
  const logged = pathname !== '/';

  return (
    <Root>
      {logged && (
        <>
          <AppBar />
          <Drawer />
        </>
      )}
      <Container margin={logged ? 65 : 0}>
        <Box p={4}>{children}</Box>
      </Container>
    </Root>
  );
};

export default LayoutComponent;
