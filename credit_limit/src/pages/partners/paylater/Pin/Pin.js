import React, { useState, useEffect } from 'react';
import { useHistory, withRouter, useLocation } from 'react-router-dom';

import Page from 'components/Page';
import PinInput from 'components/forms/PinInput';

import utils from 'utils';
import useGlobalState from 'actions';

import { checkPinWeakness } from 'services/auth';
import { register, scrapData } from 'services/auth';

import { pinStyle } from './styles';
import Analytics from 'utils/Analytics/Analytics';
import { useUserContext } from 'providers/UserProvider';

import { Div } from 'assets/css/styled';
import { text } from 'assets/css/stylesValue';

function Pin() {
  const [state, actions] = useGlobalState();
  const { datas, setDatas, handleNotification } = useUserContext();
  const history = useHistory();
  const { search } = useLocation();
  const pinCount = 6;
  const [pinFirst, setFirstPIN] = useState('');
  const [pinSecond, setSecondPIN] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const nik = utils.store.get('nik');

  const reTypePin = async (value) => {
    actions.setState('pinError', null);
    if (pinFirst.length <= pinCount) {
      setFirstPIN(value);
    }

    if (value.length === pinCount) {
      actions.openLoadingOverlay();
      try {
        const payload = {
          nik,
          pin: value,
        };
        const response = await checkPinWeakness(payload);

        if (response?.data === 'Strong password') {
          actions.setState('isFirstPin', true);
          actions.setState('isReEnterPin', true);
          const input = document.querySelector('input');
          input.focus();

          setIsLoading(false);
          actions.closeLoadingOverlay();
        } else {
          actions.setState('pinError', response?.errors[0]);

          actions.closeLoadingOverlay();
        }
      } catch (error) {
        if (error) {
          actions.closeLoadingOverlay();
          const errorData = error.response.data || {};
          const errMessage = errorData.errors;
          actions.setState(
            'pinError',
            errMessage.length > 0 ? errMessage[0] : error.message
          );
        }
      }
    }
  };

  const handleRegister = async () => {
    const pin = utils.store.get('pin');

    try {
      actions.openLoadingOverlay();
      const payload = {
        username: nik,
        web_version: state.webVersion,
        pin: pin,
        email: utils.store.get('email'),
        latitude: utils.store.get('latitude'),
        longitude: utils.store.get('longitude'),
        partner_name: 'vospay',
      };

      const response = await register(payload);

      if (response?.data?.errors?.length > 0) {
        handleNotification({
          isOpen: true,
          message: response?.errors[0],
        });
      } else {
        const browserVersion = navigator.appVersion.split(' ');
        const paramsScrapData = {
          data_trigger_location: 'user_register',
          application_id: response?.data?.applications?.[0]?.id,
          browser_name: navigator?.appCodeName,
          browser_version: `${browserVersion[0]} ${browserVersion[1]}`,
          platform_type: navigator?.userAgentData?.mobile
            ? 'mobile'
            : navigator?.platform,
          engine_name: navigator?.appName,
          engine_version: null,
          device_model: null,
          os_name: navigator?.oscpu || null,
          os_version: null,
          os_version_name: null,
          bot: {},
        };
        await scrapData({
          payload: paramsScrapData,
          token: response.data.token,
        });
        utils.store.set({
          token: response?.data?.token,
          password: pin,
          appStatus: response?.data?.applications[0].status,
          applicationId: response?.data?.applications[0].id,
          customerId: response?.data?.customer?.id,
        });
        setDatas({
          ...datas,
          token: response?.data?.token,
          password: pin,
          appStatus: response?.data?.applications[0].status,
          applicationId: response?.data?.applications[0].id,
          customerId: response?.data?.customer?.id,
        });

        actions.setState('token', response.data.token);

        localStorage.setItem('ktpPhoto', '');
        localStorage.setItem('selfiePhoto', '');

        history.replace(`/paylater/application/personal_identity`);

        actions.closeLoadingOverlay();
      }
    } catch (error) {
      if (error) {
        actions.closeLoadingOverlay();

        const errorData = error.response.data || {};
        const errMessage = errorData.errors?.[0];
        handleNotification({
          isOpen: true,
          message: errMessage,
        });
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
        utils.store.set('pin', pinFirst);
        actions.setState('pin', pinFirst);

        Analytics.logEvent({
          title: 'tnc_screen',
          eventName: 'agree_button_clicked',
        });
        const latitude = utils.store.get('latitude');
        const longitude = utils.store.get('longitude');
        if (latitude && longitude) {
          return handleRegister();
        }
        utils.commons.askLocationAccess(
          async (allow) => {
            // if allow
            utils.store.set('latitude', allow.coords.latitude);
            utils.store.set('longitude', allow.coords.longitude);
            handleRegister();
          },
          () => {
            // if block
            handleNotification({
              isOpen: true,
              message: 'Mohon aktifkan permintaan akses lokasi',
            });
          }
        );
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
    input.focus();
  };
  useEffect(() => {
    if (!nik) {
      history.push(`signup${search}`);
    }
    clearForm();
  }, []);

  return (
    <Page useHeader>
      <Div className='authentication-body container-fluid'>
        <Div className='row'>
          <Div className='col-12 registration-title justify-content-center'>
            <span
              className={`${text({
                size: 22,
                weight: '500',
              })}`}
            >
              Buat PIN JULO
            </span>
          </Div>
        </Div>
        <Div className='row d-flex justify-content-center'>
          <Div className='col-md-4 col-lg-3'>
            <Div className='auth-form-wrapper position-relative'>
              {!state.isFirstPin ? (
                <h5 className='text-center mb-3'>Ketik PIN Baru</h5>
              ) : (
                <h5 className='text-center mb-3'>Ketik Ulang PIN Baru</h5>
              )}
              <Div className='form-group'>
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
              </Div>
              <Div className='form-group text-center'>
                {state.pinError ? (
                  <span className='d-block pin-error-txt'>
                    {state.pinError}
                  </span>
                ) : !state.isFirstPin ? (
                  <span className='d-block'>
                    Pastikan kamu mengingat PIN ini dan merahasiakannya dari
                    siapa pun
                  </span>
                ) : null}
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
    </Page>
  );
}

export default withRouter(Pin);
