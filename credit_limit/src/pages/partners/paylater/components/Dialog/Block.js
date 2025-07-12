import React from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';

import FailedVariantLogo from 'assets/img/paylater/failed-variant.png';

import { text, padding, minHeight, fontSize } from 'assets/css/stylesValue';
import { Div, Img, Button } from 'assets/css/styled';
import {
  justifyCenter,
  dFlex,
  flexColumn,
  alignCenter,
  textCenter,
  mb4,
  borderNone,
  w50,
} from 'assets/css/stylesFix';
import Dialog from 'components/Dialog';

const Block = ({ showDialog, setShowDialog, errorMessage }) => {
  return (
    <Dialog
      show={showDialog}
      padding={'36px'}
      getShow={(e) => setShowDialog(e)}
    >
      {showDialog && (
        <Div className={cx(dFlex, flexColumn, justifyCenter, alignCenter)}>
          <Img src={FailedVariantLogo} className={cx(w50, mb4)} />
          <Div
            className={`${text({
              color: '#5E5E5E',
              size: 18,
              weight: '700',
            })} ${dFlex} ${mb4} `}
          >
            Akun Diblokir
          </Div>
          <Div
            className={`${text({
              color: '#5E5E5E',
              size: 11,
            })} ${dFlex} ${textCenter} ${mb4} `}
          >
            {errorMessage ||
              'Akun kamu diblokir sementara karena salah memasukkan informasi. Silakan coba masuk kembali nanti.'}
          </Div>

          <Button
            fluid
            onClick={() => setShowDialog(false)}
            className={cx(
              borderNone,
              padding('11px'),
              minHeight(48),
              fontSize(16)
            )}
          >
            OK
          </Button>
        </Div>
      )}
    </Dialog>
  );
};

Block.propTypes = {
  showDialog: PropTypes.bool.isRequired,
  setShowDialog: PropTypes.func.isRequired,
};

export default Block;
