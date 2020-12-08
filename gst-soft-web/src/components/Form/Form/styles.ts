import styled from 'styled-components';
import { Grid } from '@material-ui/core';

export const Title = styled.h3`
  font-weight: 500;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const DividerGrid = styled(Grid)`
  height: 2px;
  align-content: center;
`;

export const ProgressGrid = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
`;

export const ButtonsGrid = styled(Grid)`
  margin-top: ${({ theme }) => theme.spacing(1)}px !important;

  button + button {
    margin-left: ${({ theme }) => theme.spacing(2)}px;
  }
`;
