import { useRef } from 'react';

import { PinInput } from 'new-components/elements';
import { useFormContext } from 'hooks/react-hook-form';
import { useAgentAssistedNavigation } from 'pages/webview/AgentAssisted/hooks';

import { Header } from '../../components';
import { CreatePinParam } from '../../types';
import { useHandleVerifyPin } from './usecase';
import { PIN_LENGTH } from '../../constants';

const NewPin = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const form = useFormContext<CreatePinParam>();
  const { handleSubmit } = form;

  const { goTo } = useAgentAssistedNavigation();
  const { onVerifyPin, isVerifyingPin } = useHandleVerifyPin({ form, formRef });

  return (
    <>
      <Header onBack={() => goTo('home')} />
      <form onSubmit={handleSubmit(onVerifyPin)} ref={formRef}>
        <PinInput
          name='pin'
          className='pin-input'
          isInputNum
          shouldAutoFocus
          label='Buat PIN Baru'
          numInputs={PIN_LENGTH}
          helperText='Pastikan kamu mengingat PIN ini dan merahasiakannya dari siapa pun'
          isDisabled={isVerifyingPin}
        />
      </form>
    </>
  );
};

export default NewPin;
