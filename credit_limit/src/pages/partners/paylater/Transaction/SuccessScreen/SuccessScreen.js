import React from 'react';
import { useTheme } from '@emotion/react';
import { cx } from '@emotion/css';
import { withRouter, useHistory } from 'react-router-dom';

import utils from 'utils';
import SuccessVariantImage from 'assets/img/paylater/success-variant.svg';
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

function SuccessScreen() {
  const theme = useTheme();
  const themeColor = theme?.colors;
  const merchant = utils.store.get('merchant');
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
        <Img src={SuccessVariantImage} className={mb5} />
        <Div
          className={`${text({
            color: '#5E5E5E',
            size: 18,
            weight: '700',
          })} ${dFlex} ${mb1} `}
        >
          Selamat! Pembayaran Berhasil
        </Div>
        <Div
          className={`${text({
            color: '#5E5E5E',
            size: 16,
          })} ${dFlex} ${textCenter} ${mb5} `}
        >
          Dana akan diteruskan ke {merchant} untuk menyelesaikan pesananmu
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
          Selesai
        </Button>
      </Div>
    </Div>
  );
}

export default withRouter(SuccessScreen);
