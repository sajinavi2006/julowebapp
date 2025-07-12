import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { cx } from '@emotion/css';

import utils from 'utils';
import Analytics from 'utils/Analytics/Analytics';
import { blacklistedRegisterFlowJ1, DIALOG_INVALID_TOKEN } from 'constant';
import { login, scrapData } from 'services/auth';
import { useUserContext } from 'providers/UserProvider';
import useGeolocation from 'hooks/use-geolocation';

import bgLogin from 'assets/img/background/bg-J1_login.png';
import logo from 'assets/img/logo-vertical.svg';
import ojk from 'assets/img/OJK.svg';
import icLock from 'assets/img/icon/ic-locked_form.svg';
import icEnvelope from 'assets/img/icon/ic-envelope.svg';

import Page from 'components/Page';
import DialogInfo from 'components/Dialog/DialogInfo';
import Input from 'components/Input';

import {
  backgroundImage,
  height,
  text,
  translate,
} from 'assets/css/stylesValue';
import { Button, Col, Div, Img, Row, Wrapper } from 'assets/css/styled';
import {
  mb2,
  mb3,
  mt5,
  mx1,
  my3,
  pb5,
  pt3,
  px3,
  py2,
} from 'assets/css/stylesFix';
import { cursorPointer } from 'assets/css/stylesFix';

