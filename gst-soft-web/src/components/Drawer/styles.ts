import styled from 'styled-components';
import { Drawer as MuiDrawer } from '@material-ui/core';

export const Drawer = styled(MuiDrawer)`
  width: 200px;
  flex-shrink: 0;
  z-index: 0;

  > div {
    background-image: linear-gradient(
      180deg,
      ${({ theme }) => theme.palette.primary.dark} 0%,
      ${({ theme }) => theme.palette.primary.main} 62%,
      ${({ theme }) => theme.palette.primary.light} 100%
    );
  }
`;

export const DrawerContainer = styled.div`
  overflow: auto;
`;
