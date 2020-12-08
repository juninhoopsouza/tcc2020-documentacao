/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useRef, useEffect, useState } from 'react';
import { useField } from '@unform/core';
import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import {
  Grid,
  FormControl,
  TextField,
  CircularProgress,
} from '@material-ui/core';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded';
import CheckBoxIcon from '@material-ui/icons/CheckBoxRounded';

type FocusEvent = React.FocusEvent<HTMLTextAreaElement | HTMLDivElement>;
type Size = boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

const icon = (
  <CheckBoxOutlineBlankIcon
    fontSize="small"
    color="action"
    style={{ marginRight: 8 }}
  />
);

const checkedIcon = (
  <CheckBoxIcon fontSize="small" color="secondary" style={{ marginRight: 8 }} />
);

export interface Props<T extends object>
  extends AutocompleteProps<T, boolean, boolean, boolean> {
  label?: string;
  name?: string;
  placeholder?: string;
  valueName?: string;
  optionName(option: T): string;
  onFocus?(e: FocusEvent): void;
  xs?: Size;
  sm?: Size;
  md?: Size;
  lg?: Size;
  xl?: Size;
}

const AutocompleteForm = <T extends object>({
  label = null,
  name = null,
  placeholder = null,
  valueName = null,
  loading = false,
  multiple = false,
  optionName,
  onFocus = null,
  xs = 12,
  sm = null,
  md = null,
  lg = null,
  xl = null,
  ...rest
}: Props<T>): JSX.Element => {
  const inputRef = useRef(null);
  const {
    fieldName,
    defaultValue,
    registerField,
    error,
    clearError,
  } = useField(name);
  const [value, setValue] = useState<T | T[]>(multiple ? [] : null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: () => {
        if (!value) return multiple ? [] : null;
        if (valueName) {
          if (multiple) return (value as T[]).map(obj => obj[valueName]);
          return (value as T)[valueName];
        }
        return value;
      },
      setValue: (_, val) => {
        setValue(val || (multiple ? [] : null));
      },
    });
  }, [fieldName, value, registerField, valueName, multiple]);

  const handleFocus = (e: FocusEvent): void => {
    clearError();
    if (onFocus) onFocus(e);
  };

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <FormControl fullWidth>
        <Autocomplete
          {...rest}
          multiple={multiple}
          disableCloseOnSelect={multiple}
          openText="Abrir"
          closeText="Fechar"
          clearText="Limpar"
          noOptionsText="Sem opções"
          loadingText="Carregando..."
          loading={loading}
          value={value}
          onChange={(_, newValue) => setValue(newValue as T | T[])}
          getOptionLabel={optionName}
          defaultValue={defaultValue}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              {multiple && (selected ? checkedIcon : icon)}
              {optionName(option)}
            </React.Fragment>
          )}
          renderInput={params => (
            <TextField
              {...params}
              ref={inputRef}
              variant="standard"
              error={!!error}
              onFocus={handleFocus}
              label={label}
              placeholder={placeholder}
              helperText={error}
              FormHelperTextProps={{
                style: {
                  position: 'absolute',
                  bottom: '-22px',
                },
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="secondary" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </FormControl>
    </Grid>
  );
};

export default AutocompleteForm;