const Login = () => {
  const history = useHistory();
  const { partner } = useParams();
  const theme = useTheme() || {};
  const themeColors = theme.colors || {};
  const { datas, setDatas, handleLoadingOverlay, handleNotification } =
    useUserContext();
  const blacklistedRegister = !blacklistedRegisterFlowJ1.includes(partner);
  const [showDialogInvalidToken, setShowDialogInvalidToken] = useState(false);
  const Navigator = navigator || {};

  const redirectPage = (value) => {
    if (value === 'signup') {
      const route = `/${partner}/signup`;
      return (window.location.href = route);
    }
    history.push(value);
  };

  const loginAccount = async () => {
    localStorage.setItem('ktpPhoto', '');
    localStorage.setItem('selfiePhoto', '');

    const latitude = utils.store.get('latitude');
    const longitude = utils.store.get('longitude');

    if (!latitude && !longitude) {
      return handleNotification({
        isOpen: true,
        message:
          'Mohon ijinkan akses lokasi untuk dapat mengakses website JULO',
      });
    }

    const payload = {
      username: datas.username,
      web_version: datas.webVersion,
      pin: datas.pin,
      email: '',
      partner_name: partner,
      latitude: utils.store.get('latitude'),
      longitude: utils.store.get('longitude'),
    };

    if (
      datas.pin &&
      datas.username &&
      utils.validator.loginValidator(datas.username)
    ) {
      try {
        handleLoadingOverlay(true);
        const response = await login(payload);

        if (response.errors?.length === 0) {
          const data = response.data || {};

          if (!data.eligible_access?.is_eligible) {
            handleLoadingOverlay(false);
            handleNotification({
              isOpen: true,
              message:
                'Anda tidak dapat masuk ke website ini, silakan login melalui aplikasi Julo.',
            });
            return;
          }

          const browserVersion = Navigator.appVersion.split(' ');
          const paramsScrapData = {
            data_trigger_location: 'user_login',
            application_id: data.applications?.[0]?.id,
            browser_name: Navigator.appCodeName,
            browser_version: `${browserVersion[0]} ${browserVersion[1]}`,
            platform_type: Navigator.userAgentData?.mobile
              ? 'mobile'
              : Navigator.platform,
            engine_name: Navigator.appName,
            engine_version: null,
            device_model: null,
            os_name: Navigator.oscpu || null,
            os_version: null,
            os_version_name: null,
            bot: {},
          };
          await scrapData({
            payload: paramsScrapData,
            token: response.data.token,
          });

          utils.store.set({
            partner,
            token: data.token,
            appStatus: data.applications?.[0].status,
            applicationId: data.applications?.[0].id,
            customerId: data.customer?.id,
            username: datas.username,
            fullname: data.customer?.fullname,
            email: data.customer?.email,
            nik: data.customer?.nik,
          });
          setDatas({
            ...datas,
            token: data.token,
            partner,
            fullname: data.customer?.fullname,
            appStatus: data.applications?.[0].status,
            applicationId: data.applications?.[0].id,
            customerId: data.customer?.id,
          });
        } else {
          const errMessage = response.errors?.[0];
          handleNotification({
            isOpen: true,
            message: errMessage,
          });
        }

        handleLoadingOverlay(false);
      } catch (error) {
        if (error) {
          const errorData = error?.response?.data || {};

          handleLoadingOverlay(false);

          if (errorData.data?.continue_in_apps) {
            redirectPage('open-app');
          } else {
            const errMessage =
              errorData.errors?.length > 0
                ? errorData.errors?.[0]
                : error.message;

            handleNotification({
              isOpen: true,
              message: errMessage,
            });
          }
        }
      }
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

  const { isPermissionGranted } = useGeolocation({
    enabled: true,
    onPermissionGranted: (position) => {
      Analytics.logEvent({
        title: 'sign_in',
        eventName: 'location_permission_granted',
      });

      const { latitude, longitude } = position.coords;

      utils.store.set('latitude', latitude);
      utils.store.set('longitude', longitude);
    },
    onPermissionDenied: () => {
      handleNotification({
        isOpen: true,
        message:
          'Mohon ijinkan akses lokasi untuk dapat mengakses website JULO',
      });
    },
  });

  const handleOnLogin = () => {
    if (!isPermissionGranted) {
      return handleNotification({
        isOpen: true,
        message:
          'Mohon ijinkan akses lokasi untuk dapat mengakses website JULO',
      });
    }
    loginAccount();
  };

  const handleButtonDialogInvalidToken = () => {
    setShowDialogInvalidToken(false);
    utils.store.removeItem('invalidToken');
  };

  const onInputChange = ({ value, type }) => {
    setDatas((prev) => ({
      ...prev,
      username: type === 'username' ? value : prev.username,
      pin: type === 'pin' ? value : prev.pin,
    }));
  };

  useEffect(() => {
    const isValidToken =
      utils.store.get('invalidToken') == 'true' ? true : false;
    setShowDialogInvalidToken(isValidToken);
    setDatas({
      ...datas,
      webType: 'webapp',
      partner: partner,
      token: '',
      password: '',
      nik: '',
      email: '',
      appStatus: '',
      applicationId: '',
      customerId: '',
    });
    utils.store.set({
      webType: 'webapp',
      partner: partner,
      token: '',
      password: '',
      nik: '',
      email: '',
      appStatus: '',
      applicationId: '',
      customerId: '',
    });
  }, []);

  return (
    <Page useHeader>
      <Div minHeight='100vh' className={backgroundImage(bgLogin)}>
        <Wrapper className={translate('0px', '20vh')}>
          <Row justifyContent='center' alignItems='center'>
            <Col
              xs='12'
              sm='12'
              md='4'
              lg='3'
              textAlign='center'
              marginBottom='30px'
            >
              <Div marginBottom='30px'>
                <Img src={logo} />
              </Div>
              <Div>
                <Input
                  name={'username'}
                  label={'Email / NIK'}
                  value={datas?.username}
                  onChange={(val) =>
                    onInputChange({ value: val, type: 'username' })
                  }
                  isOutlined={true}
                  hiddenLabel={true}
                  startAdornment={<Img src={icEnvelope} />}
                  className={mb3}
                  classNameInput={cx(height('39px'), px3)}
                />
              </Div>
              <Div>
                <Input
                  name={'pin'}
                  label={'PIN / Kata Sandi'}
                  value={datas?.pin}
                  onChange={(val) => onInputChange({ value: val, type: 'pin' })}
                  hiddenLabel={true}
                  isNumeric={true}
                  isOutlined={true}
                  type={'password'}
                  startAdornment={<Img src={icLock} />}
                  className={mb3}
                  classNameInput={cx(height('39px'), px3)}
                  inputProps={{ maxLength: 6 }}
                />
              </Div>
              <Div
                textAlign='center'
                className={cx(
                  my3,
                  cursorPointer,
                  text({
                    size: 12,
                    color: themeColors.white,
                    decoration: 'underline',
                  }),
                )}
                onClick={() => redirectPage('forgot-password')}
              >
                Lupa PIN/Kata Sandi?
              </Div>
              <Button
                fluid
                className={cx(py2, text({ size: 14 }))}
                onClick={handleOnLogin} // ask location permission first before login
              >
                Masuk
              </Button>

              <Div
                display='flex'
                justifyContent='center'
                textAlign='center'
                borderBottom='1px solid hsla(0,0%,100%,.6)'
                className={cx(
                  mb3,
                  mt5,
                  pb5,
                  pt3,
                  text({
                    size: 12,
                    color: themeColors.white,
                  }),
                )}
              >
                {blacklistedRegister && (
                  <>
                    <Div className={mx1}>Belum punya akun?</Div>
                    <Div
                      className={cx(
                        cursorPointer,
                        mx1,
                        text({
                          weight: 'bold',
                          decoration: 'underline',
                        }),
                      )}
                      onClick={() => redirectPage('signup')}
                    >
                      Daftar Sekarang
                    </Div>
                  </>
                )}
              </Div>
              <Div
                className={cx(
                  mb2,
                  text({ size: 12, color: themeColors.white }),
                )}
              >
                Berizin dan diawasi oleh
              </Div>
              <Div>
                <Img src={ojk} />
              </Div>
            </Col>
          </Row>
        </Wrapper>
      </Div>
      <DialogInfo
        clickOutside={false}
        dialogData={DIALOG_INVALID_TOKEN}
        handleShowDialogInfo={setShowDialogInvalidToken}
        showDialogInfo={showDialogInvalidToken}
        handleClickDialogButton={handleButtonDialogInvalidToken}
      />
    </Page>
  );
};

export default Login;
