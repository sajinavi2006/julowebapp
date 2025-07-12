import { FieldValues } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Global, css } from '@emotion/react';

import { FormProvider, useForm } from 'hooks/react-hook-form';

import {
  OtpProvider,
  SnackbarProvider,
  StepProvider,
  TimerProvider,
  useStep,
} from './hooks';
import {
  applicationScheme,
  ApplicationSteps,
  defaultValues,
} from './constants';
import { Navbar } from './components';
import { applicationCx } from './styles';
import {
  useDeleteAllDocuments,
  useHandleAllowedLongform,
  useHandleStepChanged,
} from './usecase';

const Application = () => {
  const step = useStep({
    totalStep: ApplicationSteps.length,
  });

  const { currentStep } = step;

  const form = useForm<FieldValues>({
    defaultValues: defaultValues[currentStep],
    resolver: yupResolver(applicationScheme),
  });

  const ApplicationStep = ApplicationSteps[currentStep];

  const isLoadingProfileData = useHandleAllowedLongform();

  useHandleStepChanged({
    form,
    currentStep
  });

  useDeleteAllDocuments();

  if (isLoadingProfileData) return null;

  return (
    <div css={applicationCx} className='application-page'>
      <Navbar />
      <StepProvider {...step}>
        <OtpProvider>
          <SnackbarProvider>
            <TimerProvider>
              <FormProvider scrollToFieldOnError {...form}>
                <ApplicationStep />
              </FormProvider>
            </TimerProvider>
          </SnackbarProvider>
        </OtpProvider>
      </StepProvider>
      <Global
        styles={css`
          html {
            font-size: 16px !important;
          }
        `}
      />
    </div>
  );
};

export default Application;
