import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import OtpInput from 'react-otp-input';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import back from '../../../assets/img/icon/ic-back-2.svg';

import ButtonForm from './../../../components/forms/ApplicationButtonForm';
import Dialog from '../../../components/Dialog';

import {
  textVerify,
  inputStyle,
  errorMessage,
  redColor,
  blueColor,
} from './styles';
import { ml3, mt3, justifyCenter } from '../../../assets/css/stylesFix';
import services from '../../../services';
import utils from '../../../utils';
import useGlobalState from '../../../actions';

const DialogInfo = (props) => {
  //const divRef = useRef(null);
  const [, actions] = useGlobalState();
  let intervalId = null;
  const {
    handleShowDialogInfo,
    showDialogInfo,
    timeLeft,
    setTimeLeft,
    dialogType,
    settingLongForm,
  } = props;
  const [showError, setShowError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [otp, setOtp] = useState('');
  const [enable, setEnable] = useState(true);
  
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

  const fetchAndSet = (value) => {
    setShowError(false);
    setMessageError('');
    setOtp(value);
    if (value.length === 6) {
      const body = {
        action_type: 'verify_phone_number',
        otp_token: value,
      };
      services.common.postData(
        { uri: '/otp/v1/validate', body },
        (response) => {
          if (response.success) {
            if (intervalId) {
              clearInterval(intervalId);
            }
            utils.store.set('isVerifPhone', true);
            actions.setState('isVerifPhone', true);
            handleShowDialogInfo(false);
          }
        },
        (error) => {
          setShowError(true);
          setMessageError(
            error?.response?.data?.errors[0] || 'Terjadi kesalahan',
          );
        },
      );
    }
  };

  useEffect(() => {
    if (!timeLeft) return;
    if (dialogType === 'verification') {
      intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }
    return () => (clearInterval ? clearInterval(intervalId) : null);
  }, [timeLeft]);

  const Verification = () => {
    return (
      <div className='p-5'>
        <div className='row'>
          <div className='col-12 pull-left'>
            <a onClick={() => handleShowDialogInfo(false)}>
              <img src={back} alt='' />
            </a>
            <span className={`${ml3} ${textVerify}`}>
              Masukan Kode Verifikasi
            </span>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 text-center'>
            <div className={mt3}>
              <span>
                Harap masukkan kode verifikasi yang telah kami kirim ke nomor{' '}
                <b>{utils.store.get('mobilePhone1')}</b> untuk melanjutkan
                proses transaksi.
              </span>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 text-center'>
            <div className={`d-flex ${mt3}`}>
              <OtpInput
                value={otp}
                onChange={fetchAndSet}
                numInputs={6}
                separator={<span>&nbsp; &nbsp;</span>}
                containerStyle={`d-flex ${justifyCenter} w-100`}
                inputStyle={`${inputStyle} ${showError ? redColor : ''}`}
                shouldAutoFocus={true}
              />
            </div>
          </div>
        </div>
        {showError ? (
          <div className='row mt-2'>
            <div className='col-12 text-center'>
              <span className={errorMessage}>{messageError}</span>
            </div>
          </div>
        ) : null}
        <div className='row mt-3'>
          <div className='col-12 text-center'>
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
        <ButtonForm
          disabled={timeLeft > 0}
          className='mt-3'
          onClick={() => handleShowDialogInfo(true)}
        >
          Kirim ulang kode verifikasi
        </ButtonForm>
      </div>
    );
  };

  const Notes = () => {
    return (
      <div className='d-flex align-items-center justify-content-center flex-column p-5'>
        {settingLongForm?.guidancePopup?.image ? (
          <img src={settingLongForm?.guidancePopup?.image} alt='Image Note' />
        ) : null}
        <h4 className={`${blueColor} ${mt3}`}>
          {settingLongForm?.guidancePopup?.title}
        </h4>
        <span>{settingLongForm?.guidancePopup?.message}</span>
        <ButtonForm
          disabled={timeLeft > 0}
          className='mt-3'
          onClick={() => {
            utils.store.set('approveNote', true);
            handleShowDialogInfo(false);
          }}
        >
          Lanjutkan
        </ButtonForm>
      </div>
    );
  };

  const handleScroll = (e) => {
    if (
      e.target.scrollHeight - e.target.scrollTop <=
      e.target.clientHeight + 5
    ) {
      //setEnable(false)
    }
  };

  const toBottom = () => {
    //divRef.current.scrollIntoView({ behavior: 'smooth' });
    const element = document.getElementById('1');
    setEnable(false);

    if (element) {
      element.focus();
    }
  };

  const Terms = () => {
    return (
      <div style={{ height: '80vh', position: 'relative' }}>
        <div
          style={{
            height: '12%',
            backgroundColor: '#f2f2f2',
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
          className='p-2'
        >
          Mohon baca & scroll kebawah syarat & ketentuan ini hingga selesai agar
          dapat lanjut{' '}
        </div>
        <div
          onScroll={handleScroll}
          id='content-scroller'
          style={{ height: '80%', overflowY: 'scroll' }}
          className='px-5'
          dangerouslySetInnerHTML={{
            __html:
              settingLongForm +
              '<input type="text" id="1" style="width:0px; border: 0px !important">',
          }}
        />
        <div
          style={{ height: '8%', backgroundColor: '#f2f2f2' }}
          className='d-flex flex-row-reverse px-2'
        >
          <div className='w-50 d-flex flex-row py-2'>
            <ButtonForm
              color='secondary'
              className='mr-2'
              onClick={() => {
                handleShowDialogInfo(false);
                localStorage.setItem('isReadTerm', false);
                actions.setState('isFormFilledReview', true);
                setEnable(true);
              }}
            >
              Batal
            </ButtonForm>
            <ButtonForm
              disabled={enable}
              onClick={() => {
                actions.setState('isReadTerm', true);
                if (localStorage.getItem('isAgreeValidation') === 'true') {
                  actions.setState('isFormFilledReview', false);
                }
                handleShowDialogInfo(false);
              }}
            >
              Lanjutkan
            </ButtonForm>
          </div>
        </div>
        <a
          className='d-flex align-items-center justify-content-center'
          onClick={toBottom}
          style={{
            position: 'absolute',
            bottom: 60,
            right: 30,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#00acf0',
            cursor: 'pointer',
          }}
        >
          <ArrowDownwardIcon style={{ color: '#ffffff' }} />
        </a>
      </div>
    );
  };

  return (
    <Dialog
      baseColor={`#000`}
      clickOutside={false}
      padding={`0`}
      getShow={handleShowDialogInfo}
      show={showDialogInfo}
    >
      {dialogType === 'verification' && <Verification />}
      {dialogType === 'notes' && <Notes />}
      {dialogType === 'term' && <Terms />}
    </Dialog>
  );
};

DialogInfo.propTypes = {
  dialogData: PropTypes.object,
  handleClickDialogButton: PropTypes.func,
  handleShowDialogInfo: PropTypes.func,
  showDialogInfo: PropTypes.bool,
  timeLeft: PropTypes.any,
  setTimeLeft: PropTypes.any,
  dialogType: PropTypes.any,
  settingLongForm: PropTypes.any,
};

export default DialogInfo;
