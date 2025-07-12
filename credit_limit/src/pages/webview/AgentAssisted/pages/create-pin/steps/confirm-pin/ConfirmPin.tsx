import { useRef } from 'react';

import { useFormContext } from 'hooks/react-hook-form';
import { PinInput } from 'new-components/elements';

import { Header } from '../../components';
import { PIN_LENGTH } from '../../constants';
import { useCreatePinStep } from '../../hooks';
import type { CreatePinParam } from '../../types';
import { useHandleSubmitPin } from './usecase';

const ConfirmPin = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const form = useFormContext<CreatePinParam>();
  const { handleSubmit, reset } = form;

  const { onSubmitPin, isSubmittingPin, isConfirmPinMatched } =
    useHandleSubmitPin({
      form,
      formRef,
    });
  const { prevStep } = useCreatePinStep();

  return (
    <>
      <Header onBack={() => prevStep(reset)} />
      <form onSubmit={handleSubmit(onSubmitPin)} ref={formRef}>
        <PinInput
          name='confirmPin'
          className='pin-input'
          isInputNum
          shouldAutoFocus
          label={
            isConfirmPinMatched ? 'Konfirmasi PIN Baru' : 'Ketik Ulang PIN Kamu'
          }
          numInputs={PIN_LENGTH}
          isDisabled={isSubmittingPin}
        />
      </form>
    </>
  );
};

export default ConfirmPin;
