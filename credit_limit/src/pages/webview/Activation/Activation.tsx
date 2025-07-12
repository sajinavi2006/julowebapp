import { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { cx } from '@emotion/css';

import {
  DIALOG_INVALID_URL_PARAMS_WEBVIEW,
  MAX_WIDTH,
  MIN_WIDTH,
  whitelistedTnCPartner,
} from 'constant';
import { useUserContext } from 'providers/UserProvider';
import utils from 'utils';

import { applicationDetails } from 'services/webview/activation';

import ArrowLeft from 'assets/img/icon/ic-arrow_left.svg';

import ActivationSuccess from './ActivationSuccess';
import DataConfirmation from './DataConfirmation';
import DialogInfo from 'components/Dialog/DialogInfo';
import ErrorPage from 'pages/webview/ErrorPage';
import OtpVerification from './OtpVerification';
import PinVerification from './PinVerification';
import TnC from './Privacy';
import Page from 'components/Page';
import PageGuard from 'components/PageGuard';
import VerifyPage from './VerifyPage';
import VerifyData from './VerifyData';

import {
  backgroundColor,
  color,
  height,
  justifyContent,
  minWidth,
  padding,
  text,
} from 'assets/css/stylesValue';
import { dFlex, flexColumn, mb3 } from 'assets/css/stylesFix';
import { Div } from 'assets/css/styled';
import LoaderStart from 'components/LoaderStart';
import { Img } from 'assets/css/styled';

const Activation = () => {
  const history = useHistory();
  const location = useLocation();
  const { otp_type, auth, redirect_url, partner } = Object.fromEntries(
    new URLSearchParams(location.search),
  );
  const theme = useTheme();
  const themeColors = theme.colors;
  const themeText = theme.text;
  const [header, setHeader] = useState<{
    navigationBack?: string;
    title: string;
  }>({
    navigationBack: 'close',
    title: 'Aktivasi',
  });
  const { setDatas } = useUserContext();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoaderMounted, setIsLoaderMounted] = useState(true);
  const [showDialogInvalidUrlParams, setShowDialogInvalidUrlParams] =
    useState(false);
  const { page, type } = useParams<{ page: string; type: string }>();

  const paramsStorage = utils.store.get('params');
  const paramsStorageParse = paramsStorage ? JSON.parse(paramsStorage) : {};

  useEffect(() => {
    const initStorage = () => {
      // /\s/g for white space
      const secretKey = auth?.replace(/\s/g, '+');
      const paramsStringify = JSON.stringify({
        urlParams: {
          redirect_url,
          otp_type,
        },
        auth: secretKey,
        string: location.search,
      });

      utils.store.set({
        webType: 'webview',
        params: paramsStringify,
        partner: partner || '',
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
        partner_origin_name: '',
      });
    };

    const fetchDataConfirmation = async () => {
      const isFirstMount = utils.store.get('firstMount');

      setIsMounted(true);
      try {
        const result = await applicationDetails();
        const partnerOriginName = result.data?.partner_name;

        if (result?.success) {
          if (!result?.data?.is_registered) {
            setIsLoaderMounted(false);

            history.push('error', { errorType: 'unregistered' });
          } else {
            if (result?.data?.application?.application_status < 190) {
              setIsLoaderMounted(false);

              history.push('error', { errorType: 'verification on process' });
            } else {
              const paramsStringify = JSON.stringify({
                urlParams: {
                  redirect_url,
                  otp_type,
                },
                auth: auth,
                email: result?.data?.application?.email,
                phone: result?.data?.application?.phone,
                redirect_url: result?.data?.redirect_url,
                string: location.search,
              });
              setDatas((prev) => ({
                ...prev,
                isLoaderStart: false,
                partner_origin_name: partnerOriginName,
                params: {
                  ...prev.params,
                  urlParams: {
                    redirect_url,
                    otp_type,
                  },
                  auth: auth,
                  string: location.search,
                  email: result?.data?.application?.email,
                  phone: result?.data?.application?.phone,
                  redirect_url: result?.data?.redirect_url,
                },
              }));
              utils.store.set({
                params: paramsStringify,
                partner_origin_name: partnerOriginName,
              });
            }
          }
        } else {
          setIsLoaderMounted(false);

          history.push('error', { errorType: 'activation system error' });
        }

        setDatas((prev) => ({
          ...prev,
          isLoaderStart: true,
        }));

        if (isFirstMount) {
          setIsLoaderMounted(false);

          utils.store.set('firstMount', false);
        } else {
          setIsLoaderMounted(false);

          utils.store.set('firstMount', true);
        }

        return { partnerOriginName };
      } catch (error) {
        setIsLoaderMounted(false);
        history.push('error', { errorType: 'system error' });
      }
    };

    const checkPage = async () => {
      if (page === 'error') {
        setHeader({
          title: 'Aktivasi',
        });

        setIsLoaderMounted(false);
        setIsMounted(true);
      } else {
        switch (type) {
          case 'data-confirmation':
            if (auth && redirect_url && otp_type) {
              setHeader({
                navigationBack: 'close',
                title: 'Aktivasi',
              });
              setDatas((params) => ({
                ...params,
                invalidParams: false,
              }));
              setShowDialogInvalidUrlParams(false);
            } else {
              setDatas((params) => ({
                ...params,
                invalidParams: true,
              }));
              setShowDialogInvalidUrlParams(true);
            }

            initStorage();
            fetchDataConfirmation();
            break;
          case 'tnc':
            await initStorage();
            const result = await fetchDataConfirmation();
            const partnerOriginName = result?.partnerOriginName;

            if (
              auth &&
              redirect_url &&
              whitelistedTnCPartner.includes(partner || partnerOriginName)
            ) {
              setHeader({
                navigationBack: 'close',
                title: 'Terms and Conditions',
              });
              setDatas((params) => ({
                ...params,
                invalidParams: false,
              }));
              setShowDialogInvalidUrlParams(false);
            } else {
              setDatas((params) => ({
                ...params,
                invalidParams: true,
              }));
              setShowDialogInvalidUrlParams(true);
            }
            break;
          case 'otp-verification':
            setHeader({
              navigationBack: 'data-confirmation',
              title: 'Masukkan Kode Verifikasi',
            });

            setIsLoaderMounted(false);
            setIsMounted(true);
            break;
          case 'pin-verification':
            setHeader({
              navigationBack: 'data-confirmation',
              title: 'Verifikasi',
            });

            setIsLoaderMounted(false);
            setIsMounted(true);
            break;
          case 'activation-success':
            setHeader({
              title: 'Aktivasi',
            });

            setIsLoaderMounted(true);
            setIsMounted(true);
            break;
          case 'error':
            setHeader({
              title: 'Aktivasi',
            });

            setIsLoaderMounted(false);
            setIsMounted(true);
            break;
          case 'verify-page':
            if (auth && redirect_url) {
              setDatas((params) => ({
                ...params,
                invalidParams: false,
              }));
              setShowDialogInvalidUrlParams(false);
              utils.store.set('firstMount', false);
              setIsMounted(true);
            } else {
              setDatas((params) => ({
                ...params,
                invalidParams: true,
              }));
              setShowDialogInvalidUrlParams(true);
            }

            initStorage();
            break;
          case 'verify-data':
            setDatas((params) => ({
              ...params,
              invalidParams: false,
            }));
            setShowDialogInvalidUrlParams(false);
            setIsMounted(true);
            break;
          default:
            history.push({
              pathname: '/view/activation/data-confirmation',
              search: location.search || paramsStorageParse?.string,
            });
            break;
        }
      }
    };

    setIsMounted(false);

    checkPage();

    setDatas((prev) => ({
      ...prev,
      partner: partner || '',
      partner_origin_name: '',
      params: {
        urlParams: {
          redirect_url,
          otp_type,
        },
        ...paramsStorageParse,
        auth: auth,
        string: location.search || paramsStorageParse?.string,
      },
    }));
  }, [type]);

  const renderPage = () => {
    const isFirstMount = utils.store.get('firstMount');

    if (page === 'error') {
      return <ErrorPage />;
    } else {
      switch (type) {
        case 'data-confirmation':
          return isLoaderMounted && !isFirstMount ? (
            <Div
              height='100%'
              display='flex'
              justifyContent='center'
              alignItems='center'
              className={cx(text({ size: 40 }))}
            >
              <LoaderStart />
            </Div>
          ) : (
            <DataConfirmation />
          );
        case 'tnc':
          return isLoaderMounted && !isFirstMount ? (
            <Div
              height='100%'
              display='flex'
              justifyContent='center'
              alignItems='center'
              className={cx(text({ size: 40 }))}
            >
              <LoaderStart />
            </Div>
          ) : (
            <TnC />
          );
        case 'otp-verification':
          return (
            <PageGuard
              previousAllowedState={['data-confirmation', 'verify-data']}
              restrictedTo='/view/activation/data-confirmation'
            >
              <OtpVerification />
            </PageGuard>
          );
        case 'pin-verification':
          return (
            <PageGuard
              previousAllowedState={['otp-verification', 'otp-verify']}
              restrictedTo='/view/activation/data-confirmation'
            >
              <PinVerification />
            </PageGuard>
          );
        case 'activation-success':
          return (
            <PageGuard
              previousAllowedState='pin-verification'
              restrictedTo='/view/activation/data-confirmation'
            >
              <ActivationSuccess />
            </PageGuard>
          );
        case 'verify-page':
          return <VerifyPage />;
        case 'verify-data':
          return (
            <PageGuard
              previousAllowedState='verify-page'
              restrictedTo='/view/activation/verify-page'
            >
              <VerifyData />
            </PageGuard>
          );
        case 'error':
          return <ErrorPage />;
        default:
          return <DataConfirmation />;
      }
    }
  };

  const goBack = () => {
    const paramsStorage = utils.store.get('params');
    const paramsStorageParse = paramsStorage ? JSON.parse(paramsStorage) : {};
    if (header.navigationBack) {
      if (header.navigationBack === 'close') {
        window.history.back();
      } else {
        history.replace({
          pathname: header.navigationBack,
          search: location.search || paramsStorageParse?.string,
        });
      }
    }
  };

  const memoizeRenderPage = useCallback(renderPage, [type, isLoaderMounted]);

  return (
    <Page
      className={cx(
        'activation',
        dFlex,
        flexColumn,
        minWidth(MIN_WIDTH),
        height('100vh'),
      )}
    >
      {isMounted ? (
        <>
          {!isLoaderMounted ? (
            <nav
              className={cx(
                color(themeText.primary),
                dFlex,
                justifyContent('flex-end'),
                mb3,
                padding('1rem 15px'),
                backgroundColor(themeColors.white),
              )}
            >
              <Div
                alignItems='center'
                display='flex'
                justifyContent='space-between'
                position='relative'
                width='100%'
              >
                <Div
                  position='relative'
                  onClick={() => goBack()}
                  cursor={header.navigationBack && 'pointer'}
                >
                  {header.navigationBack ? (
                    <Img
                      src={ArrowLeft}
                      height='12'
                      position='absolute'
                      transform='translate(0%, -50%)'
                    />
                  ) : null}
                </Div>
                <Div
                  fontWeight='bold'
                  textAlign='center'
                  className={cx(text({ size: 16, fixedSize: true }))}
                >
                  {header.title}
                </Div>
                <Div />
              </Div>
            </nav>
          ) : null}
          <Div display='flex' justifyContent='center' flexBasis='100%'>
            <Div fluid maxWidth={MAX_WIDTH}>
              {memoizeRenderPage()}
            </Div>
          </Div>
        </>
      ) : null}
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

export default Activation;
