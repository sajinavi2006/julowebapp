import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { cx } from '@emotion/css';

import InsufficientBalanceImage from 'assets/img/paylater/insufficent-balance.svg';
import { Img, Div, Button } from 'assets/css/styled';
import { text, padding, minHeight, fontSize } from 'assets/css/stylesValue';
import {} from 'assets/css/stylesFix';
import {
  borderNone,
  dFlex,
  justifyCenter,
  alignCenter,
  flexColumn,
  mb1,
  mb5,
  px3,
  textCenter,
} from 'assets/css/stylesFix';

function InsufficientBalance() {
  const history = useHistory();
  const handleCloseScreen = () => {
    history.replace('/paylater/nik');
  };

  return (
    <Div
      className={cx(dFlex, flexColumn, alignCenter, justifyCenter, px3)}
      height='100vh'
    >
      <Img src={InsufficientBalanceImage} className={mb5} />
      <Div
        className={`${text({
          color: '#5E5E5E',
          size: 16,
          weight: '700',
        })} ${dFlex} ${mb1} `}
      >
        Limit Kamu Tidak Mencukupi
      </Div>
      <Div
        className={`${text({
          color: '#5E5E5E',
          size: 14,
        })} ${dFlex} ${textCenter} ${mb5} `}
      >
        Kamu tidak bisa melanjutkan transaksi saat ini
      </Div>
      <Button
        fluid
        onClick={handleCloseScreen}
        className={cx(borderNone, padding('11px'), minHeight(48), fontSize(16))}
      >
        Keluar
      </Button>
    </Div>
  );
}

export default withRouter(InsufficientBalance);
