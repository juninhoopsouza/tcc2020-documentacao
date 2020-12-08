import React from 'react';
import dotenv from 'dotenv';

import './styles/globalStyle.css';
import { ThemeProvider } from 'styled-components';
import { StylesProvider, MuiThemeProvider } from '@material-ui/core/styles';

import Theme from './styles/theme';
import AppProvider from './hooks';
import Routes from './routes';

dotenv.config();

const App: React.FC = () => {
  return (
    <StylesProvider>
      <MuiThemeProvider theme={Theme}>
        <ThemeProvider theme={Theme}>
          <AppProvider>
            <Routes />
          </AppProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

export default App;
