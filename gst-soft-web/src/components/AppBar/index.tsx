import React from 'react';
import { useHistory } from 'react-router-dom';
import { Toolbar, Typography, IconButton } from '@material-ui/core';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { AppBar } from './styles';

const AppBarComponent: React.FC = () => {
  const history = useHistory();

  const handleLogout = (): void => {
    history.push('/');
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap>
          GST Soft
        </Typography>

        <IconButton
          onClick={handleLogout}
          style={{ color: '#ffffffcc', position: 'absolute', right: 16 }}
        >
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
