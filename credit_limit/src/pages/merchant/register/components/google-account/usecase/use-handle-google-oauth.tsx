import { useCallback } from 'react';

import useMemoArgFunction from 'hooks/use-memo-arg-function';

import { GoogleProfile } from '../components';
import { INTERNAL_DOMAINS } from '../constants';

interface UseHandleGoogleOauthOptions {
  onChooseInternalEmail: (profile: GoogleProfile) => void;
  onChooseExternalEmail: (profile: GoogleProfile) => void;
}

function useHandleGoogleOauth(options: UseHandleGoogleOauthOptions) {
  const {
    onChooseExternalEmail: _onChooseExternalEmail,
    onChooseInternalEmail: _onChooseInternalEmail,
  } = options;

  const onChooseExternalEmail = useMemoArgFunction(_onChooseExternalEmail);
  const onChooseInternalEmail = useMemoArgFunction(_onChooseInternalEmail);

  const handleOnSuccessGoogleOAuth = useCallback(
    (profile: GoogleProfile) => {
      const email = profile.email;

      const domain = email.split('@')[1].split('.')[0];

      if (
        !INTERNAL_DOMAINS.some((internalDomain) => internalDomain === domain)
      ) {
        return onChooseExternalEmail.current(profile);
      }

      onChooseInternalEmail.current(profile);
    },
    [onChooseExternalEmail, onChooseInternalEmail],
  );

  return { handleOnSuccessGoogleOAuth };
}

export default useHandleGoogleOauth;
