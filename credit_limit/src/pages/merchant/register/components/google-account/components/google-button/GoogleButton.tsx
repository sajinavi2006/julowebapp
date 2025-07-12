import { useGoogleLogin, TokenResponse } from '@react-oauth/google';

import callAllFn from '@julofinance/web-helpers/dist/fn/callAllFn';
import _noop from '@julofinance/web-helpers/dist/fn/noop';

import { fetch } from 'utils/react-query';
import { Button } from 'new-components/elements';
import { GoogleButtonProps, GoogleProfile } from './types';

import google from 'assets/img/ic-google.svg';

const GoogleButton = (props: GoogleButtonProps) => {
  const {
    onClick,
    onSuccessLogin = _noop,
    onSuccess = _noop,
    onErrorLogin = _noop,
    onCancelLogin = _noop,
    onError = _noop,
    render,
    ...resProps
  } = props;

  const login = useGoogleLogin({
    onSuccess: callAllFn(
      onSuccessLogin,
      async (
        tokenResponse: Omit<
          TokenResponse,
          'error' | 'error_description' | 'error_uri'
        >,
      ) => {
        try {
          const res = await fetch(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            {
              headers: {
                Authorization: `${tokenResponse.token_type} ${tokenResponse.access_token}`,
              },
            },
          );
          if (res.ok) {
            const userInfo = (await res.json()) as GoogleProfile;
            return onSuccess(userInfo);
          }

          onError(res.statusText);
        } catch (error) {
          onError(error);
        }
      },
    ),
    onError: onErrorLogin,
    onNonOAuthError: onCancelLogin,
  });

  return render ? (
    <>{render({ onClick: callAllFn(login, onClick) })}</>
  ) : (
    <Button
      className='google-btn'
      variant='secondary'
      onClick={callAllFn(login, onClick)}
      {...resProps}
    >
      <img src={google} className='google-icon' />
      <div>Daftar dengan Google</div>
    </Button>
  );
};

export default GoogleButton;
