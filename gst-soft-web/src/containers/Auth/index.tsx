import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Form } from '@unform/web';
import { TextField } from 'unform-material-ui';

import Layout from '../../components/Layout';
import { Container, Paper } from './styles';

const Auth: React.FC = () => {
  const history = useHistory();

  const handleSubmit = (): void => {
    history.push('/order/list');
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Paper>
          <Box p={4}>
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={3} justify="center" alignItems="center">
                <Grid item>
                  <Typography variant="h3">GST Soft</Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="email"
                    label="E-mail"
                    type="email"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Entrar
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Auth;
