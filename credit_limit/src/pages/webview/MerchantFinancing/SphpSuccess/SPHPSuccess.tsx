import { useEffect } from 'react';
import { cx } from '@emotion/css';

import utils from 'utils';

import Layout from 'components/Layout';

import imgSPHPSuccess from 'assets/img/partner/merchantFinancing/img/SPHP-success.webp';

import { Div } from 'assets/css/styled';
import {
  h100,
  my4,
  positionAbsolute,
  textCenter,
  translateCenter,
} from 'assets/css/stylesFix';
import { width } from 'assets/css/stylesValue';

function SPHPSuccess() {
  useEffect(() => {
    utils.store.clearAllItem();
  }, []);

  return (
    <Layout
      layoutContainer={{ height: '100%' }}
      hideBarBack
      hideNavbarMenu
      disableClickLogo
    >
      <Div className={cx(h100)}>
        <Div
          className={cx(
            positionAbsolute,
            translateCenter,
            textCenter,
            width('80%'),
          )}
        >
          <img src={imgSPHPSuccess} />
          <Div className={cx(my4)}>
            <Div>Proses tanda tangan elektronik telah berhasil,</Div>
            <Div>mohon menunggu untuk proses aktivasi limit Anda.</Div>
          </Div>
        </Div>
      </Div>
    </Layout>
  );
}

export default SPHPSuccess;
