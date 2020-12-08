/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { Button, ButtonProps } from '@material-ui/core';
import { darken } from 'polished';

export interface Props extends ButtonProps {
  buttonColor: string;
  textColor: string;
}

// https://github.com/styled-components/styled-components/pull/2093#issuecomment-474743876
export const MyButton = styled(
  ({ variant, buttonColor, textColor, ...rest }: Props) => (
    <Button {...rest} variant={variant} />
  ),
)`
  background-color: ${props =>
    props.variant === 'contained'
      ? props.buttonColor
      : 'transparent'} !important;

  color: ${props =>
    props.variant === 'contained'
      ? props.textColor
      : props.buttonColor} !important;

  border-color: ${props =>
    props.variant === 'outlined'
      ? `${props.buttonColor}80`
      : 'unset'} !important;

  &:hover {
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  }

  &:hover:not(:disabled) {
    background-color: ${props =>
      props.variant === 'contained'
        ? darken(0.08, props.buttonColor)
        : `${props.buttonColor}0a`} !important;

    border-color: ${props =>
      props.variant === 'outlined' ? props.buttonColor : 'unset'} !important;
  }

  &:active:not(:disabled) {
    ${props =>
      props.variant === 'contained'
        ? ''
        : `background-color: ${props.buttonColor}18 !important;`}
  }
`;
