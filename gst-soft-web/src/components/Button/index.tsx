import React, { useState, useEffect } from 'react';
import { useTheme, Theme } from '@material-ui/core/styles';
import { ButtonProps } from '@material-ui/core';
import { MyButton } from './styles';

type PaletteColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'error'
  | 'warning';

type PaletteVariantColor = 'main' | 'light' | 'dark';

interface Props extends ButtonProps {
  buttonColor: PaletteColor | string;
  variantColor?: PaletteVariantColor;
  textColor?: string;
}

const Button: React.FC<Props> = ({
  buttonColor,
  variantColor = 'main',
  variant = 'contained',
  textColor = null,
  children = null,
  ...props
}) => {
  const { palette } = useTheme() as Theme;
  const [defaultButtonColor, setButtonColor] = useState<string>(
    palette.primary.main,
  );
  const [defaultTextColor, setTextColor] = useState<string>(
    palette.getContrastText(palette.primary.main),
  );

  const regexColorHex = /^#[0-9A-F]{6}$/i;
  const regexTextColorHex = /^#[0-9A-F]{8}$/i;
  const paletteColors = [
    'primary',
    'secondary',
    'success',
    'info',
    'error',
    'warning',
  ];

  useEffect(() => {
    if (paletteColors.indexOf(buttonColor) >= 0) {
      const color = palette[buttonColor];
      setButtonColor(color[variantColor]);
      if (regexTextColorHex.test(textColor)) {
        setTextColor(textColor);
      } else if (variantColor === 'main') {
        setTextColor(color.contrastText);
      } else {
        setTextColor(palette.getContrastText(color[variantColor]));
      }
    } else if (regexColorHex.test(buttonColor)) {
      const color = buttonColor;
      setButtonColor(color);
      if (regexTextColorHex.test(textColor)) {
        setTextColor(textColor);
      } else {
        setTextColor(palette.getContrastText(color));
      }
    }
  }, [
    buttonColor,
    palette,
    paletteColors,
    regexColorHex,
    regexTextColorHex,
    textColor,
    variantColor,
  ]);

  return (
    <MyButton
      {...props}
      variant={variant}
      buttonColor={defaultButtonColor}
      textColor={defaultTextColor}
    >
      {children}
    </MyButton>
  );
};

export default Button;
