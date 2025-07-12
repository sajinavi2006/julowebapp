import { useHistory } from 'react-router-dom';
import { cx } from '@emotion/css';
import { useTheme } from '@emotion/react';

import verifyAccount from 'assets/img/webview/activation/verifikasi-akun.png';

import { Button, Div, Img, Container } from 'assets/css/styled';
import { text, translate, bottom, padding } from 'assets/css/stylesValue';
import BarBack from 'components/BarBack';

const VerifyPage = () => {
  const theme = useTheme();
  const themeText = theme?.text;
  const themeColor = theme?.colors;
  const history = useHistory();

  const handleAction = () => {
    history.replace('verify-data', { from: 'verify-page' });
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
      <Div className={translate('0px', '50%')}>
        <Img src={verifyAccount}></Img>
        <Div
          marginTop='32px'
          className={cx(
            text({ size: 16, color: themeText?.primary, weight: 'bold' }),
          )}
        >
          Verifikasi Akun
        </Div>
        <Div
          marginTop='8px'
          className={cx(text({ size: 14, color: themeText?.primary }))}
        >
          Untuk melanjutkan transaksi, lakukan verifikasi akun JULOmu terlebih
          dahulu
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
            text({ size: 16, color: themeText?.primary, weight: 'bold' }),
          )}
          onClick={handleAction}
        >
          Verifikasi
        </Button>
      </Div>
    </Container>
  );
};

export default VerifyPage;
