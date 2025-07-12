import React from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';

import AccountConnectedImage from 'assets/img/paylater/account-connected.svg';

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

const AccountConnected = (props) => {
  const { showDialog, setShowDialog, redirectURL } = props;
  return (
    <Dialog
      show={showDialog}
      padding={'36px'}
      getShow={setShowDialog}
      redirectURL={redirectURL}
    >
      {showDialog && (
        <Div className={cx(dFlex, flexColumn, justifyCenter, alignCenter)}>
          <Img src={AccountConnectedImage} className={cx(w50, mb4)} />
          <Div
            className={`${text({
              color: '#5E5E5E',
              size: 18,
              weight: '700',
            })} ${dFlex} ${mb4} `}
          >
            Akun Berhasil Terhubung
          </Div>
          <Div
            className={`${text({
              color: '#5E5E5E',
              size: 11,
            })} ${dFlex} ${textCenter} ${mb4} `}
          >
            Sekarang, akun JULO kamu berhasil terhubung {merchant}
          </Div>

          <Button
            fluid
            onClick={() =>
              redirectURL ? handleClick(redirectURL) : setShowDialog(false)
            }
            className={cx(
              borderNone,
              padding('11px'),
              minHeight(48),
              fontSize(16),
            )}
          >
            OK
          </Button>
        </Div>
      )}
    </Dialog>
  );
};

AccountConnected.propTypes = {
  showDialog: PropTypes.bool.isRequired,
  setShowDialog: PropTypes.func.isRequired,
};

export default AccountConnected;
