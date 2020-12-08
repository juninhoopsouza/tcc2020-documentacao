/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import React, { useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import { StandardTextFieldProps, Grid, TextField } from '@material-ui/core';
import Masked from './masked';

type MaskArray = (string | RegExp)[];
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
type FocusEvent = React.FocusEvent<HTMLInputElement>;
type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>;
type Size = boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface Props extends StandardTextFieldProps {
  label: string;
  name: string;
  mask?: MaskArray | MaskArray[];
  disableDefaultValue?: boolean;
  mainRef?: React.MutableRefObject<any>;
  setText?(text: string): void;
  onChange?(e: ChangeEvent): void;
  onFocus?(e: FocusEvent): void;
  onBlur?(e: FocusEvent): void;
  onBlurShrink?(e: FocusEvent, setShrink: (shrink: boolean) => void): void;
  onKeyPress?(e: KeyboardEvent): void;
  xs?: Size;
  sm?: Size;
  md?: Size;
  lg?: Size;
  xl?: Size;
}

const InputForm: React.FC<Props> = ({
  label,
  name,
  mask = null,
  disableDefaultValue = false,
  mainRef = null,
  onChange = null,
  onFocus = null,
  onBlur = null,
  onBlurShrink = null,
  onKeyPress = null,
  xs = 12,
  sm = null,
  md = null,
  lg = null,
  xl = null,
  ...rest
}) => {
  const { value } = rest;
  const auxRef = useRef(null);
  const inputRef = mainRef || auxRef;
  const {
    fieldName,
    registerField,
    defaultValue,
    error,
    clearError,
  } = useField(name);
  const [maskedStartValue, setMaskedStartValeu] = useState(defaultValue);
  const [shrink, setShrink] = useState(!!value || !!defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: ({ value }) => value.trim(),
      setValue: (ref, value) => {
        setShrink(!!value);
        setMaskedStartValeu(value);
        ref.value = value;
      },
    });
  }, [fieldName, inputRef, registerField]);

  const handleFocus = (e: FocusEvent): void => {
    setShrink(true);
    clearError();
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: FocusEvent): void => {
    setShrink(!!inputRef.current.value);
    inputRef.current.value = inputRef.current.value.trim();
    if (onBlur) onBlur(e);
    if (onBlurShrink) onBlurShrink(e, setShrink);
  };

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <TextField
        {...rest}
        {...(!disableDefaultValue && { defaultValue })}
        fullWidth
        label={label}
        InputLabelProps={{ shrink }}
        variant="standard"
        inputRef={inputRef}
        error={!!error}
        helperText={error}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyPress={onKeyPress}
        FormHelperTextProps={{
          style: {
            position: 'absolute',
            bottom: '-22px',
          },
        }}
        InputProps={
          mask
            ? {
                inputComponent: Masked as any,
                inputProps: {
                  mask,
                  startValue: maskedStartValue,
                  onChange,
                  onKeyPress,
                },
              }
            : {}
        }
      />
    </Grid>
  );
};

export default InputForm;
