import { useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import OtpInput from 'react-otp-input';
import { useHistory, useLocation } from 'react-router-dom';
import { cx } from '@emotion/css';
import { useTheme } from '@emotion/react';

import utils from 'utils';
import { MAX_WIDTH } from 'constant';
import { useUserContext } from 'providers/UserProvider';
import {
  sendVerificationCodeApi,
  sendVerificationCodeEmail,
  validateOTP,
} from 'services/webview/activation';

import Countdown from 'components/Countdown';
import LoaderText from 'components/LoaderText';

import { inputStyle, redColor } from './styles';
import { paddingBottom, text } from 'assets/css/stylesValue';
import { Button, Col, Container, Div, Row, Wrapper } from 'assets/css/styled';
import { h100, h90, justifyCenter, mt3, px3 } from 'assets/css/stylesFix';

const OtpVerification = () => {
  const history = useHistory();
  const location = useLocation<{ from: string }>();
  const theme = useTheme();
  const themeColor = theme.colors;
  const themeText = theme.text;
  const { datas, handleNotification } = useUserContext();
  const [isTimesUp, setIsTimesUp] = useState(false);
  const [otp, setOtp] = useState('');
  const [messageError, setMessageError] = useState('');
  const [showError, setShowError] = useState(false);
  const [isTimerReady, setIsTimerReady] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const otpType = datas.params?.urlParams?.otp_type;

  const countdownRef = useRef();
  const from = location?.state?.from ?? '';
  const phoneData =
    (datas?.params?.phone as string) || utils.store.get('phone') || '';
  const emailData =
    (datas?.params?.email as string) || utils.store.get('email') || '';

  const sendVerificationCode = async () => {
    const currentDate = new Date(); // generate new Date every function has called
    const currentEpochDate = currentDate?.getTime();
    const expiredTime = Number(utils.store.get('expiredTimeOtp'));
    const payload = {
      phone: phoneData,
      email: emailData,
    };
    try {
      setIsButtonLoading(true);
      setIsTimerReady(false);
      setShowError(false);
      setIsTimesUp(false);
      if (expiredTime < currentEpochDate) {
        const result =
          otpType === 'sms'
            ? await sendVerificationCodeApi({ phone: payload.phone })
            : await sendVerificationCodeEmail({ email: payload.email });
        if (result?.content?.active) {
          const resultExpiredTime = new Date(result.content?.expired_time);
          utils.store.set('expiredTimeOtp', resultExpiredTime.getTime());
        } else {
          setShowError(true);
          setMessageError(result?.content?.message);
        }
      }
      setIsButtonLoading(false);
      setIsTimerReady(true);
    } catch (error) {
      setIsButtonLoading(false);
      handleNotification({
        isOpen: true,
        message: (error as AxiosError)?.response?.data?.errors?.[0],
      });
    }
  };

  const resendVerificationCode = () => {
    sendVerificationCode();
    setOtp('');
  };

  useEffect(() => {
    const errorHandler = () => {
      if (isTimesUp) {
        setMessageError('Waktu sudah habis, silahkan coba lagi.');
      }
    };

    const checkOtpStatus = () => {
      const otpStatus = utils.store.get('pinStatus');

      if (otpStatus) {
        utils.store.removeItem('expiredTimeOtp');
        utils.store.removeItem('pinStatus');
        resendVerificationCode();
      }
    };

    errorHandler();
    checkOtpStatus();
  }, [isTimesUp]);

  const formatOtp = (
    params: string,
    type: 'sms' | 'email',
    prefixLength = 0,
    suffixLength = 0,
  ) => {
    let formattedOtp = '';

    if (type === 'sms') {
      const prefix = params.substring(0, prefixLength);
      const suffix = params.slice(-suffixLength);
      const nbStars = params.length - (prefixLength + suffixLength);

      formattedOtp = prefix + '*'.repeat(nbStars) + suffix;

      return formattedOtp;
    } else if (type === 'email') {
      const splitDomain = params.split('@');

      // to prevent if params text length less than prefix
      if (splitDomain[0].length >= prefixLength) {
        const prefix = splitDomain[0].substring(0, prefixLength);
        const nbStars = splitDomain[0].length - prefixLength;

        formattedOtp = prefix + '*'.repeat(nbStars) + '@' + splitDomain[1];

        return formattedOtp;
      }

      return params;
    }

    return params;
  };

  const fetchAndSet = async (value: string) => {
    if (utils.string.stringOnlyContainsNumber(value)) {
      setOtp(value);
      setShowError(false);
      setMessageError('');

      if (value.length === 6) {
        try {
          const payload = {
            otp_token: value,
            otp_type: otpType,
          };

          setIsFormLoading(true);
          const result = await validateOTP(payload);

          if (result?.content?.active) {
            setIsFormLoading(false);
            utils.store.set('pinStatus', true);
            if (from === 'verify-data') {
              history.replace('pin-verification', { from: 'otp-verify' });
            } else {
              history.replace('pin-verification', { from: 'otp-verification' });
            }
          } else {
            setIsFormLoading(false);
            setShowError(true);
            setMessageError(result?.content?.message);
          }
        } catch (error) {
          setIsFormLoading(false);
          setShowError(true);
          setMessageError((error as AxiosError)?.response?.data?.error_message);
        }
      } else {
        setIsFormLoading(false);
        setShowError(false);
        setMessageError('');
      }
    } else {
      setOtp('');
    }
  };

  return (
    <Container
      height='100%'
      position='relative'
      background={themeColor?.white}
      className={cx(paddingBottom('6rem'))}
    >
      <Wrapper maxWidth={MAX_WIDTH} className={cx(h90, px3)}>
        <Div className={cx(h100)}>
          <Div
            className={cx(text({ size: 12, color: themeText?.primary }))}
            textAlign='center'
          >
            Harap masukkan kode verifikasi yang telah kami kirim ke
            {datas.params?.urlParams.otp_type === 'sms' ? (
              <>
                {' nomor '}
                <span className={cx(text({ weight: 'bold' }))}>
                  {' '}
                  {formatOtp(phoneData, 'sms', 4, 2)}{' '}
                </span>
              </>
            ) : (
              <>
                {' email '}
                <span className={cx(text({ weight: 'bold' }))}>
                  {' '}
                  {formatOtp(emailData, 'email', 4)}{' '}
                </span>
              </>
            )}
            untuk melanjutkan pendaftaran
          </Div>
          <Div className={cx(mt3)}>
            <OtpInput
              isDisabled={isFormLoading}
              value={otp}
              onChange={fetchAndSet}
              numInputs={6}
              isInputNum
              separator={<span>&nbsp; &nbsp;</span>}
              containerStyle={`d-flex ${justifyCenter} w-100`}
              inputStyle={`${inputStyle} ${showError ? redColor : ''}`}
              shouldAutoFocus={true}
            />
          </Div>
          <Div textAlign='center'>
            <Countdown
              ref={countdownRef}
              messageError={messageError}
              showError={showError}
              isTimerReady={isTimerReady}
              isTimesUp={isTimesUp}
              isLoading={isFormLoading}
              setIsTimesUp={setIsTimesUp}
              triggerNewTimer={() => sendVerificationCode()}
            />
          </Div>
          <Row justifyContent='center'>
            <Col xs='12' sm='6'>
              <Div className={mt3} textAlign='center'>
                <Button
                  fluid
                  padding='15px 36px'
                  className={cx(text({ size: 12 }))}
                  disabled={!isTimesUp || isButtonLoading}
                  onClick={() => resendVerificationCode()}
                >
                  {!isButtonLoading ? (
                    'Kirim ulang kode verifikasi'
                  ) : (
                    <LoaderText />
                  )}
                </Button>
              </Div>
            </Col>
          </Row>
        </Div>
      </Wrapper>
    </Container>
  );
};

export default OtpVerification;
