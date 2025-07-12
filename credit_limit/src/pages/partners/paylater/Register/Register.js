import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';

import logo from 'assets/img/logo-vertical.svg';
import idCard from 'assets/img/icon/ic-idcard.svg';
import mail from 'assets/img/icon/ic-email.svg';
import ojk from 'assets/img/OJK.svg';
import google from 'assets/img/ic-google.svg';

import { GoogleLogin } from 'react-google-login';
import { config } from 'configs';

import { preRegister } from 'services/auth';

import utils from 'utils';
import useGlobalState from 'actions';

import Page from 'components/Page';
import ButtonForm from 'components/forms/ButtonForm';
import TextInput from 'components/forms/TextInput';
import Dialog from 'components/Dialog';

import Analytics from 'utils/Analytics/Analytics';
import { Label, Div, Img } from 'assets/css/styled';

import { useUserContext } from 'providers/UserProvider';

function Register() {
  const history = useHistory();
  const [state, actions] = useGlobalState();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState('');
  const { handleNotification } = useUserContext();

  const [nik, setNik] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [disableFormRegister, setDisableFormRegister] = useState(true);

  let googleProps;

  const goToPin = async () => {
    const payload = {
      nik: state.nik,
      email: state.email,
    };

    Analytics.logEvent({
      title: 'pin_initial',
      eventName: 'create_pin_click',
    });

    try {
      actions.openLoadingOverlay();
      const response = await preRegister(payload);
      if (response.success) {
        utils.store.set('nik', state.nik);
        utils.store.set('email', state.email);
        history.push(`/paylater/pin`);
      }
      actions.closeLoadingOverlay();
    } catch (error) {
      if (error) {
        const errorData = error.response.data || {};
        const errMessage = Array.isArray(errorData.errors)
          ? errorData.errors[0]
          : error.response.message ?? 'Network Error';

        handleNotification({
          isOpen: true,
          message: errMessage,
        });
        actions.closeLoadingOverlay();

        setDisableFormRegister(false);
      }
    }
  };

  const clearForm = () => {
    actions.setState('isEmail', false);
    actions.setState('email', '');
    actions.setState('nik', '');
    actions.setState('nikInvalid', false);
    utils.store.set('nik', '');
    utils.store.set('email', '');
    utils.store.set('newEmail', '');
    localStorage.setItem('ktpPhoto', '');
    localStorage.setItem('selfiePhoto', '');
  };

  const responseGoogle = (response) => {
    if (state.nik) {
      if (response && response.profileObj) {
        const profile = response.profileObj;
        const emailDomain = profile.email.split('@')[1];
        if (emailDomain === 'julofinance.com') {
          setSelectedEmail(profile.email);
          setShowDialog(true);
        } else {
          actions.setState('email', profile.email);
          actions.setState('isEmail', true);
        }
      }
    } else {
      handleNotification({
        isOpen: true,
        message: 'NIK tidak boleh kosong',
      });
    }
  };

  const handleUpdateEmail = async () => {
    Analytics.logEvent({
      title: 'submit_email_popup',
      eventName: 'submit_email_click',
    });
    if (newEmail) {
      if (utils.validator.emailValidator(newEmail)) {
        utils.store.set('email', newEmail);
        actions.setState('email', newEmail);
        actions.setState('isEmail', true);
        setShowDialog(false);
      } else {
        handleNotification({
          isOpen: true,
          message: 'Mohon periksa data NIK anda',
        });
      }
    } else {
      handleNotification({
        isOpen: true,
        message: 'NIK tidak boleh kosong',
      });
    }
  };

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
    navigator.permissions?.query({ name: 'geolocation' }).then((result) => {
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
            title: 'sign_up',
            eventName: 'location_permission_granted',
          });
        }
      };
    });
  };

  const handleClickWithGoogle = (value) => {
    Analytics.logEvent({
      title: 'sign_up',
      eventName: 'google_account_selector_clicked',
    });
    if (state.nik) {
      if (utils.validator.signUpValidator(state.nik)) {
        value.onClick();
      } else {
        handleNotification({
          isOpen: true,
          message: 'Mohon periksa data NIK anda',
        });
      }
    } else {
      handleNotification({
        isOpen: true,
        message: 'NIK tidak boleh kosong',
      });
    }
  };

  const GoogleLoginComponent = (payload) => {
    const renderGoogleButton = (payload) => {
      googleProps = payload.renderProps;
      return payload.type === 'button' ? (
        <ButtonForm
          className='btn btn-white w-100 py-2 font-weight-bold'
          onClick={() => handleClickWithGoogle(payload.renderProps)}
        >
          <Img src={google} className='mx-2' alt='' />
          Daftar dengan Google
        </ButtonForm>
      ) : (
        <Div
          className={`input-group mb3 ${disableFormRegister && 'disabled'}`}
          onClick={() =>
            !disableFormRegister && handleClickWithGoogle(payload.renderProps)
          }
        >
          <span className='input-group-append'>
            <span className='input-group-text bg-transparent'>
              <Img src={mail} alt='' />
            </span>
          </span>
          <TextInput
            readOnly
            id='email'
            maxLength='50'
            value={state.email}
            className='form-control'
            type='text'
            disabled={disableFormRegister}
          />
        </Div>
      );
    };
    return (
      <GoogleLogin
        clientId={config.googleClientID}
        render={(renderProps) =>
          renderGoogleButton({ renderProps, type: payload.type })
        }
        buttonText='Login'
        onSuccess={
          state.nikInvalid === false && state.nik != '' ? responseGoogle : ''
        }
        onFailure={
          state.nikInvalid === false && state.nik != '' ? responseGoogle : ''
        }
        cookiePolicy={'single_host_origin'}
      />
    );
  };

  const handleEnter = () => {
    handleClickWithGoogle(googleProps);
  };

  const nikCounter = () => {
    const maxLength = 16;
    const lengthNik = nik?.length || 0;
    return `${lengthNik} / ${maxLength}`;
  };

  const redirectPage = (value) => {
    history.push(value);
  };

  useEffect(() => {
    window.history.pushState(null, null, location.href);
    clearForm();
    permissionGeolocation();
  }, []);
  return (
    <Page useHeader className=''>
      <Div className='authentication-body container-fluid'>
        <Div className='row justify-content-center'>
          <Div className='col-md-4 col-lg-3'>
            {!state.isEmail ? (
              <Div className='auth-form-wrapper'>
                <Img src={logo} className='auth-form__img' alt='' />
                <Div className='form-group'>
                  <Label width='100%' marginBottom='1rem'>
                    Isi nomor KTP
                  </Label>
                  <Div className='input-group'>
                    <span className='input-group-append'>
                      <span className='input-group-text bg-transparent'>
                        <Img src={idCard} alt='' />
                      </span>
                    </span>

                    <TextInput
                      id='nik'
                      placeholder='Isi nomor KTP'
                      maxLength='16'
                      className='form-control'
                      type='text'
                      allow='number'
                      setValue={(e) => setNik(e)}
                      validator={() => {}}
                      handleEnter={handleEnter}
                      inputMode='numeric'
                      autofocus
                      saveToLocalStorage
                    />
                  </Div>
                  <Div className='text-right px-2'>
                    <small>{nikCounter()}</small>
                  </Div>
                </Div>

                <Div className='form-group text-center'>
                  <span className='d-block'>Lanjutkan dengan</span>
                </Div>
                <Div className='form-group btn-white-Div'>
                  <GoogleLoginComponent type='button' />
                </Div>
                <Div className='form-group text-center mt-5 py-3 bordered-bottom-light'>
                  <span className='d-block font-12'>
                    Sudah punya akun?{' '}
                    <span
                      onClick={() => redirectPage('login')}
                      className='text-underline cursor-pointer font-weight-bold font-12 ml-2'
                    >
                      Masuk
                    </span>
                  </span>
                </Div>
                <Div className='form-group text-center'>
                  <span className='d-block text-sm mb-2 font-9'>
                    Berizin dan diawasi oleh
                  </span>
                  <Img src={ojk} alt='' />
                </Div>
              </Div>
            ) : (
              <Div className='auth-form-wrapper'>
                <Img src={logo} className='auth-form__img' alt='' />

                <Div className='form-group'>
                  <Div
                    className={`input-group ${
                      disableFormRegister && 'disabled'
                    }`}
                  >
                    <span className='input-group-append'>
                      <span className='input-group-text bg-transparent'>
                        <Img src={idCard} alt='' />
                      </span>
                    </span>
                    <TextInput
                      id='nik'
                      maxLength='16'
                      value={state.nik}
                      setValue={(e) => setNik(e)}
                      className='form-control'
                      inputMode='numeric'
                      type='text'
                      disabled={disableFormRegister}
                      autofocus
                    />
                  </Div>
                  {!disableFormRegister && (
                    <Div className='text-right px-2'>
                      <small>{nikCounter()}</small>
                    </Div>
                  )}
                </Div>
                <Div className='form-group'>
                  <GoogleLoginComponent type='form' />
                </Div>
                <Div className='form-group'>
                  <a
                    onClick={() => goToPin()}
                    className='btn btn-white w-100 py-2'
                  >
                    Buat PIN
                  </a>
                </Div>
                <Div className='form-group text-center mt-5 py-3 bordered-bottom-light' />
                <Div className='form-group text-center'>
                  <span className='d-block text-sm mb-2 font-9'>
                    Berizin dan diawasi oleh
                  </span>
                  <Img src={ojk} alt='' />
                </Div>
              </Div>
            )}
          </Div>
        </Div>
      </Div>
      <Dialog
        show={showDialog}
        padding={'24px'}
        getShow={(e) => setShowDialog(e)}
      >
        {showDialog && (
          <>
            <TextInput
              id='email'
              placeholder='Email'
              value={selectedEmail}
              setValue={setNewEmail}
              validator={(value) => {
                setNewEmail(value);
              }}
              className='form-control'
              type='text'
              saveToLocalStorage
            />
            <ButtonForm
              className='w-100 py-2 mt-3'
              onClick={() => handleUpdateEmail()}
            >
              Ubah Email
            </ButtonForm>
          </>
        )}
      </Dialog>
    </Page>
  );
}

export default withRouter(Register);
