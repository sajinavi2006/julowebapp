import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useApplicationContext } from '../providers/ApplicationProvider';
import ApplicationLayout from '../components/ApplicationLayout';
import Input from 'components/Input';
import NumberFormatCustom from 'components/forms/number-format-custom';
import NumberFormat from 'components/forms/NumberFormat';

import SelectOption from 'components/SelectOption';
import useGlobalState from 'actions';
import { Button, Div } from 'assets/css/styled';
import { Subtitle } from '../styles';
import { schemaFinancialValidation } from '../validator';
import ProofOfIncome from '../components/ProofOfIncome';
import Analytics from 'utils/Analytics';
import { useCheckApplicationField } from 'pages/commons/Applications/hooks';

const Financial = ({ isReview }) => {
  const { dropdownLists, setLongFormData, longFormData, isLoaded } =
    useApplicationContext();

  const { isFieldDisabled, isFieldHidden } = useCheckApplicationField();

  const {
    handleSubmit,
    reset,
    control,
    formState: { isValid },
    getValues,
  } = useForm({
    resolver: yupResolver(schemaFinancialValidation),

    //mode 'all' to validate error onChange and onSubmit
    mode: 'all',
    shouldUnregister: true,
  });
  const { partner } = useParams();
  const history = useHistory();

  const [, actions] = useGlobalState();

  useEffect(() => {
    actions.closeLoadingOverlay();
  }, []);

  useEffect(() => {
    if (isLoaded && longFormData) {
      // SET DEFAULT VALUE FROM LONGFROM CONTEXT
      reset({ ...longFormData });
    }
  }, [longFormData, isLoaded]);

  const onSubmit = (data) => {
    Analytics.logEvent({
      title: 'financial_info_form',
      eventName: 'financial_info_review',
    });

    if (data.referral_code) {
      Analytics.logEvent({
        title: 'financial_info_form',
        eventName: 'referral_code_text_value',
      });
    }

    setLongFormData(data);
    history.push(`/${partner}/application/review`);
  };

  const onError = (error) => {
    // eslint-disable-next-line no-console
    console.log({ error });
  };

  return (
    <ApplicationLayout
      isShowHeader={!isReview}
      title={'Informasi Keuangan'}
      step={4}
    >
      <Subtitle>Penghasilan & Pengeluaran</Subtitle>

      <Controller
        control={control}
        name='monthly_income'
        render={({ field: { onChange, value, name }, fieldState: { error } }) =>
          !isFieldHidden(name) && (
            <Input
              name={name}
              disabled={isReview || isFieldDisabled(name)}
              label='Total Penghasilan per Bulan'
              value={value}
              onChange={onChange}
              errorMessage={error?.message}
              inputProps={{ maxLength: 20 }}
              inputPropsMui={{
                startAdornment: <span style={{ marginRight: '10px' }}>Rp</span>,
                inputComponent: NumberFormatCustom,
              }}
            />
          )
        }
      />

      <Controller
        control={control}
        name='monthly_expenses'
        render={({ field: { onChange, value, name }, fieldState: { error } }) =>
          !isFieldHidden(name) && (
            <Input
              name={name}
              disabled={isReview || isFieldDisabled(name)}
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
          )
        }
      />

      <Controller
        control={control}
        name='monthly_housing_cost'
        render={({ field: { onChange, value, name }, fieldState: { error } }) =>
          !isFieldHidden(name) && (
            <Input
              name={name}
              disabled={isReview || isFieldDisabled(name)}
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
          )
        }
      />

      <Controller
        control={control}
        name='total_current_debt'
        render={({ field: { onChange, value, name }, fieldState: { error } }) =>
          !isFieldHidden(name) && (
            <Input
              name={name}
              disabled={isReview || isFieldDisabled(name)}
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
          )
        }
      />
      <Subtitle>Informasi Rekening</Subtitle>

      <Controller
        control={control}
        name='bank_name'
        render={({ field: { onChange, value, name }, fieldState: { error } }) =>
          !isFieldHidden(name) && (
            <SelectOption
              name={name}
              disabled={isReview || isFieldDisabled(name)}
              options={dropdownLists?.banks ?? []}
              renderOptions={(option) => option.bank_name}
              renderIcon={(option) => option.bank_logo}
              label='Nama Bank'
              value={value}
              onChange={onChange}
              errorMessage={error?.message}
            />
          )
        }
      />

      <Controller
        control={control}
        name='bank_account_number'
        render={({ field: { onChange, value, name }, fieldState: { error } }) =>
          !isFieldHidden(name) && (
            <Input
              disabled={isReview || isFieldDisabled(name)}
              errorMessage={error?.message}
              name={name}
              label='Nomor Rekening Pribadi'
              inputProps={{ maxLength: 50 }}
              inputPropsMui={{
                inputComponent: NumberFormat,
              }}
              value={value}
              onChange={onChange}
            />
          )
        }
      />

      <Controller
        control={control}
        name='loan_purpose'
        render={({ field: { onChange, value, name }, fieldState: { error } }) =>
          !isFieldHidden(name) && (
            <SelectOption
              disabled={isReview || isFieldDisabled(name)}
              name={name}
              options={dropdownLists?.loan_purposes ?? []}
              label='Tujuan Pinjaman'
              value={value}
              onChange={onChange}
              errorMessage={error?.message}
            />
          )
        }
      />

      <Controller
        control={control}
        name='loan_purpose_desc'
        render={({ field: { onChange, value, name }, fieldState: { error } }) =>
          !isFieldHidden(name) && (
            <Input
              disabled={isReview || isFieldDisabled(name)}
              type='textarea'
              name={name}
              label='Jelaskan Tujuan Pinjaman'
              placeholder='Apa tujuan Anda menggunakan pinjaman ini?'
              value={value}
              onChange={onChange}
              errorMessage={error?.message}
            />
          )
        }
      />

      <Controller
        control={control}
        name='referral_code'
        render={({ field: { onChange, value, name }, fieldState: { error } }) =>
          !isFieldHidden(name) && (
            <Input
              disabled={isReview || isFieldDisabled(name)}
              errorMessage={error?.message}
              name={name}
              label='Kode Referral (Tidak Wajib)'
              value={value}
              inputProps={{ maxLength: 20 }}
              onChange={onChange}
            />
          )
        }
      />
      {!isFieldHidden('bank_scrapping') && (
        <>
          <Subtitle>Bukti Penghasilan</Subtitle>
          <ProofOfIncome
            isReview={isReview}
            onClick={() => {
              setLongFormData(getValues());
            }}
          />
        </>
      )}

      {!isReview && (
        <Button disabled={!isValid} fluid>
          <Div width='100%' onClick={handleSubmit(onSubmit, onError)}>
            Review
          </Div>
        </Button>
      )}
    </ApplicationLayout>
  );
};

Financial.propTypes = {
  isReview: PropTypes.bool,
};

export default Financial;
