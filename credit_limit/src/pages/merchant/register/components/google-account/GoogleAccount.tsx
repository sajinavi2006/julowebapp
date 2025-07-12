import { GoogleOAuthProvider } from '@react-oauth/google';

import callAllFn from '@julofinance/web-helpers/dist/fn/callAllFn';
import _noop from '@julofinance/web-helpers/dist/fn/noop';

import { useFormContext } from 'hooks/react-hook-form';
import { GOOGLE_CLIENT_ID } from 'constants/config';

import useHandleOverlay from './usecase/use-handle-overlay';
import useHandleChangeEmailDialog from './usecase/use-handle-change-email-dialog';
import useHandleGoogleOauth from './usecase/use-handle-google-oauth';

import { GoogleButton, ChangeEmailDialog } from './components';
import { GoogleProps } from './types';

const GoogleAccount = (props: GoogleProps) => {
  const {
    render,
    onSuccess = _noop,
    onSuccessGoogleLogin = _noop,
    onErrorGoogleLogin = _noop,
    onCancelGoogleLogin = _noop,
  } = props;

  const form = useFormContext();
  const { setValue, getValues, unregister } = form;

  const overlay = useHandleOverlay();
  const changeEmailDialog = useHandleChangeEmailDialog({
    onOk: callAllFn(overlay.onClose, onSuccess, () => {
      setValue('email', getValues('tempEmail'), { shouldValidate: true });
      unregister('tempEmail');
    }),
  });

  const { handleOnSuccessGoogleOAuth } = useHandleGoogleOauth({
    onChooseExternalEmail: (profile) => {
      setValue('email', profile.email, { shouldValidate: true });
      overlay.onClose();
      onSuccess(profile);
    },
    onChooseInternalEmail: (profile) => {
      setValue('tempEmail', profile.email);
      changeEmailDialog.onOpen();
    },
  });

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleButton
        render={render}
        onClick={overlay.onOpen}
        onSuccess={handleOnSuccessGoogleOAuth}
        onSuccessLogin={onSuccessGoogleLogin}
        onErrorLogin={callAllFn(overlay.onClose, onErrorGoogleLogin)}
        onCancelLogin={callAllFn(overlay.onClose, onCancelGoogleLogin)}
      />
      <ChangeEmailDialog
        open={changeEmailDialog.isOpen}
        onOk={changeEmailDialog.onOk}
        onCancel={callAllFn(changeEmailDialog.onCancel, overlay.onClose)}
      />
      {overlay.isOpen ? <div className='overlay' /> : null}
    </GoogleOAuthProvider>
  );
};

export default GoogleAccount;
