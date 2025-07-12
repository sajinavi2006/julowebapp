import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import utils from 'utils';
import useGlobalState from 'actions';

import {
  checkPinWeakness,
  createPinPartnership,
} from 'services/partner/common/partnership';

import back from 'assets/img/icon/ic-back.svg';

import Page from 'components/Page';
import PinInput from 'components/forms/PinInput';

import { pinStyle } from './styles';

/**
 * Route: /linkaja/pin
 * Access: Private
 */
const Pin = () => {
  const [state, actions] = useGlobalState();
  const history = useHistory();
  const pinCount = 6;
  const [pinFirst, setFirstPIN] = useState('');
  const [pinSecond, setSecondPIN] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const reTypePin = async (value) => {
    actions.setState('pinError', null);
    if (pinFirst.length <= pinCount) {
      setFirstPIN(value);
    }

    if (value.length === pinCount) {
      actions.openLoadingOverlay();
      try {
        const payload = {
          nik: utils.store.get('nik'),
          pin: value,
        };
        const response = await checkPinWeakness(payload);

        if (response?.data === 'PIN kuat') {
          actions.setState('isFirstPin', true);
          actions.setState('isReEnterPin', true);
          const input = document.querySelector('input');
          input?.focus();

          setIsLoading(false);
          actions.closeLoadingOverlay();
        } else {
          actions.setState('pinError', response?.errors[0]);

          actions.closeLoadingOverlay();
        }
      } catch (error) {
        if (error) {
          actions.closeLoadingOverlay();
          actions.setState(
            'pinError',
            error?.response?.data?.errors?.length > 0
              ? error?.response?.data?.errors[0]
              : error.message,
          );
        }
      }
    }
  };

  const callCreatePin = async (value) => {
    actions.openLoadingOverlay();

    const payload = {
      nik: utils.store.get('nik'),
      pin: value,
    };
    try {
      const response = await createPinPartnership(payload);
      if (response.success) {
        actions.closeLoadingOverlay();
        history.replace(`/linkaja/tnc`);
      }
    } catch (error) {
      if (error) {
        actions.closeLoadingOverlay();
        actions.setState(
          'pinError',
          error?.response?.data?.errors?.length > 0
            ? error?.response?.data?.errors[0]
            : error.message,
        );
      }
    }
  };

  const confirmPin = async (value) => {
    actions.setState('pinError', null);

    if (pinSecond.length <= pinCount) {
      setSecondPIN(value);
    }

    if (value.length === pinCount) {
      if (pinFirst === value) {
        callCreatePin(value);
      } else {
        actions.setState('pinError', 'PIN yang Anda ketik tidak sesuai');
      }
    }
  };

  const clearForm = () => {
    actions.setState('pinError', null);
    setFirstPIN('');
    setSecondPIN('');
    actions.setState('isFirstPin', false);
    actions.setState('isReEnterPin', false);
    const input = document.querySelector('input');
    input?.focus();
  };

  const goBack = () => {
    if (!state.isFirstPin) {
      actions.setState('isFirstPin', false);
      history.goBack();
    } else {
      clearForm();
    }
  };

  useEffect(() => {
    const nik = utils.store.get('nik');
    if (!nik) {
      history.goBack();
    }
    clearForm();
  }, []);

  return (
    <Page useHeader>
      <div className='authentication-body container-fluid'>
        <div className='row'>
          <div className='col-12 bordered-bottom registration-title justify-content-center'>
            <a onClick={() => goBack()} className='back-trigger'>
              <img src={back} alt='' />
            </a>
            <span className='registration-title__txt'>Buat PIN</span>
          </div>
        </div>
        <div className='row d-flex justify-content-center'>
          <div className='col-md-4 col-lg-3'>
            <div className='auth-form-wrapper position-relative'>
              {!state.isFirstPin ? (
                <h5 className='text-center mb-3'>Ketik PIN Baru</h5>
              ) : (
                <h5 className='text-center mb-3'>Ketik Ulang PIN Baru</h5>
              )}
              <div className='form-group'>
                {!state.isFirstPin ? (
                  <PinInput
                    disabled={isLoading}
                    numInputs={pinCount}
                    value={pinFirst}
                    isInputSecure={true}
                    onChange={reTypePin}
                    shouldAutoFocus={true}
                    style={`otp-input`}
                    containerStyle={`otp-container ${pinStyle(pinFirst)}`}
                  />
                ) : state.isReEnterPin ? (
                  <PinInput
                    disabled={isLoading}
                    numInputs={pinCount}
                    onChange={confirmPin}
                    value={pinSecond}
                    isInputSecure={true}
                    style={'otp-input'}
                    containerStyle={`otp-container ${pinStyle(pinSecond)}`}
                  />
                ) : null}
              </div>
              <div className='form-group text-center'>
                {state.pinError ? (
                  <span className='d-block pin-error-txt'>
                    {state.pinError}
                  </span>
                ) : !state.isFirstPin ? (
                  <span className='d-block'>
                    Pastikan Anda mengingat PIN ini dan merahasiakannya dari
                    siapapun
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Pin;
