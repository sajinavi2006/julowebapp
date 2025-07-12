import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useApplicationContext } from '../providers/ApplicationProvider';
import ApplicationLayout from '../components/ApplicationLayout';
import Input from 'components/Input';
import PhoneFormatCustom from 'components/forms/phone-format-custom';
import SelectOption from 'components/SelectOption';
import InputAutocomplete from 'components/InputAutocomplete';

import useGlobalState from 'actions';
import { Button } from 'assets/css/styled';
import { schemaJobAndEducation } from '../validator';
import { Row, Col, Div } from 'assets/css/styled';
import DatePicker from 'components/DatePicker';
import Analytics from 'utils/Analytics';
import { useCheckApplicationField } from 'pages/commons/Applications/hooks';
import { getPartnershipDropdowns } from 'services/partner/common/partnership';

const JobAndEducation = ({ isReview }) => {
  const { dropdownLists, setLongFormData, longFormData, isLoaded } =
    useApplicationContext();

  const { isFieldDisabled, isFieldHidden } = useCheckApplicationField();

  const {
    handleSubmit,
    setValue,
    reset,
    control,
    getValues,
    trigger,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schemaJobAndEducation),
    //mode 'all' to validate error onChange and onSubmit
    mode: 'all',
  });

  const { dirtyFields } = useFormState({
    control,
  });
  const [filteredProfessionsDropdown, setFilteredProfessionsDropdown] =
    useState([]);

  const [professionDropdown, setProfessionDropdown] = useState([]);

  const { partner } = useParams();
  const history = useHistory();

  const jobTypeValue = useWatch({
    control,
    name: 'job_type',
  });

  const jobIndustryValue = useWatch({
    control,
    name: 'job_industry',
  });

  const isHideCompanyFields =
    jobTypeValue === 'Staf rumah tangga' ||
    jobTypeValue === 'Ibu rumah tangga' ||
    jobTypeValue === 'Tidak bekerja' ||
    jobTypeValue === 'Mahasiswa' ||
    !jobTypeValue;

  const [, actions] = useGlobalState();
  useEffect(() => {
    actions.closeLoadingOverlay();
  }, []);

  useEffect(() => {
    const allJobs = dropdownLists?.allJobs || {};
    if (jobIndustryValue && allJobs.jobs) {
      const filteredProfessions = allJobs.jobs.filter(
        (el) => el.jobIndustries === jobIndustryValue,
      );

      setFilteredProfessionsDropdown(filteredProfessions);
    }
  }, [jobIndustryValue, dropdownLists]);

  useEffect(() => {
    if (isLoaded) {
      // SET DEFAULT VALUE FROM LONGFROM CONTEXT
      reset({ ...longFormData });
    }
  }, [longFormData, isLoaded]);

  useEffect(() => {
    // to resolved company name wont set value
    if (!isHideCompanyFields && longFormData.company_name) {
      setValue('company_name', longFormData.company_name, {
        shouldValidate: !!longFormData.company_name,
      });
    }
  }, [isHideCompanyFields, longFormData]);

  const onSubmit = (data) => {
    Analytics.logEvent({
      title: 'job_info_form',
      eventName: 'job_info_continue_click',
    });
    let payload = data;
    if (isHideCompanyFields) {
      payload = {
        job_type: data.job_type,
        last_education: data.last_education,
        job_industry: data.job_industry ? data.job_industry : undefined,
        profession: undefined,
        company_name: undefined,
        company_phone_number: undefined,
        job_start: undefined,
        payday: undefined,
      };
    }

    setLongFormData(payload);
    history.push(`/${partner}/application/financial`);
  };

  const handleGetProfessionDropdown = async (jobIndustry) => {
    try {
      const response = await getPartnershipDropdowns({
        job_industry: jobIndustry,
        data_selected: 'jobs',
      });
      setProfessionDropdown(response?.data ?? []);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const onError = (error) => {
    // eslint-disable-next-line no-console
    console.log({ error });
  };

  return (
    <ApplicationLayout
      isShowHeader={!isReview}
      title={'Informasi Pekerjaan'}
      step={3}
    >
      <Controller
        control={control}
        name='job_type'
        render={({ field: { onChange, value, name }, fieldState: { error } }) =>
          !isFieldHidden(name) && (
            <SelectOption
              name={name}
              disabled={isReview || isFieldDisabled(name)}
              options={dropdownLists?.job_types ?? []}
              label='Tipe Pekerjaan'
              value={value}
              onChange={(e) => {
                onChange(e);
                // reset company fields on change
                setValue('profession', '', {
                  shouldValidate: dirtyFields.profession,
                });
                setValue('job_industry', '', {
                  shouldValidate: dirtyFields.job_industry,
                });

                if (e.target.value === 'Staf rumah tangga') {
                  setValue('job_industry', 'Staf Rumah tangga', {
                    shouldValidate: true,
                  });
                } else {
                  if (getValues('company_phone_number')) {
                    trigger('company_phone_number');
                  }
                }
              }}
              errorMessage={error?.message}
            />
          )
        }
      />

      {(!isHideCompanyFields || jobTypeValue === 'Staf rumah tangga') && (
        <Controller
          control={control}
          name='job_industry'
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) =>
            !isFieldHidden(name) && (
              <SelectOption
                name={name}
                disabled={
                  jobTypeValue === 'Staf rumah tangga' ||
                  isReview ||
                  isFieldDisabled(name)
                }
                options={
                  partner === 'linkaja'
                    ? dropdownLists?.job_industries
                    : dropdownLists?.allJobs?.removedDuplicateJobs ?? []
                }
                renderOptions={
                  partner === 'linkaja'
                    ? false
                    : (option) => option.jobIndustries
                }
                label='Bidang Pekerjaan'
                value={value}
                onChange={(e) => {
                  onChange(e);
                  if (partner === 'linkaja') {
                    handleGetProfessionDropdown(e.target.value);
                  }
                  setValue('profession', '', {
                    shouldValidate: dirtyFields.profession,
                  });
                }}
                errorMessage={error?.message}
              />
            )
          }
        />
      )}

      {!isHideCompanyFields && (
        <Fragment>
          <Controller
            control={control}
            name='profession'
            render={({
              field: { onChange, value, name },
              fieldState: { error },
            }) =>
              !isFieldHidden(name) && (
                <SelectOption
                  name={name}
                  disabled={isReview || isFieldDisabled(name)}
                  options={
                    partner === 'linkaja'
                      ? professionDropdown
                      : filteredProfessionsDropdown ?? []
                  }
                  renderOptions={
                    partner === 'linkaja'
                      ? false
                      : (option) => option.professions
                  }
                  label='Pekerjaan'
                  value={value}
                  onChange={onChange}
                  errorMessage={error?.message}
                />
              )
            }
          />

          <Controller
            control={control}
            name='company_name'
            render={({
              field: { onChange, value, name },
              fieldState: { error },
            }) =>
              !isFieldHidden(name) && (
                <InputAutocomplete
                  name={name}
                  disabled={isReview || isFieldDisabled(name)}
                  options={dropdownLists?.companies ?? []}
                  label='Nama Perusahaan'
                  allowInput={true}
                  value={value}
                  onChange={onChange}
                  errorMessage={error?.message}
                />
              )
            }
          />

          <Controller
            control={control}
            name='company_phone_number'
            render={({
              field: { onChange, value, name },
              fieldState: { error },
            }) =>
              !isFieldHidden(name) && (
                <Input
                  errorMessage={error?.message}
                  disabled={isReview || isFieldDisabled(name)}
                  name={name}
                  placeholder='021xxxxxxxx'
                  label='Nomor Telepon Perusahaan'
                  value={value}
                  onChange={onChange}
                  inputPropsMui={{
                    inputComponent: PhoneFormatCustom,
                  }}
                />
              )
            }
          />

          <Row>
            <Col md='6' xs='12'>
              <Controller
                control={control}
                name='job_start'
                defaultValue='1990-01-01'
                render={({
                  field: { onChange, value, name },
                  fieldState: { error },
                }) =>
                  !isFieldHidden(name) && (
                    <DatePicker
                      disabled={isReview || isFieldDisabled(name)}
                      config={{
                        label: 'Mulai Pekerjaan',
                        maxDate: new Date(),
                      }}
                      errorMessage={error?.message}
                      date={value}
                      name={name}
                      onChange={onChange}
                    />
                  )
                }
              />
            </Col>

            <Col md='6' xs='12'>
              <Controller
                control={control}
                name='payday'
                render={({
                  field: { onChange, value, name },
                  fieldState: { error },
                }) =>
                  !isFieldHidden(name) && (
                    <SelectOption
                      disabled={isReview || isFieldDisabled(name)}
                      name={name}
                      options={[...Array(31).keys()].map((i) => i + 1)}
                      label='Tanggal Gajian'
                      value={value}
                      onChange={onChange}
                      errorMessage={error?.message}
                    />
                  )
                }
              />
            </Col>
          </Row>
        </Fragment>
      )}

      {getValues('job_type') && (
        <Controller
          control={control}
          name='last_education'
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) =>
            !isFieldHidden(name) && (
              <SelectOption
                name={name}
                disabled={isReview || isFieldDisabled(name)}
                options={dropdownLists?.last_educations ?? []}
                label='Pendidikan Terakhir'
                value={value}
                onChange={onChange}
                errorMessage={error?.message}
              />
            )
          }
        />
      )}

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

JobAndEducation.propTypes = {
  isReview: PropTypes.bool,
};

export default JobAndEducation;
