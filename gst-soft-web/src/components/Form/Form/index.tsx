import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import ArrowBackIcon from '@material-ui/icons/ArrowBackRounded';
import PrintIcon from '@material-ui/icons/PrintRounded';
import SaveIcon from '@material-ui/icons/SaveRounded';
import { Grid, Divider, LinearProgress } from '@material-ui/core';
import { useReactToPrint } from 'react-to-print';
import Button from '../../Button';

import { Title, DividerGrid, ProgressGrid, ButtonsGrid } from './styles';

export interface FormProps {
  formRef: any;
  title?: string;
  initialData?: any;
  loading?: boolean;
  showPrint?: boolean;
  submitText?: string;
  submitIcon?: React.ReactElement;
  showSubmitButton?: boolean;
  backText?: string;
  backIcon?: React.ReactElement;
  printComponentRef?: React.MutableRefObject<any>;
  onSubmit: SubmitHandler;
  onBack?(): void;
}

const BasicForm: React.FC<FormProps> = ({
  formRef,
  title = null,
  initialData = null,
  loading = false,
  showPrint = false,
  submitText = null,
  submitIcon = undefined,
  showSubmitButton = true,
  backText = null,
  backIcon = undefined,
  printComponentRef = null,
  onSubmit,
  onBack = null,
  children = null,
}) => {
  const history = useHistory();

  const handlePrint = useReactToPrint({
    content: () => printComponentRef?.current,
  });

  useEffect(() => console.log(printComponentRef), [printComponentRef]);

  return (
    <Form ref={formRef} onSubmit={onSubmit} initialData={initialData}>
      <Grid container direction="row" alignItems="center" spacing={3}>
        {title ? (
          <>
            <Grid item xs={12}>
              <Title>{title}</Title>
            </Grid>

            <DividerGrid item xs={12}>
              {loading ? <LinearProgress /> : <Divider />}
            </DividerGrid>
          </>
        ) : (
          <ProgressGrid>{loading && <LinearProgress />}</ProgressGrid>
        )}

        {children}

        <ButtonsGrid
          container
          item
          direction="row"
          justify="space-between"
          xs={12}
        >
          <Grid item>
            <Button
              {...(backIcon !== null
                ? { startIcon: backIcon || <ArrowBackIcon /> }
                : {})}
              variant="outlined"
              buttonColor="primary"
              onClick={onBack || history.goBack}
              disabled={loading}
            >
              {backText || 'Voltar'}
            </Button>
          </Grid>

          <Grid item>
            {showPrint && (
              <Button
                startIcon={<PrintIcon />}
                buttonColor="primary"
                variant="outlined"
                onClick={handlePrint}
                disabled={loading}
              >
                Imprimir Pedido
              </Button>
            )}

            {showSubmitButton && (
              <Button
                {...(submitIcon !== null
                  ? { startIcon: submitIcon || <SaveIcon /> }
                  : {})}
                buttonColor="primary"
                type="submit"
                disabled={loading}
              >
                {submitText || 'Salvar'}
              </Button>
            )}
          </Grid>
        </ButtonsGrid>
      </Grid>
    </Form>
  );
};

export default BasicForm;
