import styled from 'styled-components';
import {
  Container as MuiContainer,
  Paper as MuiPaper,
} from '@material-ui/core';

export const Container = styled(MuiContainer)`
  height: 100vh;
  display: grid !important;
`;

export const Paper = styled(MuiPaper)`
  margin: auto;
`;
