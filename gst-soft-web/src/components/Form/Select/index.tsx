/* eslint-disable no-param-reassign */
import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import {
  Grid,
  FormControl,
  Select,
  FormHelperText,
  SelectProps,
  InputLabel,
} from '@material-ui/core';

type FocusEvent = React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>;
type Size = boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface Props extends SelectProps {
  label: string;
  name: string;
  onFocus?(e: FocusEvent): void;
  xs?: Size;
  sm?: Size;
  md?: Size;
  lg?: Size;
  xl?: Size;
}

const SelectForm: React.FC<Props> = ({
  label,
  name,
  onFocus = null,
  xs = 12,
  sm = null,
  md = null,
  lg = null,
  xl = null,
  multiple = false,
  children = null,
  ...rest
}) => {
  const selectRef = useRef(null);
  const {
    fieldName,
    defaultValue,
    registerField,
    error,
    clearError,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: ref => {
        const { value } = ref.childNodes[1];
        if (multiple) {
          if (!value) {
            return [];
          }
          return value.split(',');
        }
        if (!value) {
          return '';
        }
        return value;
      },
      // setValue: (ref, value) => {
      //   // TODO
      // },
    });
  }, [fieldName, multiple, registerField]);

  const handleFocus = (e: FocusEvent): void => {
    clearError();
    if (onFocus) onFocus(e);
  };

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          {...rest}
          ref={selectRef}
          multiple={multiple}
          label={label}
          variant="standard"
          defaultValue={defaultValue}
          error={!!error}
          onFocus={handleFocus}
        >
          {children}
        </Select>
        <FormHelperText
          error={!!error}
          style={{ position: 'absolute', bottom: '-22px' }}
        >
          {error}
        </FormHelperText>
      </FormControl>
    </Grid>
  );
};

export default SelectForm;
