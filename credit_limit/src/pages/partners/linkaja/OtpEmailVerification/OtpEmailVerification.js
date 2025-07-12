import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import containsNumber from '@julofinance/web-helpers/dist/string/containsNumber';
import { cx } from '@emotion/css';

import utils from 'utils';
import { MAX_WIDTH } from 'constant';
import { useUserContext } from 'providers/UserProvider';

import LoaderText from 'components/LoaderText';
import Layout from 'components/Layout';

import { inputStyle, redColor } from './styles';
import { paddingBottom, text } from 'assets/css/stylesValue';
import {
  Button,
  Col,
  Container,
  Div,
  Row,
  Wrapper,
  Img,
} from 'assets/css/styled';
import {
  h100,
  h90,
  justifyCenter,
  mt3,
  px3,
  w100,
  dFlex,
} from 'assets/css/stylesFix';
import {
  requestEmailOtp,
  checkRegisteredUser,
  otpEmailConfirmation,
  registerUser,
} from 'services/partner/common/partnership';
import timerIcon from 'assets/img/timer.png';

/**
 * Route: /linkaja/otp
 * Access: Public
 */
const LinkAjaOtpEmailVerification = () => {
  let intervalId = null;
  const history = useHistory();
  const theme = useTheme();
  const themeColor = theme?.colors;
  const themeText = theme?.text;
  const { handleNotification } = useUserContext();
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState();
  const [messageError, setMessageError] = useState('');
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const nik = utils.store.get('nik');

  useEffect(() => {
    // with asumption if user went this page from nik page
    if (!nik) {
      return history.goBack();
    }
    const otpResendTime = utils.store.get('otpResendTime');
    setTimeLeft(otpResendTime);
  }, []);

  useEffect(() => {
    if (!timeLeft) return;
    intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => (clearInterval ? clearInterval(intervalId) : null);
  }, [timeLeft]);

  const formatTime = (time) => {
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;
    var ret = '';
    if (mins > 0) {
      ret += mins < 10 ? '0' : '';
    }
    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;
    return ret;
  };

  const sendVerificationCode = async () => {
    const payload = {
      nik: utils.store.get('nik'),
      email: utils.store.get('email'),
    };

    try {
      setIsButtonLoading(true);
      const response = await requestEmailOtp(payload);
      if (response.success) {
        const deactivatedOtpMessage = response.data?.content?.message;
        // if otp deactivated
        if (deactivatedOtpMessage) {
          setMessageError(deactivatedOtpMessage);
        }
      }
      setIsButtonLoading(false);
    } catch (error) {
      setIsButtonLoading(false);
      const errorMessage = Array.isArray(error?.response?.data?.errors)
        ? error?.response?.data?.errors?.[0]
        : error?.response?.data?.errors ?? 'Network Error';

      handleNotification({
        isOpen: true,
        message: errorMessage?.message || errorMessage,
      });
    }
  };

  const resendVerificationCode = () => {
    const otpResendTime = utils.store.get('otpResendTime');
    setTimeLeft(otpResendTime);
    setMessageError('');
    sendVerificationCode();
    setOtp('');
  };

  const handleCheckRegisteredUser = async () => {
    try {
      const result = await checkRegisteredUser();
      if (result) {
        const isGoToPinCreationPage = result.data?.show_pin_creation_page;
        if (isGoToPinCreationPage) {
          // go to pin confirmation page and will get longform data there
          return history.replace('/linkaja/pin');
        }
        return history.replace('/linkaja/tnc');
      }
    } catch (error) {
      handleNotification({
        isOpen: true,
        message: error?.response?.data?.errors?.[0],
      });
    }
  };

  const handleRegisterUser = async (email) => {
    const payload = {
      nik,
      email,
      web_version: '0.0.1',
    };

    if (utils.store.get('latitude')) {
      payload['latitude'] = utils.store.get('latitude');
    }

    if (utils.store.get('longitude')) {
      payload['longitude'] = utils.store.get('longitude');
    }

    try {
      const response = await registerUser(payload);
      if (response.success) {
        handleCheckRegisteredUser();
      }
    } catch (error) {
      if (error) {
        const errorMessage = Array.isArray(error?.response?.data?.errors)
          ? error?.response?.data?.errors?.[0]
          : error?.response?.data?.errors ?? 'Network Error';
        setIsButtonLoading(false);
        handleNotification({
          isOpen: true,
          message: errorMessage,
        });
      }
    }
  };
  // post otp confirmation API
  const handleOtpSubmission = async (value) => {
    if (containsNumber(value)) {
      setOtp(value);
      setMessageError('');

      if (value.length === 6) {
        try {
          setIsButtonLoading(true);
          const payload = {
            otp: value,
            email: utils.store.get('email'),
          };

          const result = await otpEmailConfirmation(payload);
          if (result?.success) {
            handleRegisterUser(payload.email);
          } else {
            setMessageError('Send otp error');
          }
        } catch (error) {
          setIsButtonLoading(false);
          setMessageError(error?.response?.data?.errors?.[0]);
        }
      } else {
        setMessageError('');
      }
    } else {
      setOtp('');
    }
  };

  return (
    <Layout barBackTitle='Masukkan kode verifikasi' barBackType='primary'>
      <Container
        height='100%'
        position='relative'
        background={themeColor?.white}
        className={cx(paddingBottom('6rem'))}
      >
        <Wrapper maxWidth={MAX_WIDTH} className={cx(h90, px3)}>
          <Div className={cx(h100)}>
            <Div
              className={cx(text({ color: themeText?.primary }))}
              textAlign='center'
            >
              Harap masukkan kode verifikasi yang telah dikirim ke email anda
              untuk melanjutkan proses pengajuan.
            </Div>
            <Div className={cx(mt3)}>
              <OtpInput
                value={otp}
                onChange={handleOtpSubmission}
                numInputs={6}
                isInputNum
                separator={<span>&nbsp; &nbsp;</span>}
                containerStyle={`${dFlex} ${justifyCenter} ${w100}`}
                inputStyle={`${inputStyle} ${messageError ? redColor : ''}`}
                shouldAutoFocus={true}
                isDisabled={isButtonLoading}
              />
            </Div>

            <Div
              marginTop='10px'
              marginBottom='10px'
              color={'#db4d3d'}
              textAlign='center'
            >
              {messageError ? messageError : <>&nbsp;&nbsp;</>}
            </Div>

            <Div textAlign='center'>
              <Img src={timerIcon} className='timerImg' alt='timer' />
              <span style={{ fontSize: '11px' }}>{formatTime(timeLeft)}</span>
            </Div>
            <Row justifyContent='center'>
              <Col xs='12' sm='6'>
                <Div className={mt3} textAlign='center'>
                  <Button
                    fluid
                    padding='15px 36px'
                    disabled={timeLeft > 0 || isButtonLoading}
                    onClick={() => resendVerificationCode()}
                  >
                    {isButtonLoading ? (
                      <LoaderText />
                    ) : (
                      'Kirim ulang kode verifikasi'
                    )}
                  </Button>
                </Div>
              </Col>
            </Row>
          </Div>
        </Wrapper>
      </Container>
    </Layout>
  );
};

export default LinkAjaOtpEmailVerification;
