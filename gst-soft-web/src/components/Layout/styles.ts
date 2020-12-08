import styled from 'styled-components';

import AuthBackground from '../../assets/auth-background.jpg';

interface ContainerProps {
  margin: number;
}

export const Root = styled.div`
  display: flex;
  background: url(${AuthBackground});
  background-size: cover;
`;

export const Container = styled.div<ContainerProps>`
  min-height: calc(100vh - ${props => props.margin}px);
  width: 100vw;
  margin-top: ${props => props.margin}px;
`;
