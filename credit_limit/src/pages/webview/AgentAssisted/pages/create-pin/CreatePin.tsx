import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormProvider, useForm } from 'hooks/react-hook-form';

import { createPinScheme, createPinSteps } from './constants';
import { createPinCx } from './styles';
import { CreatePinParam } from './types';
import { CreatePinStepProvider } from './hooks';

const CreatePin = () => {
  const [step, setStep] = useState<number>(0);

  const form = useForm<CreatePinParam>({
    defaultValues: {
      pin: '',
      confirmPin: '',
    },
    resolver: yupResolver(createPinScheme),
  });

  const CreatePinStep = createPinSteps[step];

  return (
    <FormProvider {...form}>
      <CreatePinStepProvider step={step} setStep={setStep}>
        <div css={createPinCx} className='create-pin'>
          <CreatePinStep />
        </div>
      </CreatePinStepProvider>
    </FormProvider>
  );
};

export default CreatePin;
