import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useApplicationContext } from '../providers/ApplicationProvider';
import ApplicationLayout from '../components/ApplicationLayout';
import Input from 'components/Input';
import PhoneFormatCustom from 'components/forms/phone-format-custom';
import SelectOption from 'components/SelectOption';
import useGlobalState from 'actions';
import { Button, Div } from 'assets/css/styled';
import { Subtitle } from '../styles';
import { schemaFamilyInformation } from '../validator';
import Analytics from 'utils/Analytics';
import { useCheckApplicationField } from 'pages/commons/Applications/hooks';

const FamilyInformation = ({ isReview }) => {
  const { dropdownLists, setLongFormData, longFormData, isLoaded } =
    useApplicationContext();

  const { isFieldDisabled, isFieldHidden } = useCheckApplicationField();

  const {
    handleSubmit,
    reset,
    control,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schemaFamilyInformation),
    // context is using on yup schema object
    context: {
      close_kin_name: longFormData?.marital_status !== 'Menikah',
      spouse_name: longFormData?.marital_status === 'Menikah',
      mobile_phone_1: longFormData?.mobile_phone_1,
      mobile_phone_2: longFormData?.mobile_phone_2,
    },
    //mode 'all' to validate error onChange and onSubmit
    mode: 'all',
    shouldUnregister: true,
  });

  const { partner } = useParams();
  const history = useHistory();

  const [, actions] = useGlobalState();

  const closeKinFieldName =
    longFormData?.marital_status === 'Menikah'
      ? 'spouse_mobile_phone'
      : 'close_kin_mobile_phone';

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
      title: 'family_info_form',
      eventName: 'family_info_continue_click',
    });
    setLongFormData(data);
    history.push(`/${partner}/application/job_and_education`);
  };

  const onError = (error) => {
    // eslint-disable-next-line no-console
    console.log({ error });
  };

  return (
    <ApplicationLayout
      isShowHeader={!isReview}
      title={'Informasi Keluarga'}
      step={2}
    >
      <Controller
        control={control}
        name={
          longFormData?.marital_status === 'Menikah'
            ? 'spouse_name'
            : 'close_kin_name'
        }
        render={({ field: { onChange, value, name }, fieldState: { error } }) =>
          !isFieldHidden(name) && (
            <Input
              errorMessage={error?.message}
              name={name}
              disabled={isReview || isFieldDisabled(name)}
              label={
                longFormData?.marital_status === 'Menikah'
                  ? 'Nama Pasangan'
                  : 'Nama Orang Tua'
              }
              value={value}
              onChange={onChange}
            />
          )
        }
      />

      <Controller
        control={control}
        name={closeKinFieldName}
        render={({ field: { onChange, value, name }, fieldState: { error } }) =>
          !isFieldHidden(name) && (
            <Input
              errorMessage={error?.message}
              name={name}
              disabled={isReview || isFieldDisabled(name)}
              placeholder='08xxxxxxxxx'
              label={
                longFormData?.marital_status === 'Menikah'
                  ? 'Nomor HP Pasangan'
                  : 'Nomor HP Orang Tua'
              }
              value={value}
              onChange={onChange}
              inputPropsMui={{
                inputComponent: PhoneFormatCustom,
              }}
            />
          )
        }
      />

      <Subtitle>Informasi Keluarga Kandung</Subtitle>

      <Controller
        control={control}
        name='kin_relationship'
        render={({ field: { onChange, value, name }, fieldState: { error } }) =>
          !isFieldHidden(name) && (
            <SelectOption
              name={name}
              disabled={isReview || isFieldDisabled(name)}
              options={dropdownLists?.kin_relationships ?? []}
              label='Hubungan'
              value={value}
              onChange={onChange}
              errorMessage={error?.message}
            />
          )
        }
      />

      <Controller
        control={control}
        name='kin_name'
        render={({ field: { onChange, value, name }, fieldState: { error } }) =>
          !isFieldHidden(name) && (
            <Input
              errorMessage={error?.message}
              disabled={isReview || isFieldDisabled(name)}
              name={name}
              label='Nama Keluarga Kandung'
              value={value}
              onChange={onChange}
            />
          )
        }
      />
      <Controller
        control={control}
        name='kin_mobile_phone'
        render={({ field: { onChange, value, name }, fieldState: { error } }) =>
          !isFieldHidden(name) && (
            <Input
              errorMessage={error?.message}
              disabled={isReview || isFieldDisabled(name)}
              name={name}
              placeholder='08xxxxxxxxx'
              label='Nomor HP Keluarga Kandung'
              value={value}
              onChange={onChange}
              inputPropsMui={{
                inputComponent: PhoneFormatCustom,
              }}
            />
          )
        }
      />

      {!isReview && (
        <Button disabled={!isValid} fluid>
          <Div width='100%' onClick={handleSubmit(onSubmit, onError)}>
            Lanjut
          </Div>
        </Button>
      )}
    </ApplicationLayout>
  );
};

FamilyInformation.propTypes = {
  isReview: PropTypes.bool,
};

export default FamilyInformation;
