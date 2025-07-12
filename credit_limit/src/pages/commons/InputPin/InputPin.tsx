import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import OtpInput from 'react-otp-input';

import useGlobalState from 'actions';
import { inputPin } from 'services/pin';
import Page from 'components/Page';
import back from 'assets/img/icon/ic-back-2.svg';
import { justifyCenter } from 'assets/css/stylesFix';

import { inputPinCx, inputStyle } from './styles';

function InputPin() {
  const [state, actions] = useGlobalState();
  const { xid } = useParams<{ xid: string }>();
  const pinCount = 6;
  const [pinFirst, setFirstPIN] = useState('');

  const verifyPin = async (value: string) => {
    actions.setState('pinError', null);
    if (pinFirst.length <= pinCount) {
      setFirstPIN(value);
    }

    if (value.length === pinCount) {
      actions.openLoadingOverlay();
      try {
        const payload = {
          xid: xid,
          pin: value,
        };
        const response = await inputPin(payload);

        if (response?.success) {
          window.location.href = response?.data?.redirect_url;
        } else {
          actions.setState('pinError', response?.errors[0]);

          actions.closeLoadingOverlay();
        }
      } catch (error) {
        if (error) {
          actions.closeLoadingOverlay();
          actions.setState(
            'pinError',
            (error as AxiosError)?.response?.data?.errors?.length > 0
              ? (error as AxiosError)?.response?.data?.errors[0]
              : (error as Error).message,
          );
        }
      }
    }
  };

  const goBack = () => {
    window.history.back();
  };
  const clearForm = () => {
    actions.setState('pinError', null);
    const input = document.querySelector('input');

    if (input) {
      input.focus();
      input.setAttribute('autoComplete', 'off');
    }
  };
  useEffect(() => {
    clearForm();
    actions.closeLoadingOverlay();
    setFirstPIN('');
  }, []);

  return (
    <Page className={inputPinCx}>
      <div className='g-pin-body-white container-fluid'>
        <div className='row'>
          <div className='col-12 g-pin-title'>
            <a onClick={() => goBack()} className='g-back-trigger'>
              <img src={back} alt='' />
            </a>
            <span className='g-pin-title__txt'>Verifikasi</span>
          </div>
        </div>
        <div className='row d-flex justify-content-center'>
          <div className='col-md-4 col-lg-3'>
            <div className='g-auth-form-wrapper position-relative'>
              <h5 className='text-center mb-3'>Ketik PIN</h5>
              <div className='form-group'>
                <OtpInput
                  numInputs={pinCount}
                  value={pinFirst}
                  isInputNum
                  isInputSecure
                  onChange={verifyPin}
                  shouldAutoFocus
                  inputStyle={`${inputStyle}`}
                  containerStyle={`d-flex ${justifyCenter} w-100`}
                />
              </div>
              <div className='form-group text-center'>
                {state.pinError ? (
                  <span className='d-block g-pin-error-txt'>
                    {state.pinError}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default InputPin;
