import React from 'react';
import { Checkbox } from 'unform-material-ui';
import {
  CheckboxProps,
  Grid,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';

type Size = boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
interface Props extends CheckboxProps {
  name: string;
  label: string;
  labelPlacement?: 'top' | 'start' | 'bottom' | 'end';
  xs?: Size;
  sm?: Size;
  md?: Size;
  lg?: Size;
  xl?: Size;
}

const CheckboxForm: React.FC<Props> = ({
  name,
  label,
  labelPlacement = 'end',
  xs = 12,
  sm = null,
  md = null,
  lg = null,
  xl = null,
  children = null,
  ...rest
}) => (
  <Grid
    item
    xs={xs}
    sm={sm}
    md={md}
    lg={lg}
    xl={xl}
    style={{ display: 'flex', alignItems: 'center' }}
  >
    <FormControl>
      <FormControlLabel
        label={label}
        labelPlacement={labelPlacement}
        control={<Checkbox {...rest} name={name} />}
      />
    </FormControl>
    {children}
  </Grid>
);

export default CheckboxForm;
