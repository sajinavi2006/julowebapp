import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import { ButtonFloatingSmall } from 'assets/css/styled';
import { borderX, borderY } from 'assets/css/stylesValue';

import { useUserContext } from 'providers/UserProvider';
import utils from 'utils';

import faq from 'assets/img/icon/ic-faq.svg';
import ojk from 'assets/img/OJK.svg';
import ApplicationPage from 'components/ApplicationPage';
import Dialog from 'components/Dialog';
import PageGuard from 'components/PageGuard';

import { register, scrapData } from 'services/auth';
import { termsPrivacy } from 'services/form';
import { createPinAndRegister } from 'services/pin';
import Analytics from 'utils/Analytics/Analytics';
import useGeolocation from 'hooks/use-geolocation';

const PRIVACY_STYLE = `
    <style>
        body {
            font-size: 12px;
            color: #5E5E5E;
            line-height: 1.5;
            font-family: sans-serif;
            letter-spacing: 0.2px;
        }
    </style>
`;

function Privacy() {
  const { partner } = useParams();
  const { datas, setDatas, handleNotification, handleLoadingOverlay } =
    useUserContext();
  const [htmlContent, setHtmlContent] = useState(null);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [heightIframe, setHeightIframe] = useState(99999);
  const history = useHistory();
  const { search } = useLocation();
  const iframe = useRef(null);
  const bottomPage = useRef(null);
  const queryParams = new URLSearchParams(search);

  const appXid = queryParams.get('application_xid');
  const xid = queryParams.get('xid');
  const isPartnerKlop = partner === 'klop' && appXid && xid;

  const fetchPrivacyData = async () => {
    try {
      const response = await termsPrivacy();

      setHeightIframe(
        iframe?.current?.contentDocument?.activeElement?.clientHeight + 40,
      );

      setHtmlContent(response);
    } catch (error) {
      const errorData = error.response.data || {};
      const errMessage = error.response?.message;
      const errResult =
        errorData?.errors?.length > 0
          ? errorData.errors[0]
          : errMessage ?? 'Network Error';

      handleNotification({
        isOpen: true,
        message: errResult,
      });
      handleLoadingOverlay(false);
    }
  };

  const handleRegister = async () => {
    const pin = utils.store.get('pin');

    try {
      handleLoadingOverlay(true);
      let response;
      if (isPartnerKlop) {
        // create pin and register using create pin api for klop partner
        response = await createPinAndRegister(
          {
            xid,
            pin,
          },
          utils.store.get('expiryPinToken'),
        );
        utils.store.removeItem('expiryPinToken');
        utils.store.set('email', response.data.customer.email);
      } else {
        const payload = {
          username: utils.store.get('nik'),
          web_version: datas.webVersion,
          pin: pin,
          email: utils.store.get('email'),
          latitude: utils.store.get('latitude'),
          longitude: utils.store.get('longitude'),
          otp_request_id: utils.store.get('requestId'),
          partner_name: partner,
        };

        response = await register(payload);
      }

      const data = response?.data || {};
      if (data.errors?.length > 0) {
        handleNotification({
          isOpen: true,
          message: response?.errors[0],
        });
        handleLoadingOverlay(false);
      } else {
        const browserVersion = navigator.appVersion.split(' ');
        const paramsScrapData = {
          data_trigger_location: 'user_register',
          application_id: data.applications?.[0]?.id,
          browser_name: navigator?.appCodeName,
          browser_version: `${browserVersion[0]} ${browserVersion[1]}`,
          platform_type: navigator?.userAgentData?.mobile
            ? 'mobile'
            : navigator?.platform,
          engine_name: navigator?.appName,
          engine_version: null,
          device_model: null,
          os_name: navigator?.oscpu || null,
          os_version: null,
          os_version_name: null,
          bot: {},
        };
        await scrapData({
          payload: paramsScrapData,
          token: data.token,
        });

        const savedData = {
          token: data.token,
          appStatus: data.applications[0].status,
          applicationId: data.applications[0].id,
          customerId: data.customer.id,
          phone: data.customer.phone,
        };

        utils.store.set(savedData);
        setDatas({
          ...datas,
          ...savedData,
        });

        utils.store.removeItem(['pin', 'password']);
        localStorage.setItem('ktpPhoto', '');
        localStorage.setItem('selfiePhoto', '');
        history.replace(`/${partner}/application/personal_identity`);

        handleLoadingOverlay(false);
      }
    } catch (error) {
      const errorData = error.response.data || {};
      const errMessage = error.response?.message;
      const errResult =
        errorData?.errors?.length > 0
          ? errorData.errors[0]
          : errMessage ?? 'Network Error';

      handleNotification({
        isOpen: true,
        message: errResult,
      });
      handleLoadingOverlay(false);
    }
  };

  const { isPermissionGranted } = useGeolocation({
    enabled: true,
    onPermissionGranted: (position) => {
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

  const clearData = () => {
    utils.store.set('nik', '');
    utils.store.set('email', '');
  };

  const handleAction = async (value) => {
    if (value) {
      Analytics.logEvent({
        title: 'tnc_screen',
        eventName: 'agree_button_clicked',
      });

      if (!isPermissionGranted) {
        return handleNotification({
          isOpen: true,
          message:
            'Mohon ijinkan akses lokasi untuk dapat mengakses website JULO',
        });
      }

      handleRegister();
    } else {
      Analytics.logEvent({
        title: 'tnc_screen',
        eventName: 'disagree_button_clicked',
      });
      clearData();
      if (isPartnerKlop) {
        window.location.assign('https://klop.co');
      } else {
        history.replace('signup');
      }
    }
  };

  useEffect(() => {
    fetchPrivacyData();
  }, []);

  if (!htmlContent) {
    return null;
  }

  return (
    htmlContent && (
      <PageGuard previousAllowedState='pin' restrictedTo={`/${partner}/signup`}>
        <ApplicationPage
          useHeader
          style={{
            backgroundColor: '#fff',
            height: '100%',
            overflow: 'auto',
          }}
        >
          <div className='container policy-section'>
            <div className='row'>
              <div className='col-12'>
                <img src={faq} className='img-faq' />
                <h4 className='text-blue text-center'>Privasi Pengguna</h4>

                <iframe
                  onLoad={() => {
                    setHeightIframe(
                      iframe?.current?.contentDocument?.activeElement
                        ?.clientHeight - 100,
                    );
                    iframe.current.contentDocument.head.innerHTML =
                      iframe?.current?.contentDocument?.head?.innerHTML +
                      PRIVACY_STYLE;
                  }}
                  ref={iframe}
                  srcDoc={htmlContent.preface}
                  width='100%'
                  height={`${heightIframe}px`}
                  className='border-0'
                />

                <div>
                  Baca lebih lengkap di
                  <span
                    className='mx-1 text-blue cursor-pointer'
                    onClick={() => setShowPrivacyPolicy(true)}
                  >
                    Kebijakan Privasi
                  </span>
                  JULO
                </div>
                <div className='bordered-bottom-light py-5'>
                  <button
                    onClick={() => handleAction(true)}
                    className='btn btn-blue w-100 py-3 mb-2'
                  >
                    Setuju
                  </button>
                  <button
                    onClick={() => handleAction(false)}
                    className='btn btn-secondary w-100 py-3'
                  >
                    Tidak Setuju
                  </button>
                </div>
                <div ref={bottomPage} className='w-100 text-center py-3'>
                  <span className='d-block text-sm mb-2'>
                    Berizin dan diawasi oleh
                  </span>
                  <img src={ojk} alt='' />
                </div>
              </div>
            </div>
          </div>
        </ApplicationPage>
        <ButtonFloatingSmall
          onClick={() => {
            bottomPage.current.scrollIntoView({
              behavior: 'smooth',
            });
          }}
        >
          <div className='floatingButtonText'>^</div>
        </ButtonFloatingSmall>
        <Dialog show={showPrivacyPolicy} getShow={setShowPrivacyPolicy} fluid>
          <div className='h-100 d-flex flex-column'>
            <h3 className='w-100 font-weight-bold text-center text-blue my-3'>
              KEBIJAKAN PRIVASI
            </h3>

            <iframe
              srcDoc={htmlContent.text.replace('\n', '')}
              width='100%'
              height='100%'
              className={`${borderX('0px solid #ccc')} ${borderY(
                '1px solid #ccc',
              )}`}
            />

            <button
              onClick={() => setShowPrivacyPolicy(false)}
              className='btn btn-outline text-blue w-100 py-3'
            >
              Tutup
            </button>
          </div>
        </Dialog>
      </PageGuard>
    )
  );
}

export default Privacy;
