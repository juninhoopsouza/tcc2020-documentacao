import React from 'react';
import { Paper, Box } from '@material-ui/core';
import Form, { FormProps } from '../Form';

const CardForm: React.FC<FormProps> = (props: FormProps) => (
  <Paper>
    <Box p={4}>
      <Form {...props} />
    </Box>
  </Paper>
);

export default CardForm;
