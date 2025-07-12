import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { cx } from '@emotion/css';
import { AxiosError } from 'axios';

import {
  DIALOG_INVALID_TOKEN,
  DIALOG_INVALID_URL_PARAMS_WEBVIEW,
  MAX_WIDTH,
  MIN_WIDTH,
} from 'constant';
import { useUserContext } from 'providers/UserProvider';
import utils from 'utils';

import { login } from 'services/partner/common/auth';

import Logo from 'assets/img/logo/logo-name_blue.png';

import DialogInfo from 'components/Dialog/DialogInfo';
import Input from 'components/Input';
import Page from 'components/Page';

import {
  color,
  justifyContent,
  minWidth,
  padding,
  text,
} from 'assets/css/stylesValue';
import { mb3 } from 'assets/css/stylesFix';
import { Button, Col, Div, Wrapper } from 'assets/css/styled';
import { dFlex, mb5, my5 } from 'assets/css/stylesFix';

const Login = () => {
  const theme = useTheme() || {};
  const themeText = theme.text;
  const { partner } = useParams<{ partner: string }>();
  const location = useLocation();
  const urlParams =
    Object.fromEntries(new URLSearchParams(location.search)) || {};
  const { datas, setDatas, handleNotification, handleLoadingOverlay } =
    useUserContext();
  const [showDialogInvalidToken, setShowDialogInvalidToken] = useState(false);
  const [showDialogInvalidUrlParams, setShowDialogInvalidUrlParams] =
    useState(false);
  const [isPageValid, setIsPageValid] = useState(false);

  useEffect(() => {
    const isValidToken =
      utils.store.get('invalidToken') == 'true' ? true : false;
    window.onpopstate = () => {
      history.go(1);
    };
    setShowDialogInvalidToken(isValidToken);
    setIsPageValid(false);

    const permissionGeolocation = () => {
      utils.commons.askLocationAccess(
        (allow) => {
          // if allow
          utils.store.set('latitude', allow.coords.latitude);
          utils.store.set('longitude', allow.coords.longitude);
        },
        () => {
          // if block
          handleNotification({
            isOpen: true,
            message:
              'Mohon ijinkan akses lokasi untuk dapat mengakses website JULO',
          });
        },
      );
    };

    const initStorage = () => {
      const paramsStringify = JSON.stringify({
        urlParams,
        string: location.search,
      });
      setDatas({
        ...datas,
        webType: 'webview',
        params: {
          urlParams,
          string: location.search,
        },
        partner: partner,
        token: '',
        password: '',
        nik: '',
        username: '',
        username_: '',
        pin: '',
        pin_: '',
        email: '',
        appStatus: '',
        applicationId: '',
        customerId: '',
      });
      utils.store.set({
        webType: 'webview',
        params: paramsStringify,
        partner: partner,
        token: '',
        password: '',
        nik: '',
        username: '',
        username_: '',
        pin: '',
        pin_: '',
        email: '',
        appStatus: '',
        applicationId: '',
        customerId: '',
      });
    };

    if (urlParams.page && urlParams.partner_category) {
      permissionGeolocation();
      initStorage();
      permissionGeolocation();
      setShowDialogInvalidUrlParams(false);
      setIsPageValid(true);
    } else {
      setShowDialogInvalidUrlParams(true);
      setIsPageValid(false);
    }
  }, [urlParams.page, urlParams.partner_category]);

  const loginAccount = async () => {
    localStorage.setItem('ktpPhoto', '');
    localStorage.setItem('selfiePhoto', '');
    const payload = {
      username: datas.username,
      pin: datas.pin,
      latitude: utils.store.get('latitude'),
      longitude: utils.store.get('longitude'),
    };
    if (
      !!(urlParams.page && urlParams.partner_category) &&
      datas.pin &&
      datas.username &&
      utils.validator.loginValidator(datas.username)
    ) {
      try {
        handleLoadingOverlay(true);
        const response = await login(payload);

        if (response?.errors?.length === 0) {
          const data = response.data;
          const partnerName = data.applications?.[0].partner_name;

          utils.store.set({
            partner: partnerName,
            token: data.token,
            appStatus: data.applications?.[0].status,
            applicationId: data.applications?.[0].id,
            applicationXId: data.applications?.[0].application_xid,
            customerId: data.customer?.id,
            username: datas.username,
            fullname: data.customer?.fullname,
            email: data.customer?.email,
            nik: data.customer?.nik,
          });

          setDatas({
            ...datas,
            token: data.token,
            partner: partnerName,
            fullname: data.customer?.fullname,
            appStatus: data.applications?.[0].status,
            applicationId: data.applications?.[0].id,
            applicationXId: data.applications?.[0].application_xid,
            customerId: data.customer?.id,
          });
        } else {
          handleNotification({
            isOpen: true,
            message: response?.errors?.[0],
          });
        }

        handleLoadingOverlay(false);
      } catch (error) {
        if (error) {
          const errorData = (error as AxiosError)?.response?.data || {};
          handleLoadingOverlay(false);
          handleNotification({
            isOpen: true,
            message:
              errorData.errors?.length > 0
                ? errorData.errors[0]
                : (error as Error).message,
          });
        }
      }
    } else if (!urlParams.page && !urlParams.partner_category) {
      handleNotification({
        isOpen: true,
        message: 'URL tidak valid',
      });
    } else if (!datas.pin && datas.username) {
      handleNotification({
        isOpen: true,
        message: 'Pin / Kata Sandi tidak boleh kosong',
      });
    } else if (datas.pin && !datas.username) {
      handleNotification({
        isOpen: true,
        message: 'Email / NIK tidak boleh kosong',
      });
    } else if (!datas.pin && !datas.username) {
      handleNotification({
        isOpen: true,
        message: 'Email/NIK,PIN atau Kata Sandi tidak boleh kosong',
      });
    } else if (
      datas.username &&
      !utils.validator.loginValidator(datas.username)
    ) {
      handleNotification({
        isOpen: true,
        message: 'Mohon diisi dengan Email atau NIK yang benar',
      });
    } else if (datas.pin && !utils.validator.pinValidator(datas.pin)) {
      handleNotification({
        isOpen: true,
        message: 'Mohon diisi dengan Email atau NIK yang benar',
      });
    }
  };

  const handleButtonDialogInvalidToken = () => {
    setShowDialogInvalidToken(false);
    utils.store.removeItem('invalidToken');
  };

  const onInputChange = ({ value, type }: { value: string; type: string }) => {
    setDatas((prev) => ({
      ...prev,
      username: type === 'username' ? value : prev.username,
      pin: type === 'pin' ? value : prev.pin,
    }));
  };

  return (
    <Page className={cx(minWidth(MIN_WIDTH), padding('1rem 15px'))}>
      <nav
        className={cx(
          color(themeText?.primary),
          dFlex,
          justifyContent('flex-end'),
          mb5,
        )}
      >
        <Div
          alignItems='center'
          display='flex'
          justifyContent='space-between'
          position='relative'
          width='100%'
        >
          <Div />
          <Div
            fontWeight='bold'
            left='50%'
            position='absolute'
            top='50%'
            transform='translate(-50%, -50%)'
            className={cx(text({ size: 16, fixedSize: true }))}
          >
            Masuk
          </Div>
          <Div>
            <img src={Logo} height='30' />
          </Div>
        </Div>
      </nav>
      <Div display='flex' justifyContent='center'>
        <Div fluid maxWidth={MAX_WIDTH}>
          <Div className={cx(mb3)}>
            <Input
              name='username'
              label='Email / NIK'
              value={datas?.username}
              onChange={(val) =>
                onInputChange({ value: val, type: 'username' })
              }
            />
          </Div>
          <Div className={cx(mb3)}>
            <Input
              name={'pin'}
              label={'Password / PIN'}
              value={datas?.pin}
              onChange={(val) => onInputChange({ value: val, type: 'pin' })}
              type='password'
              inputProps={{ maxLength: 6 }}
            />
          </Div>
          <Wrapper className={cx(my5)} display='flex' justifyContent='center'>
            <Col xs='12' sm='12'>
              <Button
                fluid
                padding='10px 15px'
                disabled={!isPageValid}
                onClick={() => loginAccount()}
              >
                Masuk
              </Button>
            </Col>
          </Wrapper>
        </Div>
      </Div>
      <DialogInfo
        clickOutside={false}
        dialogData={DIALOG_INVALID_TOKEN}
        handleShowDialogInfo={setShowDialogInvalidToken}
        showDialogInfo={showDialogInvalidToken}
        handleClickDialogButton={handleButtonDialogInvalidToken}
      />
      <DialogInfo
        clickOutside={false}
        dialogData={DIALOG_INVALID_URL_PARAMS_WEBVIEW}
        handleShowDialogInfo={setShowDialogInvalidUrlParams}
        showDialogInfo={showDialogInvalidUrlParams}
        handleClickDialogButton={() => {}}
      />
    </Page>
  );
};

export default Login;
