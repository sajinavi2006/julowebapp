import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { cx } from '@emotion/css';

import Page from 'components/Page';
import { useUserContext } from 'providers/UserProvider';
import { createPin, checkPinStrength } from 'services/pin';
import { Div, Row, Col } from 'assets/css/styled';
import { text, marginTop, justifyContent } from 'assets/css/stylesValue';
import back from 'assets/img/icon/ic-back.svg';
import {
  backImageStyle,
  createPinContainerStyle,
  createPinInputStyle,
} from './styles';
import { PIN_COUNT } from './constants';

function CreatePin() {
  const history = useHistory();
  const { handleLoadingOverlay } = useUserContext();
  const { xid } = useParams<{ xid: string }>();
  const [pinFirst, setFirstPIN] = useState('');
  const [pinSecond, setSecondPIN] = useState('');
  const [pinError, setPinError] = useState('');
  const [isFirstPin, setIsFirstPin] = useState(false);
  const [isReEnterPin, setIsReEnterPIN] = useState(false);

  const clearForm = () => {
    setPinError('');
    setFirstPIN('');
    setSecondPIN('');
    setIsFirstPin(false);
    setIsReEnterPIN(false);
    const input = document.querySelector('input');

    if (input) {
      input.focus();
      input.setAttribute('autoComplete', 'off');
    }
  };

  const reTypePin = async (value: string) => {
    setPinError('');
    if (pinFirst.length <= PIN_COUNT) {
      setFirstPIN(value);
    }

    if (value.length === PIN_COUNT) {
      handleLoadingOverlay(true);
      try {
        const payload = {
          xid: xid,
          pin: value,
        };
        const response = await checkPinStrength(payload);

        if (response?.data === 'PIN kuat') {
          setIsFirstPin(true);
          setIsReEnterPIN(true);
          const input = document.querySelector('input');
          input?.focus();
          input?.setAttribute('autoComplete', 'off');
          handleLoadingOverlay(false);
        } else {
          setPinError(response?.errors[0]);
          handleLoadingOverlay(false);
        }
      } catch (error) {
        if (error) {
          const errorData = (error as AxiosError)?.response?.data || {};
          handleLoadingOverlay(false);
          setPinError(
            errorData.errors?.length > 0
              ? errorData.errors[0]
              : (error as Error).message,
          );
        }
      }
    }
  };

  const confirmPin = async (value: string) => {
    setPinError('');
    if (pinSecond.length <= PIN_COUNT) {
      setSecondPIN(value);
    }

    if (value.length === PIN_COUNT) {
      if (pinFirst === value) {
        handleLoadingOverlay(true);
        try {
          const payload = {
            xid: xid,
            pin: value,
          };
          const response = await createPin(payload);

          if (response?.success) {
            setIsFirstPin(true);
            setIsReEnterPIN(true);
            window.location.href = response?.data?.redirect_url;
          } else {
            setPinError(response?.errors[0]);
            handleLoadingOverlay(false);
          }
        } catch (error) {
          if (error) {
            const errorData = (error as AxiosError)?.response?.data || {};
            handleLoadingOverlay(false);
            setPinError(
              errorData.errors?.length > 0
                ? errorData.errors[0]
                : (error as Error).message,
            );
          }
        }
      } else {
        setPinError('PIN yang Anda ketik tidak sesuai');
      }
    }
  };

  const goBack = () => {
    if (!isFirstPin) {
      setFirstPIN('');
      history.goBack();
    } else {
      clearForm();
    }
  };

  useEffect(() => {
    clearForm();
    handleLoadingOverlay(false);
  }, []);

  return (
    <Page>
      <Div fluid className={createPinContainerStyle}>
        <Row>
          <Col
            justifyContent='center'
            sm='12'
            marginTop='40px'
            paddingBottom='30px'
            display='flex'
            alignItems='center'
          >
            <a onClick={() => goBack()} className={backImageStyle}>
              <img src={back} alt='' />
            </a>
            <span className={text({ weight: '700', size: 18 })}>Buat PIN</span>
          </Col>
        </Row>
        <Row justifyContent='center' display='flex'>
          <Col md='4' lg='3'>
            <Div position='relative' marginTop='20vh'>
              <h5 className={cx(text({ align: 'center' }), marginTop('1rem'))}>
                {!isFirstPin ? 'Ketik PIN Baru' : 'Ketik Ulang PIN Baru'}
              </h5>

              <Div marginBottom='1rem'>
                {!isFirstPin ? (
                  <OtpInput
                    numInputs={PIN_COUNT}
                    value={pinFirst}
                    isInputNum
                    isInputSecure
                    onChange={reTypePin}
                    shouldAutoFocus
                    inputStyle={createPinInputStyle}
                    containerStyle={justifyContent('center')}
                  />
                ) : isReEnterPin ? (
                  <OtpInput
                    numInputs={PIN_COUNT}
                    onChange={confirmPin}
                    value={pinSecond}
                    isInputNum
                    isInputSecure
                    shouldAutoFocus
                    inputStyle={createPinInputStyle}
                    containerStyle={justifyContent('center')}
                  />
                ) : null}
              </Div>
              <Div marginBottom='1rem' textAlign='center'>
                {pinError ? (
                  <span className={text({ color: '#db4d3d' })}>{pinError}</span>
                ) : !isFirstPin ? (
                  <span>
                    Pastikan Anda mengingat PIN ini dan merahasiakannya dari
                    siapapun
                  </span>
                ) : null}
              </Div>
            </Div>
          </Col>
        </Row>
      </Div>
    </Page>
  );
}

export default CreatePin;
