import { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { ButtonFloatingSmall } from 'assets/css/styled';
import { borderX, borderY } from 'assets/css/stylesValue';

import { useUserContext } from 'providers/UserProvider';

import faq from 'assets/img/icon/ic-faq.svg';
import ojk from 'assets/img/OJK.svg';
import Dialog from 'components/Dialog';

import { termsPrivacy } from 'services/form';
import LoaderText from 'components/LoaderText';
import { AxiosError } from 'axios';

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
  const { handleNotification, handleLoadingOverlay } = useUserContext();
  const [htmlContent, setHtmlContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [heightIframe, setHeightIframe] = useState(99999);
  const history = useHistory();
  const iframe = useRef<HTMLIFrameElement>(null);
  const bottomPage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPrivacyData = async () => {
      try {
        setIsLoading(true);
        const response = await termsPrivacy();
        setHeightIframe(
          (iframe?.current?.contentDocument?.activeElement?.clientHeight ?? 0) +
            40,
        );

        setHtmlContent(response);
        setIsLoading(false);
      } catch (err) {
        const error = err as AxiosError;
        if (error) {
          handleLoadingOverlay(false);
          handleNotification({
            isOpen: true,
            message:
              error?.response?.data?.errors?.length > 0
                ? error?.response?.data?.errors[0]
                : (error as Error)?.message,
          });
        }
      }
    };

    fetchPrivacyData();
  }, []);

  const handleAction = () => {
    history.replace({
      pathname: 'data-confirmation',
      search: location.search,
    });
  };

  if (!htmlContent) {
    return null;
  }

  return htmlContent && !isLoading ? (
    <div>
      <div className='container policy-section'>
        <div className='row'>
          <div className='col-12'>
            <img src={faq} className='img-faq' />
            <h4 className='text-blue text-center'>Privasi Pengguna</h4>

            <iframe
              onLoad={() => {
                setHeightIframe(
                  (iframe?.current?.contentDocument?.activeElement
                    ?.clientHeight ?? 0) - 100,
                );

                if (iframe?.current?.contentDocument) {
                  iframe.current.contentDocument.head.innerHTML =
                    iframe?.current?.contentDocument?.head?.innerHTML +
                    PRIVACY_STYLE;
                }
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
                onClick={handleAction}
                className='btn btn-blue w-100 py-3 mb-2'
              >
                Setuju
              </button>
              <button
                onClick={handleAction}
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
      <ButtonFloatingSmall
        onClick={() => {
          bottomPage?.current?.scrollIntoView({
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
    </div>
  ) : (
    <LoaderText width='30px' />
  );
}

export default Privacy;
