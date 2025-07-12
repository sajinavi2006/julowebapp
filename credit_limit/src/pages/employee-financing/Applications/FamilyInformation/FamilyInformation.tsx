import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from 'components/Input';

import { Button, Div } from 'assets/css/styled';
import { schemaFamilyInformation } from '../validators';
import PhoneFormatCustom from 'components/forms/phone-format-custom';
import SelectOption from 'components/SelectOption';
import { useApplicationContext } from 'pages/commons/Applications/providers/ApplicationProvider';
import { ApplicationParam } from '../types';

const FamilyInformation = () => {
  const {
    setLongFormData,
    longFormData,
  }: {
    setLongFormData: (data: ApplicationParam) => void;
    longFormData: Record<string, never>;
  } = useApplicationContext();

  const history = useHistory();

  const {
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { isValid },
  } = useForm<ApplicationParam>({
    resolver: yupResolver(schemaFamilyInformation),
    // context is using on yup schema object
    context: {
      phone_number: longFormData?.phone_number,
    },
    //mode 'all' to validate error onChange and onSubmit
    mode: 'all',
  });

  const maritalValue = useWatch({
    control,
    name: 'marriage_status',
  });

  const onSubmit = (data: ApplicationParam) => {
    let payload = data;
    if (maritalValue === 'Lajang') {
      payload = {
        ...payload,
        couple_name: undefined,
        couple_phone_number: undefined,
      };
    }
    setLongFormData(payload);
    history.push(`/ef-pilot/application/financial`, {
      from: 'family_information',
    });
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
        name='mother_name'
        render={({
          field: { onChange, value, name },
          fieldState: { error },
        }) => (
          <Input
            name={name}
            errorMessage={error?.message}
            label='Nama Orang Tua Kandung'
            value={value}
            onChange={onChange}
            inputProps={{
              maxLength: 50,
            }}
          />
        )}
      />

      <Controller
        control={control}
        name='mother_phone_number'
        render={({
          field: { onChange, value, name },
          fieldState: { error },
        }) => (
          <Input
            errorMessage={error?.message}
            name={name}
            placeholder='08xxxxxxxxx'
            label='Nomor HP Aktif Orang Tua Kandung'
            value={value}
            onChange={onChange}
            inputPropsMui={{
              inputComponent: PhoneFormatCustom,
            }}
          />
        )}
      />

      <Controller
        control={control}
        name='marriage_status'
        render={({
          field: { onChange, value, name },
          fieldState: { error },
        }) => (
          <SelectOption
            name={name}
            options={[
              { title: 'Lajang', value: 'Lajang' },
              { title: 'Menikah', value: 'Menikah' },
            ]}
            renderOptions={(option: Record<string, string>) => option.title}
            label='Status Pernikahan'
            value={value}
            onChange={(e) => {
              onChange(e);

              setValue('couple_name', undefined, {
                shouldValidate: true,
              });
              setValue('couple_phone_number', undefined, {
                shouldValidate: true,
              });
            }}
            errorMessage={error?.message}
          />
        )}
      />

      {maritalValue == 'Menikah' && (
        <Controller
          control={control}
          name='couple_name'
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <Input
              name={name}
              errorMessage={error?.message}
              label='Nama Pasangan (Suami/Istri)'
              value={value}
              onChange={onChange}
              inputProps={{
                maxLength: 50,
              }}
            />
          )}
        />
      )}

      {maritalValue == 'Lajang' && (
        <Controller
          control={control}
          name='couple_phone_number'
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <Input
              errorMessage={error?.message}
              name={name}
              placeholder='08xxxxxxxxx'
              label='Nomor HP Aktif Orang Tua Kandung'
              value={value}
              onChange={onChange}
              inputPropsMui={{
                inputComponent: PhoneFormatCustom,
              }}
            />
          )}
        />
      )}
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
            Selanjutnya
          </Div>
        </Button>
      </Div>
    </Div>
  );
};

export default FamilyInformation;
