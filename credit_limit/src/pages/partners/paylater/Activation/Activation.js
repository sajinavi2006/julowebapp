import React, { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import { cx } from '@emotion/css';

import logo from 'assets/img/logo-vertical.svg';
import ojk from 'assets/img/OJK.svg';
import phoneIcon from 'assets/img/icon/ic-phone.png';
import envelope from 'assets/img/icon/ic-envelope.svg';

import { Div } from 'assets/css/styled';
import { text } from 'assets/css/stylesValue';

import utils from 'utils';
import Analytics from 'utils/Analytics/Analytics';

import { useUserContext } from 'providers/UserProvider';

import { DIALOG_INVALID_TOKEN } from 'constant';

import Page from 'components/Page';
import ButtonForm from 'components/forms/ButtonForm';
import TextInput from 'components/forms/TextInput';
import DialogInfo from 'components/Dialog/DialogInfo';
import ActivationToggle from 'components/ActivationToggle';

import { checkUser } from 'services/partner/common/partnership';

import { background, borderRadiusAll, padding } from 'assets/css/stylesValue';
import { dFlex, alignCenter, justifyBetween } from 'assets/css/stylesFix';

const Activation = () => {
  const { partner } = useParams();
  const history = useHistory();
  const { handleNotification, datas } = useUserContext();
  const [showDialogInvalidToken, setShowDialogInvalidToken] = useState(false);
  const [checked, setChecked] = useState(true);

  const email = datas.email || '';
  const phone = datas.phone || '';
  const merchant = utils.store.get('merchant');
  const isActive = datas.isActive;

  const toggleChecked = () => {
    setChecked((prev) => !prev);
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
      }
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

  const activateAccount = async () => {
    const payload = {
      email: email,
      phone: phone,
    };
    try {
      const response = await checkUser(payload);
      const data = response.data;

      if (data.error_msg) {
        handleNotification({
          isOpen: true,
          message: data.error_msg,
        });
      }

      if (response.success && !data.error_msg) {
        const redirectURL = data.webview_url.split('/')[4];
        history.replace(`/paylater/${redirectURL}`);
      }

      // Redirect to transaction detail
    } catch (error) {
      const errorData = error.response.data || {};
      const errMessage = errorData.errors?.[0];
      handleNotification({
        isOpen: true,
        message: errMessage,
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
    permissionGeolocation();
  }, []);

  return (
    <Page useHeader>
      <Div className='authentication-body container-fluid'>
        <Div className='row justify-content-center'>
          <Div className='col-md-4 col-lg-3'>
            <Div className='auth-form-wrapper'>
              <img src={logo} className='auth-form__img' />

              <Div className='input-group mb-3'>
                <span className='input-group-append'>
                  <span className='input-group-text bg-transparent'>
                    <img src={phoneIcon} />
                  </span>
                </span>
                <TextInput
                  id='phone'
                  placeholder='Nomor Handphone'
                  maxLength='50'
                  className='form-control'
                  type='text'
                  validator={() => undefined}
                  value={phone}
                  saveToLocalStorage
                  autofocus
                />
              </Div>

              <Div className='input-group mb-3'>
                <span className='input-group-append'>
                  <span className='input-group-text bg-transparent'>
                    <img src={envelope} />
                  </span>
                </span>
                <TextInput
                  handleEnter={activateAccount}
                  id='email'
                  placeholder='Email'
                  className='form-control'
                  type='email'
                  validator={() => undefined}
                  value={email}
                  saveToLocalStorage
                />
              </Div>
              {isActive && (
                <Div
                  className={cx(
                    dFlex,
                    background('#01A7E8'),
                    borderRadiusAll('5px'),
                    padding('0.6rem 1rem'),
                    alignCenter,
                    justifyBetween
                  )}
                >
                  <Div
                    flexBasis='auto'
                    className={`${text({
                      size: 16,
                      weight: '500',
                    })} `}
                  >
                    Hubungkan akun JULO ke aplikasi {merchant} untuk pembayaran
                    lebih mudah
                  </Div>
                  <Div flexBasis='auto'>
                    <ActivationToggle
                      toggleChecked={toggleChecked}
                      checked={checked}
                    />
                  </Div>
                </Div>
              )}

              <Div className='form-group btn-white-Div mt-3'>
                <ButtonForm
                  className='btn btn-white w-100 py-2 font-weight-600'
                  onClick={activateAccount}
                >
                  Masuk
                </ButtonForm>
              </Div>
              <Div className='form-group text-center mt-5 pb-5 pt-3 bordered-bottom-light'>
                <span className='d-block font-12'>
                  Belum punya akun?{' '}
                  <span
                    onClick={() => redirectPage('register')}
                    className='text-underline cursor-pointer font-weight-bold font-12 ml-2'
                  >
                    Daftar Sekarang
                  </span>
                </span>
              </Div>
              <Div className='form-group text-center'>
                <span className='d-block text-sm mb-2 font-12'>
                  Berizin dan diawasi oleh
                </span>
                <img src={ojk} />
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
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

export default Activation;
