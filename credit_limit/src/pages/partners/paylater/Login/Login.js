import { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';

import logo from 'assets/img/logo-vertical.svg';
import ojk from 'assets/img/OJK.svg';
import lock from 'assets/img/icon/ic-locked_form.svg';
import envelope from 'assets/img/icon/ic-envelope.svg';

import utils from 'utils';
import Analytics from 'utils/Analytics/Analytics';
import useGlobalState from 'actions';
import { useUserContext } from 'providers/UserProvider';

import Page from 'components/Page';
import ButtonForm from 'components/forms/ButtonForm';
import TextInput from 'components/forms/TextInput';
import DialogInfo from 'components/Dialog/DialogInfo';

import { login, scrapData } from 'services/auth';
import { DIALOG_INVALID_TOKEN } from 'constant';

const Login = () => {
  const { partner } = useParams();
  const history = useHistory();
  const { datas, setDatas, handleNotification } = useUserContext();
  const [state, actions] = useGlobalState();
  const [showDialogInvalidToken, setShowDialogInvalidToken] = useState(false);

  const getLocation = () => {
    utils.commons.askLocationAccess(
      (allow) => {
        // if allow
        utils.store.set('latitude', allow.coords.latitude);
        utils.store.set('longitude', allow.coords.longitude);
      },
      () => {
        // if block
        handleNotification({
          isOpen: true,
          message:
            'Mohon ijinkan akses lokasi untuk dapat mengakses website JULO',
        });
      },
    );
  };

  const permissionGeolocation = () => {
    if (navigator.permissions && navigator.permissions?.query) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state == 'granted' || result.state == 'prompt') {
          getLocation();
        } else if (result.state == 'denied') {
          // if block
          handleNotification({
            isOpen: true,
            message:
              'Mohon ijinkan akses lokasi untuk dapat mengakses website JULO',
          });
        }
        result.onchange = function () {
          if (result.state == 'granted') {
            Analytics.logEvent({
              title: 'sign_in',
              eventName: 'location_permission_granted',
            });
          }
        };
      });
    } else if (navigator.geolocation) {
      getLocation();
    }
  };

  const loginAccount = async () => {
    localStorage.setItem('ktpPhoto', '');
    localStorage.setItem('selfiePhoto', '');
    const payload = {
      username: state.username,
      web_version: state.webVersion,
      pin: state.pin,
      email: '',
      latitude: utils.store.get('latitude'),
      longitude: utils.store.get('longitude'),
    };

    if (partner !== 'j1') {
      payload.partner_name = partner;
    }

    if (
      state.pin &&
      state.username &&
      utils.validator.loginValidator(state.username)
    ) {
      try {
        actions.openLoadingOverlay();
        const response = await login(payload);

        if (response?.errors?.length === 0) {
          if (!response?.data?.eligible_access?.is_eligible) {
            actions.closeLoadingOverlay();
            handleNotification({
              isOpen: true,
              message:
                'Anda tidak dapat masuk ke website ini, silakan login melalui aplikasi Julo.',
            });
            return;
          }

          const browserVersion = navigator.appVersion.split(' ');
          const paramsScrapData = {
            data_trigger_location: 'user_login',
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
            partner,
            token: response?.data?.token,
            appStatus: response?.data?.applications?.[0].status,
            applicationId: response?.data?.applications?.[0].id,
            customerId: response?.data?.customer?.id,
            username: state.username,
            fullname: response?.data?.customer?.fullname,
            email: response?.data?.customer?.email,
            nik: response?.data?.customer?.nik,
          });
          actions.setState('token', response?.data?.token);
          actions.setState('appStatus', response?.data?.applications[0].status);
          setDatas({
            ...datas,
            token: response?.data?.token,
            partner,
            fullname: response?.data?.customer?.fullname,
            appStatus: response?.data?.applications?.[0].status,
            applicationId: response?.data?.applications?.[0].id,
            customerId: response?.data?.customer?.id,
          });

          history.replace(`/paylater/application/personal_identity`);
        } else {
          const errMessage = response?.errors?.[0];
          handleNotification({
            isOpen: true,
            message: errMessage,
          });
        }

        actions.closeLoadingOverlay();
      } catch (error) {
        if (error) {
          const errorData = error.response.data || {};
          const errMessage = errorData.errors?.[0];
          handleNotification({
            isOpen: true,
            message: errMessage,
          });
        }
      }
    } else if (!state.pin && state.username) {
      handleNotification({
        isOpen: true,
        message: 'Pin = Kata Sandi tidak boleh kosong',
      });
    } else if (state.pin && !state.username) {
      handleNotification({
        isOpen: true,
        message: 'Email / NIK tidak boleh kosong',
      });
    } else if (!state.pin && !state.username) {
      handleNotification({
        isOpen: true,
        message: 'Email/NIK, Pin atau Kata Sandi tidak boleh kosong',
      });
    } else if (
      state.username &&
      !utils.validator.loginValidator(state.username)
    ) {
      handleNotification({
        isOpen: true,
        message: 'Mohon diisi dengan Email atau NIK yang benar',
      });
    } else if (state.pin && !utils.validator.pinValidator(state.pin)) {
      handleNotification({
        isOpen: true,
        message: 'Mohon diisi dengan Email atau NIK yang benar',
      });
    }
  };

  const handleButtonDialogInvalidToken = () => {
    setShowDialogInvalidToken(false);
    utils.store.removeItem('invalidToken');
  };

  const redirectPage = (value) => {
    if (value === 'register') {
      const route = `/${partner}/register`;
      return (window.location.href = route);
    }
    history.push(value);
  };

  useEffect(() => {
    const isValidToken =
      utils.store.get('invalidToken') == 'true' ? true : false;
    setShowDialogInvalidToken(isValidToken);
    setDatas({
      ...datas,
      webType: 'webapp',
      partner: partner,
      token: '',
      password: '',
      nik: '',
      email: '',
      appStatus: '',
      applicationId: '',
      customerId: '',
    });
    utils.store.set({
      webType: 'webapp',
      partner: partner,
      token: '',
      password: '',
      nik: '',
      email: '',
      appStatus: '',
      applicationId: '',
      customerId: '',
    });

    permissionGeolocation();
  }, []);

  return (
    <Page useHeader>
      <div className='authentication-body container-fluid'>
        <div className='row justify-content-center'>
          <div className='col-md-4 col-lg-3'>
            <div className='auth-form-wrapper'>
              <img src={logo} className='auth-form__img' />

              <div className='input-group mb-3'>
                <span className='input-group-append'>
                  <span className='input-group-text bg-transparent'>
                    <img src={envelope} />
                  </span>
                </span>
                <TextInput
                  id='username'
                  placeholder='Email / NIK'
                  maxLength='50'
                  className='form-control'
                  type='email'
                  validator={() => {}}
                  saveToLocalStorage
                  autofocus
                />
              </div>

              <div className='input-group'>
                <span className='input-group-append'>
                  <span className='input-group-text bg-transparent'>
                    <img src={lock} />
                  </span>
                </span>
                <TextInput
                  handleEnter={loginAccount}
                  id='pin'
                  placeholder='PIN / Kata Sandi'
                  maxLength='6'
                  className='form-control'
                  type='password'
                  inputMode='numeric'
                  allow='number'
                  validator={() => {}}
                  maxLengthCheck={true}
                  saveToLocalStorage
                />
              </div>
              <div className='form-group btn-white-div mt-3'>
                <ButtonForm
                  className='btn btn-white w-100 py-2 font-weight-600'
                  onClick={loginAccount}
                >
                  Masuk
                </ButtonForm>
              </div>
              <div className='form-group text-center mt-5 pb-5 pt-3 bordered-bottom-light'>
                <span className='d-block font-12'>
                  Belum punya akun?{' '}
                  <span
                    onClick={() => redirectPage('register')}
                    className='text-underline cursor-pointer font-weight-bold font-12 ml-2'
                  >
                    Daftar Sekarang
                  </span>
                </span>
              </div>
              <div className='form-group text-center'>
                <span className='d-block text-sm mb-2 font-12'>
                  Berizin dan diawasi oleh
                </span>
                <img src={ojk} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogInfo
        clickOutside={false}
        dialogData={DIALOG_INVALID_TOKEN}
        handleShowDialogInfo={setShowDialogInvalidToken}
        showDialogInfo={showDialogInvalidToken}
        handleClickDialogButton={handleButtonDialogInvalidToken}
      />
    </Page>
  );
};

export default Login;
