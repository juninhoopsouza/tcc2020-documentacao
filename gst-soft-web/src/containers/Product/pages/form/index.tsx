import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Box } from '@material-ui/core';

import Layout from '../../../../components/Layout';
import { Card, Input } from '../../../../components/Form';
import Stock from './stock';
import { IProduct, IStock } from '../../models';
import { useProduct } from '../../../../hooks/product';

const ProductForm: React.FC = () => {
  const formRef = useRef(null);
  const history = useHistory();
  const product = history.location.state as IProduct;
  const { saveProduct } = useProduct();
  const [stock, setStock] = useState<IStock[]>();

  useEffect(() => {
    setStock(product?.stock || []);
  }, [product]);

  const handleSubmit = async (data: IProduct): Promise<void> => {
    try {
      const schema = Yup.object().shape({
        code: Yup.string().required('O campo código é obrigatório'),
        color: Yup.string().required('O campo cor é obrigatório'),
      });

      await schema.validate(data, { abortEarly: false });

      saveProduct({ ...data, stock });

      history.goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  };

  return (
    <Layout>
      <Card
        title={`${product ? 'Editar' : 'Novo'} Produto`}
        formRef={formRef}
        onSubmit={handleSubmit}
        initialData={product}
      >
        <Input md={6} label="Referência" name="code" />
        <Input md={6} label="Cor" name="color" />
      </Card>

      <Box pt={4}>
        <Stock stock={stock} setStock={setStock} />
      </Box>
    </Layout>
  );
};

export default ProductForm;
