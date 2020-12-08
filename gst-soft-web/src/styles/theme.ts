import { createMuiTheme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#32151b',
    },
    secondary: {
      main: '#823324',
      contrastText: '#fff',
    },
    success: {
      main: '#4caf50',
      contrastText: '#fff',
    },
    warning: {
      main: '#ff9800',
      contrastText: '#fff',
    },
    background: {
      default: grey[200],
    },
    info: {
      main: '#1976d2',
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        padding: '10px 20px',
      },
      text: {
        padding: '10px 20px',
      },
      outlined: {
        padding: '9px 19px',
      },
    },
    MuiInputLabel: {
      root: {
        color: 'rgba(0, 0, 0, 0.4)',
      },
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
});
