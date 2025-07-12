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
  mb2,
  borderNone,
  w50,
} from 'assets/css/stylesFix';
import Dialog from 'components/Dialog';

const BlockPermanent = ({ showDialog, setShowDialog }) => {
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
            Akun Diblokir Permanen
          </Div>
          <Div
            className={`${text({
              color: '#5E5E5E',
              size: 11,
            })} ${dFlex} ${textCenter} ${mb4} `}
          >
            Akun kamu diblokir permanen karena salah memasukkan informasi secara
            terus menerus. Silakan hubungin CS untuk info lebih lanjut
          </Div>

          <Div
            className={`${text({
              color: '#5E5E5E',
              size: 11,
            })} ${dFlex} ${textCenter} ${mb2} `}
          >
            Telephone
          </Div>

          <Div
            className={`${text({
              color: '#5E5E5E',
              weight: '700',
              size: 11,
            })} ${dFlex} ${textCenter} ${mb4} `}
          >
            021-5091 9034 / 021-5091 9035
          </Div>

          <Div
            className={`${text({
              color: '#5E5E5E',
              size: 11,
            })} ${dFlex} ${textCenter} ${mb2} `}
          >
            Email
          </Div>

          <Div
            className={`${text({
              color: '#5E5E5E',
              weight: '700',
              size: 11,
            })} ${dFlex} ${textCenter} ${mb4} `}
          >
            cs@julo.co.id
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

BlockPermanent.propTypes = {
  showDialog: PropTypes.bool.isRequired,
  setShowDialog: PropTypes.func.isRequired,
};

export default BlockPermanent;
