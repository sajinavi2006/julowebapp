import OtpInput from 'react-otp-input';
import { useParams } from 'react-router-dom';

import { useTheme } from '@emotion/react';
import { cx } from '@emotion/css';

import { MAX_WIDTH } from 'constant';
import LoaderText from 'components/LoaderText';
import Layout from 'components/Layout';
import PageGuard from 'components/PageGuard';
import { marginTop, paddingBottom, text } from 'assets/css/stylesValue';
import {
  Button,
  Col,
  Container,
  Div,
  Row,
  Wrapper,
  Img,
} from 'assets/css/styled';
import { h90, justifyCenter, mt3, w100, dFlex, p0 } from 'assets/css/stylesFix';
import timerIcon from 'assets/img/timer.png';

import { inputStyle, redColor } from './styles';
import { useHandleOtpPage } from './usecase';
import { OTP_MAX_DIGIT } from './constants';
import { maskEmail } from './utils';

const Otp = () => {
  const theme = useTheme();
  const { partner } = useParams();
  const themeColor = theme?.colors;
  const themeText = theme?.text;

  const {
    email,
    onSubmitOtp,
    isButtonLoading,
    messageError,
    otp,
    onResendVerificationCode,
    timeLeft,
    isAllowRefetchOtp,
  } = useHandleOtpPage();

  return (
    <PageGuard
      previousAllowedState='register'
      restrictedTo={`/${partner}/signup`}
    >
      <Layout
        barBackTitle='Masukkan kode verifikasi'
        barBackType='primary'
        layoutContainer={{ padding: '26px 26px 0 26px' }}
      >
        <Container
          height='100%'
          position='relative'
          background={themeColor?.white}
          className={cx(paddingBottom('6rem'))}
        >
          <Wrapper maxWidth={MAX_WIDTH} className={cx(h90, p0)}>
            <Div
              className={cx(text({ color: themeText?.primary }))}
              textAlign='center'
            >
              Masukkan kode OTP yang telah kami kirim ke email{' '}
              <b>{maskEmail(email)}</b> untuk lanjutkan proses
            </Div>
            <OtpInput
              value={otp}
              onChange={onSubmitOtp}
              numInputs={OTP_MAX_DIGIT}
              isInputNum
              containerStyle={`${marginTop(
                '16px',
              )} ${dFlex} ${justifyCenter} ${w100}`}
              inputStyle={`${inputStyle} ${messageError ? redColor : ''}`}
              shouldAutoFocus={true}
              isDisabled={isButtonLoading}
            />

            {messageError && (
              <Div marginTop='4px' color={'#DB4D3D'} textAlign='center'>
                {messageError}
              </Div>
            )}

            <Div textAlign='center' marginTop='49px'>
              <Img src={timerIcon} className='timerImg' alt='timer' />
              <span style={{ fontSize: '11px' }}>{timeLeft}</span>
            </Div>
            <Row justifyContent='center'>
              <Col xs='12' sm='6'>
                <Div className={mt3} textAlign='center'>
                  <Button
                    fluid
                    padding='15px 36px'
                    disabled={
                      timeLeft > 0 || isButtonLoading || !isAllowRefetchOtp
                    }
                    onClick={onResendVerificationCode}
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
          </Wrapper>
        </Container>
      </Layout>
    </PageGuard>
  );
};

export default Otp;
