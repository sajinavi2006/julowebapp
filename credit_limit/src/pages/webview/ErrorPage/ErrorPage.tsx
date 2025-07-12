import { ReactNode, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { cx } from '@emotion/css';

import utils from 'utils';
import { useUserContext } from 'providers/UserProvider';

import imgUnregistered from 'assets/img/webview/activation/img-activation_failed_unregistered.webp';
import imgTimeoutError from 'assets/img/webview/activation/img-timeout_error.webp';

import { marginX, minHeight, padding, text } from 'assets/css/stylesValue';
import { Button, Container, Div, Img } from 'assets/css/styled';
import { borderNone, my3, py5 } from 'assets/css/stylesFix';
import { MAX_WIDTH } from 'assets/variable';
import { downloadAppUrl, redirectStatus } from 'constant';

const ErrorPage = () => {
  const history = useHistory();
  const location = useLocation<{ errorType: string }>();
  const urlParams = Object.fromEntries(new URLSearchParams(location.search));
  const theme = useTheme();

  const { datas } = useUserContext();
  const themeColor = theme?.colors;
  const themeText = theme?.text;
  const errorType = (location?.state?.errorType || urlParams?.errorType) ?? '';

  const [content, setContent] = useState<{
    image: null | string;
    title: string;
    description: ReactNode;
    button: {
      text: string;
      destination: string;
      type: string; // url or page
    };
    footer: null | ReactNode;
  }>({
    image: null,
    title: '',
    description: '',
    button: {
      text: '',
      destination: '',
      type: '', // url or page
    },
    footer: null,
  });

  useEffect(() => {
    const footer = (type?: string) => {
      switch (type) {
        case 'activation':
          return (
            <>
              <Div>Mengalami kesulitan aktivasi?</Div>
              <Div>
                Hubungi JULO melalui Info CS :
                <span className={cx(text({ weight: 'bold' }))}>
                  info@julo.co.id
                </span>
              </Div>
            </>
          );
        default:
          return (
            <>
              <Div>Mengalami kesulitan?</Div>
              <Div>
                Hubungi JULO melalui Info CS :
                <span className={cx(text({ weight: 'bold' }))}>
                  info@julo.co.id
                </span>
              </Div>
            </>
          );
      }
    };

    const getContent = () => {
      switch (errorType) {
        case 'unregistered':
          setContent({
            image: imgUnregistered,
            title: 'Aktivasi Gagal',
            description: (
              <>
                <Div>Nomor / Email yang Anda masukkan belum terdaftar.</Div>
                <Div>Silahkan daftar terlebih dahulu.</Div>
              </>
            ),
            button: {
              text: 'Daftar',
              destination: downloadAppUrl,
              type: 'url', // url or page or close
            },
            footer: footer('activation'),
          });
          break;
        case 'verification on process':
          setContent({
            image: imgUnregistered,
            title: 'Aktivasi Gagal',
            description: (
              <>
                <Div>Anda masih dalam proses verifikasi</Div>
                <Div>Silahkan tunggu dan coba melakukan aktivasi kembali</Div>
              </>
            ),
            button: {
              text: 'Kembali',
              destination: '',
              type: 'close', // url or page or close
            },
            footer: footer('activation'),
          });
          break;
        case 'activation system error':
          setContent({
            image: imgTimeoutError,
            title: 'Aktivasi Belum Dapat Diproses',
            description:
              'Sedang terjadi gangguan. Mohon maaf, silahkan coba lagi dalam beberapa saat.',
            button: {
              text: 'Kembali',
              destination: '',
              type: 'close', // url or page or close
            },
            footer: footer('activation'),
          });
          break;
        default:
          setContent({
            image: imgTimeoutError,
            title: 'Perhatian',
            description: 'Sedang terjadi kesalahan, mohon coba kembali',
            button: {
              text: 'Kembali',
              destination: '',
              type: 'close', // url or page or close
            },
            footer: footer(),
          });
          break;
      }
    };

    getContent();
  }, [errorType]);

  const redirectPage = ({
    destination,
    type,
  }: {
    destination: string;
    type: string;
  }) => {
    const paramsStorage = utils.store.get('params');
    const paramsStorageParse = paramsStorage ?? JSON.parse(paramsStorage ?? '');
    const redirectUrl = utils.string.replaceSpace(
      urlParams?.redirect_url || '',
    );

    const redirectUrlWithStatus = (status: string) => {
      return decodeURIComponent(
        `${datas.params?.urlParams.redirect_url}?status=${status}`,
      );
    };
    const errorTypeConvert = errorType.replace(/ /g, '_');

    switch (type) {
      case 'page':
        history.push({
          pathname: destination,
          search: datas?.params?.string || paramsStorageParse?.string,
        });
        break;
      case 'url':
        window.location.replace(destination);
        break;
      case 'close':
        redirectUrl
          ? window.location.assign(redirectUrlWithStatus(errorTypeConvert))
          : window.location.assign(
              `julo://close-webview.julo.co.id?status=${redirectStatus.systemError}`,
            );
        break;
      default:
        break;
    }
  };

  return (
    <Container
      height='100%'
      display='flex'
      justifyContent='center'
      background={themeColor?.white}
    >
      <Div fluid maxWidth={MAX_WIDTH} position='relative'>
        <Div
          textAlign='center'
          className={cx(py5, text({ color: themeText?.primary }))}
        >
          <Img
            fluid
            maxWidth={errorType ? '180px' : '250px'}
            src={content?.image || ''}
            alt='Aktivasi gagal'
          />
          <Div className={cx(text({ size: 18, weight: 'bold' }), my3)}>
            {content?.title}
          </Div>
          <Div
            display='inline-block'
            width='50%'
            className={cx(text({ size: 12 }))}
          >
            {content?.description}
          </Div>
          {content?.button?.text ? (
            <Div className={cx(marginX('15px'))}>
              <Button
                fluid
                onClick={() => redirectPage(content?.button)}
                className={cx(
                  borderNone,
                  padding('11px'),
                  minHeight(48),
                  text({ size: 14, weight: '600' }),
                  my3,
                )}
              >
                {content?.button?.text}
              </Button>
            </Div>
          ) : null}
        </Div>
        <Div
          fluid
          as='footer'
          position='absolute'
          bottom='0'
          textAlign='center'
          className={cx(my3, text({ size: 10, color: themeText?.primary }))}
        >
          {content?.footer}
        </Div>
      </Div>
    </Container>
  );
};

export default ErrorPage;
