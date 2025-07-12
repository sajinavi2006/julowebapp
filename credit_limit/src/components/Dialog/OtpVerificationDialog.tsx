import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import back from '../../assets/img/icon/ic-back-2.svg';
import Dialog from '@material-ui/core/Dialog';
import OtpInput from 'react-otp-input';
import useGlobalState from '../../actions';
import utils from '../../utils';
import services from '../../services';
import timerIcon from '../../assets/img/timer.png';
import { Button } from '../../assets/css/styled';
import {
  textVerify,
  inputStyle,
  errorMessage,
  redColor,
} from '../../pages/commons/Applications/DialogVerification/styles';
import { ml3, mt3, justifyCenter } from '../../assets/css/stylesFix';
import ApplicationHeader from '../ApplicationHeader';

import { StyledDialogTnC } from './styles';
import { Wrapper } from '../../assets/css/styled';
import { zIndex as zIndexValue } from '../../assets/css/stylesValue';
import { MAX_WIDTH, MIN_WIDTH, Z_INDEX_DIALOG } from '../../constant';
import {
  h100,
  h90,
  mx3,
  overflowHidden,
  positionRelative,
  px0,
} from '../../assets/css/stylesFix';

import { IOtpVerificationDialog } from './type';

const OtpVerificationDialog: React.FC<IOtpVerificationDialog> = (props) => {
  const [state, actions] = useGlobalState();
  const intervalRef = useRef<NodeJS.Timeout>();
  const [timeLeft, setTimeLeft] = useState(state.otp_resend_time);
  const [showError, setShowError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [otp, setOtp] = useState('');
  const staticZIndex = Z_INDEX_DIALOG;

  const handleShowDialogInfo = (value: boolean) => {
    if (value) {
      setTimeLeft(state.otp_resend_time);
      services.common.postData(
        {
          uri: '/v2/application/otp/',
          body: { phone: utils.store.get('mobilePhone1') },
        },
        (response: { data: string | number }) => {
          utils.store.set('information', response.data);
        },
      );
    }
  };

  const formatTime = (time: number) => {
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

  const fetchAndSet = (value: string) => {
    setShowError(false);
    setMessageError('');
    setOtp(value);
    if (value.length === 6) {
      const body = {
        otp_token: value,
      };
      services.common.postData(
        { uri: '/v2/application/validate-otp/', body },
        (response: { success: string }) => {
          if (response.success) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            utils.store.set('isVerifPhone', true);
            actions.setState('isVerifPhone', true);
            utils.store.set('invalidPhoneError1Flg', false);
            if (props.onFilledPersonal) {
              actions.setState('isFormFilled', props.onFilledPersonal());
            }
            actions.setState('isOtpDialogOpen', false);
          }
        },
        (error: { response: { data: { error_message: string } } }) => {
          setShowError(true);
          setMessageError(
            error?.response?.data?.error_message || 'Terjadi kesalahan',
          );
        },
      );
    }
  };

  useEffect(() => {
    if (timeLeft) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      if (clearInterval) {
        clearInterval(intervalRef.current);
      }
    }
  }, [timeLeft]);

  useEffect(() => {
    window.addEventListener('resize', actions.handleWindowSizeChange);
  }, []);

  return (
    <Dialog
      open={state.isOtpDialogOpen}
      fullScreen
      onClose={() => actions.setState('isOtpDialogOpen', false)}
    >
      {state.windowWidth > MAX_WIDTH ? <ApplicationHeader /> : null}
      <div
        style={{
          cursor: 'pointer',
          color: '#ffffff',
          paddingTop: state.windowWidth > MAX_WIDTH ? '80px' : '16px',
          paddingBottom: '16px',
        }}
      >
        <a
          onClick={() => actions.setState('isOtpDialogOpen', false)}
          style={{ paddingLeft: '16px' }}
        >
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
              `${staticZIndex}`,
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
                      onChange={fetchAndSet}
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
                      onClick={() => handleShowDialogInfo(true)}
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
};

export default withRouter(OtpVerificationDialog);
