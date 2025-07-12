import { useEffect, useState } from 'react';
import containsNumber from '@julofinance/web-helpers/dist/string/containsNumber';
import OtpInput from 'react-otp-input';
import { useTheme } from '@emotion/react';
import { cx } from '@emotion/css';
import { useHistory } from 'react-router-dom';

import utils from 'utils';
import { MAX_WIDTH } from 'constant';
import { useUserContext } from 'providers/UserProvider';
import {
  sendVerificationCodeApi,
  validateOTP,
} from 'services/webview/activation';

import LoaderText from 'components/LoaderText';

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
  mt5,
  px3,
  dFlex,
  w100,
} from 'assets/css/stylesFix';
import timerIcon from 'assets/img/timer.png';
import Layout from 'components/Layout';

const OtpVerification = () => {
  let intervalId = null;
  const theme = useTheme();
  const themeColor = theme?.colors;
  const themeText = theme?.text;
  const { handleNotification, datas } = useUserContext();
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState();
  const [messageError, setMessageError] = useState('');
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const history = useHistory();

  const secretKey = utils.store.get('secretKey');
  const { phone } = datas;

  useEffect(() => {
    if (!timeLeft) return;
    intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => (clearInterval ? clearInterval(intervalId) : null);
  }, [timeLeft]);

  const formatTime = (time) => {
    const mins = ~~((time % 3600) / 60);
    const secs = ~~time % 60;
    let ret = '';
    if (mins > 0) {
      ret += mins < 10 ? '0' : '';
    }
    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;
    return ret;
  };

  const sendVerificationCode = async () => {
    const payload = {
      phone,
    };

    try {
      setIsButtonLoading(true);
      const response = await sendVerificationCodeApi(payload);
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
      const errorData = error.response.data || {};
      const errMessage = errorData.errors?.[0];
      handleNotification({
        isOpen: true,
        message: errMessage,
      });
    }
  };

  const resendVerificationCode = () => {
    const otpResendTime = 60;
    setTimeLeft(otpResendTime);
    setMessageError('');
    sendVerificationCode();
    setOtp('');
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
            otp_token: value,
          };

          const result = await validateOTP(payload);

          if (result?.success) {
            // if otp deactivated
            if (!result.content?.active) {
              const deactivatedOtpMessage = result.content?.message;
              setMessageError(deactivatedOtpMessage);
            }

            return history.replace(`/paylater/pin-verification`);
          } else {
            setMessageError('Send otp error');
          }
          setIsButtonLoading(false);
        } catch (error) {
          setIsButtonLoading(false);
          const errorData = error.response.data || {};
          const errMessage = errorData.error_message;
          setMessageError(errMessage);
        }
      } else {
        setMessageError('');
      }
    } else {
      setOtp('');
    }
  };

  useEffect(() => {
    if (phone && secretKey) {
      setTimeLeft(60);
      sendVerificationCode();
    }
  }, [phone]);

  return (
    <Layout
      barBackTitle='Masukkan kode verifikasi'
      barBackType='primary'
      hideNavbar={true}
    >
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
              Harap masukkan kode verifikasi yang telah kami kirim ke nomor{' '}
              {utils.string.blurPhoneNumber(phone)} untuk melanjutkan proses
              pembayaran
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
            <Div textAlign='center' className={cx(mt5)}>
              <Div
                textDecoration='underline'
                cursor='pointer'
                onClick={() => history.push('reset-pin')}
              >
                Lupa PIN ?
              </Div>
            </Div>
          </Div>
        </Wrapper>
      </Container>
    </Layout>
  );
};

export default OtpVerification;
