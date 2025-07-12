import { useState } from 'react';
import { AxiosError } from 'axios';

import { useHistory } from 'react-router-dom';
import { cx } from '@emotion/css';

import logo from 'assets/img/logo-vertical.svg';
import ojk from 'assets/img/OJK.svg';
import phoneIcon from 'assets/img/icon/ic-phone.svg';
import envelope from 'assets/img/icon/ic-envelope.svg';

import { Div, Img } from 'assets/css/styled';
import { text, height } from 'assets/css/stylesValue';
import { mb3, px3 } from 'assets/css/stylesFix';

import utils from 'utils';

import { useUserContext } from 'providers/UserProvider';

import { DIALOG_INVALID_TOKEN } from 'constant';

import NavBar from 'components/NavBar';
import Input from 'components/Input';
import ButtonForm from 'components/forms/ButtonForm';
import DialogInfo from 'components/Dialog/DialogInfo';

import { checkUser } from 'services/webview/activation/index';
import { applicationDetails } from 'services/webview/activation';

import { background, borderRadiusAll, padding } from 'assets/css/stylesValue';
import { dFlex, alignCenter, justifyBetween } from 'assets/css/stylesFix';

const VerifyData = () => {
  const history = useHistory();
  const { handleNotification, setDatas } = useUserContext();
  const [showDialogInvalidToken, setShowDialogInvalidToken] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const isActive = utils.store.get('isActive');

  const redirectPage = () => {
    history.replace('otp-verification', { from: 'verify-data' });
  };

  const fetchDataConfirmation = async () => {
    try {
      const result = await applicationDetails();

      if (result?.success) {
        const partnerOriginName = result?.data?.partner_origin_name;
        setDatas((prev) => ({
          ...prev,
          partner_origin_name: partnerOriginName,
        }));
        utils.store.set({
          partner_origin_name: partnerOriginName,
        });

        // Redirect to otp verification
        redirectPage();
      } else {
        history.push('error', { errorType: 'activation system error' });
      }
    } catch (error) {
      history.push('error', { errorType: 'system error' });
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
      } else {
        const urlParams = new URLSearchParams(data.webview_url);
        const newOtpType = urlParams.get('otp_type');

        const paramsStorage = utils.store.getParse('params');
        const newParams = {
          ...paramsStorage,
          auth: data.user_token,
          urlParams: {
            ...paramsStorage.urlParams,
            otp_type: newOtpType,
          },
        };
        const paramsStringify = JSON.stringify(newParams);

        utils.store.set({
          email: email,
          phone: phone,
          params: paramsStringify,
        });

        fetchDataConfirmation();
      }
    } catch (error) {
      const errorData = (error as AxiosError).response?.data || {};
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

  return (
    <Div fluid>
      <NavBar hideMenu />
      <Div className='authentication-body container-fluid'>
        <Div className='row justify-content-center'>
          <Div className='auth-form-wrapper'>
            <img src={logo} className='auth-form__img' />

            <Div className='mb-3'>
              <Input
                name={'phone'}
                label={'Phone'}
                value={phone}
                onChange={(val) => setPhone(val)}
                isOutlined
                startAdornment={<Img src={phoneIcon} />}
                className={mb3}
                classNameInput={cx(height('39px'), px3)}
              />
            </Div>

            <Div className='mb-3'>
              <Input
                name={'email'}
                label={'Email'}
                value={email}
                onChange={(val) => setEmail(val)}
                isOutlined
                startAdornment={<Img src={envelope} />}
                className={mb3}
                classNameInput={cx(height('39px'), px3)}
              />
            </Div>
            {isActive === 'true' && (
              <Div
                className={cx(
                  dFlex,
                  background('#01A7E8'),
                  borderRadiusAll('5px'),
                  padding('0.6rem 1rem'),
                  alignCenter,
                  justifyBetween,
                )}
              >
                <Div
                  flexBasis='auto'
                  className={`${text({
                    size: 16,
                    weight: '500',
                  })} `}
                >
                  Hubungkan akun JULO ke aplikasi {`<Merchant>`} untuk
                  pembayaran lebih mudah
                </Div>
                <Div flexBasis='auto'>{/* <ActivationToggle /> */}</Div>
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
                <a
                  href='https://play.google.com/store/apps/details?id=com.julofinance.juloapp'
                  className='text-underline cursor-pointer font-weight-bold font-12 ml-2'
                >
                  Daftar Sekarang
                </a>
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
      <DialogInfo
        clickOutside={false}
        dialogData={DIALOG_INVALID_TOKEN}
        handleShowDialogInfo={setShowDialogInvalidToken}
        showDialogInfo={showDialogInvalidToken}
        handleClickDialogButton={handleButtonDialogInvalidToken}
      />
    </Div>
  );
};

export default VerifyData;
