import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import back from 'assets/img/icon/ic-back-2.svg';
import Dialog from '@material-ui/core/Dialog';
import OtpInput from 'react-otp-input';
import utils from 'utils';
import timerIcon from 'assets/img/timer.png';
import { Button } from 'assets/css/styled';
import {
  textVerify,
  inputStyle,
  errorMessage,
  redColor,
} from 'pages/commons/Applications/DialogVerification/styles';
import { ml3, mt3, justifyCenter } from 'assets/css/stylesFix';
import ApplicationHeader from 'components/ApplicationHeader';

import { StyledDialogTnC } from './styles';
import { Wrapper } from 'assets/css/styled';
import { zIndex as zIndexValue } from 'assets/css/stylesValue';
import { MAX_WIDTH, MIN_WIDTH, Z_INDEX_DIALOG } from 'constant';
import {
  h100,
  h90,
  mx3,
  overflowHidden,
  positionRelative,
  px0,
} from 'assets/css/stylesFix';
import { verifyPhoneNumber, validateOtp } from 'services/form';
import useGlobalState from 'actions';

function OtpVerificationDialog({ otpResendTime, phoneNumber, show, onClose }) {
  let intervalId = null;
  const [state, actions] = useGlobalState();
  const [timeLeft, setTimeLeft] = useState(otpResendTime);
  const [showError, setShowError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [otp, setOtp] = useState('');
  const staticZIndex = Z_INDEX_DIALOG;

  const handleResendVerificationCode = async () => {
    setTimeLeft(otpResendTime);
    try {
      await verifyPhoneNumber(phoneNumber);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

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

  const handleOnClose = (isSuccess) => {
    if (onClose) {
      onClose(isSuccess);
    }
  };

  const handleOnChangeOtp = async (value) => {
    setShowError(false);
    setMessageError('');
    setOtp(value);
    if (value.length === 6) {
      try {
        const validateResult = await validateOtp(value);
        if (validateResult.success) {
          if (intervalId) {
            clearInterval(intervalId);
          }
          handleOnClose(true);
        }
      } catch (error) {
        setShowError(true);
        setMessageError(
          error?.response?.data?.error_message || 'Terjadi kesalahan',
        );
      }
    }
  };

  useEffect(() => {
    if (!timeLeft) return;
    intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => (clearInterval ? clearInterval(intervalId) : null);
  }, [timeLeft]);
  useEffect(() => {
    window.addEventListener('resize', actions.handleWindowSizeChange);
  }, []);

  return (
    <Dialog open={show} fullScreen onClose={() => handleOnClose()}>
      {state.windowWidth > MAX_WIDTH ? <ApplicationHeader /> : null}
      <div
        style={{
          cursor: 'pointer',
          color: '#ffffff',
          paddingTop: state.windowWidth > MAX_WIDTH ? '80px' : '16px',
          paddingBottom: '16px',
        }}
      >
        <a onClick={() => handleOnClose()} style={{ paddingLeft: '16px' }}>
          <img src={back} alt='' />
        </a>
        <span className={`${ml3} ${textVerify}`}>Masukan Kode Verifikasi </span>
      </div>

      <div>
        <StyledDialogTnC
          maxWidth={MAX_WIDTH}
          minWidth={MIN_WIDTH}
          position='center'
          type='default'
          zIndex={staticZIndex}
        >
          <Wrapper
            maxWidth={MAX_WIDTH}
            className={`${overflowHidden} ${h90} ${px0} ${mx3} ${zIndexValue(
              staticZIndex,
            )}`}
          >
            <div className={`${h100} ${positionRelative} ${overflowHidden}`}>
              <div>
                <div style={{ height: '100%', overflowY: 'scroll' }}>
                  <div
                    style={{
                      textAlign: 'center',
                      paddingTop: state.windowHeight < 400 ? '120px' : '20px',
                    }}
                  >
                    <span>
                      Harap masukkan kode verifikasi yang telah kami kirim ke
                      nomor <b>{utils.store.get('mobilePhone1')}</b> untuk
                      melanjutkan proses pendaftaran
                    </span>
                  </div>
                  <div className={mt3}>
                    <OtpInput
                      value={otp}
                      onChange={handleOnChangeOtp}
                      numInputs={6}
                      isInputNum
                      separator={<span>&nbsp; &nbsp;</span>}
                      containerStyle={`d-flex ${justifyCenter} w-100`}
                      inputStyle={`${inputStyle} ${showError ? redColor : ''}`}
                      shouldAutoFocus={true}
                    />
                  </div>
                  <div>
                    <div
                      className={errorMessage}
                      style={{ textAlign: 'center' }}
                    >
                      {showError ? messageError : <>&nbsp;&nbsp;</>}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <img src={timerIcon} className='timerImg' alt='timer' />
                    <span style={{ fontSize: '11px' }}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  <div className={mt3} style={{ textAlign: 'center' }}>
                    <Button
                      onClick={handleResendVerificationCode}
                      disabled={timeLeft > 0}
                    >
                      <div className='w-100'>Kirim ulang kode verifikasi</div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Wrapper>
        </StyledDialogTnC>
      </div>
    </Dialog>
  );
}

OtpVerificationDialog.propTypes = {
  otpResendTime: PropTypes.number.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default OtpVerificationDialog;
