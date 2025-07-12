import { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { cx } from '@emotion/css';

import { Div, Row, Img, Col, Label, Button } from 'assets/css/styled';
import { height } from 'assets/css/stylesValue';
import { mb0, mb3, px3 } from 'assets/css/stylesFix';

import logo from 'assets/img/logo-vertical.svg';
import ojk from 'assets/img/OJK.svg';
import icIdCard from 'assets/img/icon/ic-idcard.svg';
import icEnvelope from 'assets/img/icon/ic-envelope.svg';

import Page from 'components/Page';
import DialogInfo from 'components/Dialog/DialogInfo';
import { DIALOG_INVALID_TOKEN } from 'constant';
import utils from 'utils';
import Input from 'components/Input';
import {
  requestOtp,
  requestEmailOtp,
  getPhoneNumber,
} from 'services/partner/common/partnership';
import validator from 'utils/Validator';

import { useQueryParams } from 'utils/RouteHelper';
import { useUserContext } from 'providers/UserProvider';
import { LINKAJA_RETRY_TIME } from 'constant';

/**
 * Route: /linkaja/:type(register|nik)
 */
const Register = () => {
  const { setDatas, handleNotification, handleLoadingOverlay } =
    useUserContext();
  const history = useHistory();
  const { type } = useParams();
  const query = useQueryParams();
  const phoneNumberParams = query?.get('phone');
  const sessionId = query?.get('sessionId') || utils.store.get('sessionId');
  const [nik, setNik] = useState('');
  const [phoneNumber, setPhoneNumber] = useState();
  const [newEmail, setNewEmail] = useState('');
  const [showDialogInvalidToken, setShowDialogInvalidToken] = useState(false);
  const partnerStorage = utils.store.get('partner');
  const location = useLocation() || {};
  const from = location.state?.from ?? '';

  const isNikPage = type === 'nik';

  let retryFetch = 1;

  // wil be executed on /linkaja/nik page
  const handleRequestOtp = async () => {
    const payload = {
      nik: nik || utils.store.get('nik'),
      phone: phoneNumber || utils.store.get('phone'),
    };
    try {
      handleLoadingOverlay(true);
      const response = await requestOtp(payload);
      if (response.success) {
        const data = response.data || {};
        const contentData = data.content || {};
        const otpDeactivatedMessage = contentData.message;
        // if otp deactivated
        if (otpDeactivatedMessage) {
          handleNotification({
            isOpen: true,
            message: otpDeactivatedMessage,
          });
          return handleLoadingOverlay(false);
        }
        const resendTime = contentData.parameters?.otp_resend_time + 1;
        utils.store.set({
          otpResendTime: resendTime,
          nik: payload.nik,
          phone: payload.phone,
          isPhoneVerified: true,
        });
        history.push({
          pathname: '/linkaja/otp',
          state: { from: 'nik' },
        });
      }
      handleLoadingOverlay(false);
    } catch (error) {
      if (error) {
        const errors = error?.response?.data?.errors;
        const errorMessage = Array.isArray(errors)
          ? errors?.[0]
          : errors ?? 'Network Error';
        handleLoadingOverlay(false);
        handleNotification({
          isOpen: true,
          message: errorMessage,
        });
      }
    }
  };
  // wil be executed on /linkaja/register page

  const handleRequestEmailOtp = async (email) => {
    if (!validator.emailValidator(email)) {
      return handleNotification({
        isOpen: true,
        message: 'Mohon isi email dengan benar',
      });
    }
    const payload = {
      nik,
      email,
    };

    try {
      handleLoadingOverlay(true);
      const response = await requestEmailOtp(payload);
      if (response.success) {
        const resendTime = response.data?.content?.otp_resend_time + 1;
        utils.store.set({
          otpResendTime: resendTime,
          email: payload.email,
          nik: payload.nik,
        });
        history.push({
          pathname: '/linkaja/email-otp',
          state: { from: 'register' },
        });
      }
      handleLoadingOverlay(false);
    } catch (error) {
      if (error) {
        const errors = error?.response?.data?.errors;
        const errorMessage = errors
          ? Array.isArray(errors)
            ? errors[0]
            : errors.message
          : 'Network Error';

        handleLoadingOverlay(false);
        handleNotification({
          isOpen: true,
          message: errorMessage,
        });
      }
    }
  };

  // isContinue is temporary solution for testing purpose
  const handleGetPhoneNumber = async (isContinue) => {
    if (sessionId) {
      try {
        handleLoadingOverlay(true);
        const response = await getPhoneNumber(sessionId);
        if (response.success) {
          const phone = response.data?.phone_number;
          setPhoneNumber(phone);

          utils.store.set('sessionId', sessionId);
          utils.store.set('phone', phone);
        }
        handleLoadingOverlay(false);
        if (isContinue) {
          handleRequestOtp();
        }
      } catch (error) {
        // Recursive Function looping `LINKAJA_RETRY_TIME` times
        const statusCode = error?.response?.status;
        /**
         * Status Code 408 = Time out
         * if after fetching http status code return 408,
         * retry will be start
         */
        if (retryFetch <= LINKAJA_RETRY_TIME && statusCode === 408) {
          handleGetPhoneNumber(isContinue);
          retryFetch++;
          return;
        }

        if (error) {
          const errors = error?.response?.data?.errors;
          const errorMessage = Array.isArray(errors)
            ? errors[0]
            : errors ?? 'Network Error';

          handleLoadingOverlay(false);
          handleNotification({
            isOpen: true,
            message: errorMessage,
          });
        }
      }
    }
  };

  const handleContinue = async () => {
    if (isNikPage) {
      // temporary solution for testing purpose
      const envName = process.env.REACT_APP_ENV_NAME;

      if (phoneNumberParams && (envName === 'staging' || envName === 'uat')) {
        return handleRequestOtp();
      }
      return handleGetPhoneNumber(true);
    } else {
      handleRequestEmailOtp(newEmail);
    }
  };

  const getLocation = () => {
    utils.commons.askLocationAccess((allow) => {
      // if allow
      utils.store.set('latitude', allow.coords.latitude);
      utils.store.set('longitude', allow.coords.longitude);
    });
  };

  const permissionGeolocation = () => {
    navigator.permissions?.query({ name: 'geolocation' })?.then((result) => {
      if (result.state == 'granted' || result.state == 'prompt') {
        getLocation();
      }
    });
  };

  const handleEnter = () => {
    if (nik && nik.length === 16) {
      return handleContinue();
    }
  };

  const nikCounter = () => {
    const maxLength = 16;
    const lengthNik = nik?.length || 0;
    return `${lengthNik} / ${maxLength}`;
  };

  const handlePageGuard = () => {
    // this function is for guarding register page
    // Register page can only be accessed from Loan Expectation,
    // Application Review and OTP Verification page
    if (type === 'register') {
      if (from !== 'loan-expectation' && from !== 'review' && from !== 'otp') {
        history.push('/linkaja/nik');
      }
    }
  };

  const clearUserCredentials = () => {
    setDatas((prevState) => ({
      ...prevState,
      token: '',
    }));

    utils.store.removeItem('nik');
    utils.store.removeItem('token');
    utils.store.removeItem('secretKey');
  };

  const initializePage = () => {
    const isValidToken =
      utils.store.get('invalidToken') == 'true' ? true : false;
    setShowDialogInvalidToken(isValidToken);
    handlePageGuard();
    utils.store.removeItem('expiredTimeOtp');

    if (!isNikPage) {
      // if register page get nik from storage
      setNik(utils.store.get('nik'));
    } else {
      //debug bank scrape
      clearUserCredentials();

      // make sure partner on session storage is already there
      if (partnerStorage) {
        handleGetPhoneNumber();
      }
    }

    // THIS IS FOR TESTING PURPOSE
    // THE ORIGINAL ONE SHOULD BE CALL API AND GET PHONE NUMBER
    setPhoneNumber(phoneNumberParams);
  };

  const handleButtonDialogInvalidToken = () => {
    setShowDialogInvalidToken(false);
    utils.store.removeItem('invalidToken');
  };

  useEffect(() => {
    initializePage();

    permissionGeolocation();
  }, [partnerStorage]);

  return (
    <Page>
      <Div className='authentication-body container-fluid'>
        <Row justifyContent='center'>
          <Col md='4' lg='3'>
            <Div className='auth-form-wrapper'>
              <Img src={logo} className='auth-form__img' alt='' />
              <Div className='form-group'>
                {isNikPage && (
                  <Label width='100%' marginBottom='1rem'>
                    Isi nomor KTP
                  </Label>
                )}

                <Div>
                  <Input
                    name={'nik'}
                    label={'NIK'}
                    value={isNikPage ? nik : utils.store.get('nik')}
                    onChange={(e) => setNik(e)}
                    hiddenLabel={true}
                    placeholder='NIK'
                    isNumeric={true}
                    isOutlined={true}
                    disabled={!isNikPage}
                    type={'numeric'}
                    onEnter={handleEnter}
                    startAdornment={<Img src={icIdCard} />}
                    className={mb0}
                    classNameInput={cx(height('39px'), px3)}
                    inputProps={{ maxLength: 16 }}
                  />
                </Div>

                {isNikPage && (
                  <Div textAlign='right' padding='0 0.5rem'>
                    <small>{nikCounter()}</small>
                  </Div>
                )}
              </Div>
              {!isNikPage && (
                <Div>
                  <Input
                    name='email'
                    label={'Email'}
                    value={newEmail}
                    onChange={(e) => setNewEmail(e)}
                    isOutlined={true}
                    hiddenLabel={true}
                    startAdornment={<Img src={icEnvelope} />}
                    className={mb3}
                    inputProps={{ maxLength: 50 }}
                    classNameInput={cx(height('39px'), px3)}
                  />
                </Div>
              )}
              <Div className='form-group'>
                <Button
                  width='100%'
                  disabled={
                    isNikPage ? (nik ? nik.length !== 16 : true) : !newEmail
                  }
                  onClick={handleContinue}
                  className='btn btn-white'
                >
                  Lanjutkan
                </Button>
              </Div>

              <Div
                textAlign='center'
                marginTop={window.innerHeight / 6 + 'px'}
                paddingTop='10px'
                borderTop='1px solid rgba(255,255,255,0.4)'
              >
                <span className='d-block text-sm mb-2 font-9'>
                  Berizin dan diawasi oleh
                </span>
                <Img src={ojk} alt='' />
              </Div>
            </Div>
          </Col>
        </Row>
      </Div>
      {isNikPage ? (
        <DialogInfo
          clickOutside={false}
          dialogData={DIALOG_INVALID_TOKEN}
          handleShowDialogInfo={setShowDialogInvalidToken}
          showDialogInfo={showDialogInvalidToken}
          handleClickDialogButton={handleButtonDialogInvalidToken}
        />
      ) : (
        ''
      )}
    </Page>
  );
};

export default Register;
