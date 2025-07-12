import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useUserContext } from 'providers/UserProvider';
import {
  DisbursementParam,
  submitDisbursement,
} from 'services/employee-financing';
import { MAX_WIDTH, MIN_WIDTH } from 'constant';

import { Button, Container, Div, Main, Wrapper } from 'assets/css/styled';
import { text } from 'assets/css/stylesValue';
import { my5 } from 'assets/css/stylesFix';

import Input from 'components/Input';
import NumberFormatCustom from 'components/forms/number-format-custom/NumberFormatCustom';
import SelectOption from 'components/SelectOption';
import LoaderText from 'components/LoaderText';

import { schemaDisbursementValidation } from '../validators';
import { AxiosError } from 'axios';

const Disbursement: React.FC = () => {
  const history = useHistory();
  const { handleNotification } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<DisbursementParam>({
    resolver: yupResolver(schemaDisbursementValidation),
    //mode 'all' to validate error onChange and onSubmit
    mode: 'all',
  });

  // any type but with static declaration
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  const isErrorWithMessage = (
    error: unknown,
  ): error is {
    message: string;
    response: {
      data: {
        errors: string[];
      };
    };
  } => {
    return (
      typeof error === 'object' &&
      error !== null &&
      typeof (error as AxiosError).response?.data === 'object'
    );
  };

  const onSubmit = async (data: DisbursementParam) => {
    if (!isLoading) {
      try {
        setIsLoading(true);
        const response = await submitDisbursement(data);

        if (response.success) {
          setIsLoading(false);
          history.push(`/ef-pilot/success`, {
            from: 'disbursement',
          });
        }
      } catch (error) {
        if (isErrorWithMessage(error)) {
          const errors = error?.response?.data?.errors ?? {};
          const errorMessage = Object.values(errors)[0];

          setIsLoading(false);
          handleNotification({
            isOpen: true,
            message: errorMessage || 'Terjadi kesalahan ketika kirim formulir',
          });
        }
      }
    }
  };

  return (
    <Main>
      <Container>
        <Wrapper
          height={'100%'}
          minHeight={'100vh'}
          maxWidth={MAX_WIDTH}
          minWidth={MIN_WIDTH}
          backgroundColor='#fff'
          padding='24px 16px'
        >
          <Div
            className={text({
              size: 24,
              weight: 400,
              style: 'normal',
              lineHeight: '32px',
              color: '#181818',
            })}
          >
            Formulir Tarik Dana
          </Div>
          <Div
            className={text({
              size: 14,
              weight: 400,
              style: 'normal',
              lineHeight: '22px',
              color: '#9E9E9E',
            })}
          >
            Harap lengkapi formulir permohonan pinjaman berikut sesuai dengan
            informasi yang dibutuhkan
          </Div>
          <Div className={my5}>
            <Controller
              control={control}
              name='nik'
              render={({
                field: { onChange, value, name },
                fieldState: { error },
              }) => (
                <Input
                  name={name}
                  errorMessage={error?.message}
                  label='Nomor KTP'
                  type='number'
                  value={value}
                  onChange={onChange}
                  inputProps={{
                    maxLength: 16,
                  }}
                />
              )}
            />

            <Controller
              control={control}
              name='request_loan_amount'
              render={({
                field: { onChange, value, name },
                fieldState: { error },
              }) => (
                <Input
                  name={name}
                  label='Jumlah Pinjaman'
                  value={value}
                  onChange={onChange}
                  errorMessage={error?.message}
                  inputProps={{ maxLength: 20 }}
                  inputPropsMui={{
                    startAdornment: (
                      <span style={{ marginRight: '10px' }}>Rp</span>
                    ),
                    inputComponent: NumberFormatCustom,
                  }}
                />
              )}
            />

            <Controller
              control={control}
              name='tenor'
              render={({
                field: { onChange, value, name },
                fieldState: { error },
              }) => (
                <SelectOption
                  name={name}
                  options={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                  label='Jangka Waktu (dalam bulan)'
                  value={value}
                  onChange={onChange}
                  errorMessage={error?.message}
                />
              )}
            />

            <Div textAlign='right'>
              <Button
                disabled={!isValid || isLoading}
                padding='12px 16px'
                className={text({ size: 16, lineHeight: '24px', weight: 700 })}
              >
                <Div onClick={handleSubmit(onSubmit)}>
                  <LoaderText isLoading={isLoading} text='Ajukan' />
                </Div>
              </Button>
            </Div>
          </Div>
        </Wrapper>
      </Container>
    </Main>
  );
};

export default Disbursement;
