import React from 'react';
import openApp from 'assets/img/partner/j1/img/open-app.svg';
import { Div, Img, Button } from 'assets/css/styled';
import { cx } from '@emotion/css';

import {
  MIN_WIDTH,
  NAVBAR_MENU_AUTH,
  downloadAppUrl
} from 'constant';

import {
  color,
  fontSize,
  fontWeight
} from 'assets/css/stylesValue';

import { Container, Main, Wrapper } from 'assets/css/styled';
import { py3, mt3, my2 } from 'assets/css/stylesFix';
import { paddingTop } from 'assets/css/stylesValue';

import logoName from 'assets/img/logo-horizontal.svg';
import NavBar from 'components/NavBar';


const OpenApp = () => {

  const redirectPage = (value) => {
    window.open(value, '_blank');
  };

  return (
    <Container>
      <Main>
        <NavBar menu={NAVBAR_MENU_AUTH} logo={logoName} />
        <Container>
          <Wrapper
            width={'100%'}
            height={'100%'}
            minHeight={'100vh'}
            display={'flex'}
            minWidth={MIN_WIDTH}
            backgroundColor='#fff'
            className={`${py3} ${paddingTop('80px!important')}`}
          >
            <Div textAlign='center' width='100%' maxWidth='328px' margin='auto'>
              <Img width="100%" src={openApp}></Img>
              <Div className={cx(mt3, color('#1ea7e9'), fontSize(16), fontWeight('bold'))}>
                Lanjutkan Transaksi di Aplikasi JULO, Yuk!
              </Div>
              <Div className={cx(my2, color('#5e5e5e'), fontSize(12))}>
                Kamu sudah mendaftar menggunakan email ini lewat aplikasi di hp kamu
              </Div>
              <Button onClick={()=>{ redirectPage(downloadAppUrl); }} type={'primary'}>Buka Aplikasi</Button>
            </Div>
          </Wrapper>
        </Container>
      </Main>
    </Container>
  );
};

export default OpenApp;