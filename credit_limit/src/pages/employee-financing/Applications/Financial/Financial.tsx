import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from 'components/Input';
import NumberFormatCustom from 'components/forms/number-format-custom';

import { Button, Div } from 'assets/css/styled';
import { schemaFinancialValidation } from '../validators';

import { useApplicationContext } from 'pages/commons/Applications/providers/ApplicationProvider';
import useLoanApplicationSubmit from '../hooks/useLoanApplicationSubmit';
import { ApplicationParam } from '../types';

const Financial = () => {
  const {
    setLongFormData,
    longFormData,
  }: {
    setLongFormData: (data: ApplicationParam) => void;
    longFormData: Record<string, never>;
  } = useApplicationContext();

  const { submit } = useLoanApplicationSubmit();

  const history = useHistory();

  const {
    handleSubmit,
    reset,
    control,
    formState: { isValid },
  } = useForm<ApplicationParam>({
    resolver: yupResolver(schemaFinancialValidation),
    //mode 'all' to validate error onChange and onSubmit
    mode: 'all',
  });

  const onSubmit = (data: ApplicationParam) => {
    setLongFormData(data);

    submit({ ...longFormData, ...data });
  };

  const handleOnBack = () => {
    history.goBack();
  };

  useEffect(() => {
    if (longFormData) {
      reset({ ...longFormData });
    }
  }, [longFormData]);

  return (
    <Div>
      <Controller
        control={control}
        name='expense_per_month'
        render={({
          field: { onChange, value, name },
          fieldState: { error },
        }) => (
          <Input
            name={name}
            label='Total Pengeluaran Rumah Tangga per Bulan'
            value={value}
            onChange={onChange}
            errorMessage={error?.message}
            inputProps={{ maxLength: 20 }}
            inputPropsMui={{
              startAdornment: <span style={{ marginRight: '10px' }}>Rp</span>,
              inputComponent: NumberFormatCustom,
            }}
          />
        )}
      />

      <Controller
        control={control}
        name='expenses_monthly_house_rent'
        render={({
          field: { onChange, value, name },
          fieldState: { error },
        }) => (
          <Input
            name={name}
            label='Total Cicilan/Sewa Rumah per Bulan'
            value={value}
            onChange={onChange}
            errorMessage={error?.message}
            inputProps={{ maxLength: 20 }}
            inputPropsMui={{
              startAdornment: <span style={{ marginRight: '10px' }}>Rp</span>,
              inputComponent: NumberFormatCustom,
            }}
          />
        )}
      />

      <Controller
        control={control}
        name='debt_installments_per_month'
        render={({
          field: { onChange, value, name },
          fieldState: { error },
        }) => (
          <Input
            name={name}
            label='Total Cicilan Hutang per Bulan'
            value={value}
            onChange={onChange}
            errorMessage={error?.message}
            inputProps={{ maxLength: 20 }}
            inputPropsMui={{
              startAdornment: <span style={{ marginRight: '10px' }}>Rp</span>,
              inputComponent: NumberFormatCustom,
            }}
          />
        )}
      />

      <Div display='flex' justifyContent='space-between'>
        <Button
          border='1px solid #C2C2C2'
          backgroundColor='white'
          color='#404040'
          onClick={handleOnBack}
        >
          Kembali
        </Button>
        <Button disabled={!isValid}>
          <Div width='100%' onClick={handleSubmit(onSubmit)}>
            Ajukan
          </Div>
        </Button>
      </Div>
    </Div>
  );
};

export default Financial;
