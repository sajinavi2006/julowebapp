import { cx } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { useUserContext } from 'providers/UserProvider';

import BarBack from 'components/BarBack';

import verifySelesai from 'assets/img/webview/activation/verifikasi-selesai.png';

import { Button, Div, Img, Container } from 'assets/css/styled';
import { text, translate, bottom, padding } from 'assets/css/stylesValue';
import { redirectStatus } from 'constant';

const ActivationSuccess = () => {
  const theme = useTheme();
  const themeText = theme.text;
  const themeColor = theme.colors;
  const { datas } = useUserContext();
  const decodeURL = decodeURIComponent(
    `${datas.params?.urlParams?.redirect_url}?status=${redirectStatus.activationSuccess}`,
  );

  const handleAction = async () => {
    window.location.replace(decodeURL);
  };

  return (
    <Container
      position='relative'
      textAlign='center'
      height='100%'
      background={themeColor?.white}
    >
      <BarBack
        title='Verifikasi'
        color={themeColor?.white}
        backgroundColor='#1ea7e9'
        disableRedirect
        hideImage
      />
      <Div textAlign='center' className={translate('0px', '50%')}>
        <Img src={verifySelesai} />
        <Div
          marginTop='32px'
          className={cx(
            text({ size: 16, color: themeText.primary, weight: 'bold' }),
          )}
        >
          Akun Berhasil Tersambung
        </Div>
        <Div
          marginTop='8px'
          className={cx(text({ size: 14, color: themeText.primary }))}
        >
          Kamu berhasil melakukan penyambungan akun. Kamu akan otomatis
          tersambung ketika melakukan transaksi berikutnya
        </Div>
      </Div>
      <Div
        fluid
        position='absolute'
        className={cx(bottom('0'), padding('24px 15px'))}
      >
        <Button
          fluid
          height='48px'
          className={cx(
            padding('11px'),
            text({ size: 16, color: themeText.primary, weight: 'bold' }),
          )}
          onClick={() => {
            handleAction();
          }}
        >
          Oke
        </Button>
      </Div>
    </Container>
  );
};

export default ActivationSuccess;
