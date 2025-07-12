import React from 'react';

import { useTheme } from '@emotion/react';
import { cx } from '@emotion/css';
import { withRouter, useHistory } from 'react-router-dom';

import CancelVariant from 'assets/img/paylater/cancel-variant.svg';

import { Img, Div, Button } from 'assets/css/styled';
import {
  text,
  padding,
  minHeight,
  fontSize,
  paddingBottom,
  paddingTop,
  height,
} from 'assets/css/stylesValue';
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
  justifyBetween,
} from 'assets/css/stylesFix';

function CancelScreen() {
  const theme = useTheme();
  const themeColor = theme?.colors;
  const history = useHistory();
  const handleCloseScreen = () => {
    history.replace('/paylater/nik');
  };

  return (
    <Div
      className={cx(
        dFlex,
        flexColumn,
        justifyBetween,
        px3,
        paddingBottom('1rem'),
        paddingTop('12rem'),
        height('100vh')
      )}
      background={themeColor?.white}
    >
      <Div className={cx(dFlex, flexColumn, alignCenter, justifyCenter)}>
        <Img src={CancelVariant} className={mb5} />
        <Div
          className={cx(
            text({
              color: '#5E5E5E',
              size: 18,
              weight: '700',
            }),
            dFlex,
            mb1
          )}
        >
          Yah, kamu membatalkan transaksi
        </Div>
        <Div
          className={cx(
            text({
              color: '#5E5E5E',
              size: 16,
            }),
            dFlex,
            textCenter,
            mb5
          )}
        >
          Sayang sekali, kamu tidak melanjutkan transaksi. Coba pilih lagi
          sesuai kebutuhanmu, ya!
        </Div>
      </Div>
      <Div>
        <Button
          fluid
          className={cx(
            borderNone,
            padding('11px'),
            minHeight(48),
            fontSize(16)
          )}
          onClick={handleCloseScreen}
        >
          Keluar
        </Button>
      </Div>
    </Div>
  );
}

export default withRouter(CancelScreen);
