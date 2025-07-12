import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { cx } from '@emotion/css';

import { MAX_WIDTH, MIN_WIDTH, NAVBAR_MENU } from 'constant';

import { Button, Col, Main, Row, Wrapper } from 'assets/css/styled';

import {
  cursorPointer,
  dFlex,
  flexColumn,
  h100,
  justifyCenter,
  ml3,
  mt4,
  mt5,
  px5,
  py3,
  py4,
  textCenter,
} from 'assets/css/stylesFix';
import {
  background,
  borderBottom,
  color,
  fontSize,
  fontWeight,
  minWidth,
  padding,
  paddingTop,
} from 'assets/css/stylesValue';

import { useUserContext } from 'providers/UserProvider';
import Input from 'components/Input';
import NavBar from 'components/NavBar';
import DialogInfo from 'pages/commons/Home/DialogInfo';

import logoName from 'assets/img/logo-horizontal.svg';
import arrowLeft from 'assets/img/icon/ic-arrow_left_blue.svg';

import { resetPassword } from 'services/auth';

import utils from 'utils';

const DIALOG_SUCCESS = {
  dialog: {
    title: {
      text: 'Ubah PIN / Kata Sandi',
    },
    message: {
      text: 'Periksa email anda dan klik di tautannya untuk mengubah PIN / kata sandi akun JULO Anda.',
    },
    button: {
      text: 'OKE',
      action: 'login',
    },
  },
};

const ForgotPassword = () => {
  const { handleNotification, handleLoadingOverlay } = useUserContext();
  const [email, setEmail] = useState('');
  const [showDialogInfo, setShowDialogInfo] = useState(false);
  const history = useHistory();

  const handleChangeEmail = (value) => {
    setEmail(value);
  };

  const handleSubmit = async () => {
    handleLoadingOverlay(true);
    const payload = {
      email: email,
    };

    try {
      const response = await resetPassword(payload);

      if (response?.errors?.length === 0) {
        setShowDialogInfo(true);
      } else {
        handleNotification({
          isOpen: true,
          message: response?.errors[0],
        });
      }

      handleLoadingOverlay(false);
    } catch (error) {
      if (error) {
        handleLoadingOverlay(false);
        handleNotification({
          isOpen: true,
          message:
            error?.response?.data?.errors?.length > 0
              ? error?.response?.data?.errors[0]
              : error.message,
        });
      }
      handleLoadingOverlay(false);
    }
  };

  const handleClickDialogButton = (value) => {
    history.push(value);
  };

  return (
    <Main>
      <NavBar menu={NAVBAR_MENU} logo={logoName} />
      <div
        className={`${dFlex} ${flexColumn} ${h100} ${minWidth(
          MIN_WIDTH
        )} ${background(`#fff`)} ${paddingTop('63px!important')}`}
      >
        <div
          className={`${py4} ${px5} ${dFlex} ${minWidth(
            MIN_WIDTH
          )} ${borderBottom('1px solid #e0e0e0')} ${cursorPointer}`}
          onClick={() => history.goBack()}
        >
          <div>
            <img src={arrowLeft} alt='Back Button' width='12' height='12.8' />
          </div>
          <div
            className={`${ml3} ${fontSize(14, 'fixed')} ${fontWeight(
              'bold'
            )} ${color('#5e5e5e')}`}
          >
            Lupa PIN / Kata Sandi
          </div>
        </div>
        <Wrapper
          maxWidth={MAX_WIDTH}
          minWidth={MIN_WIDTH}
          backgroundColor='#fff'
          className={`${py3} ${mt4}`}
        >
          <Row className={`${dFlex} ${justifyCenter}`}>
            <Col xs='12' sm='12' md='9'>
              <div
                className={`${textCenter} ${fontSize(16)} ${color('#5e5e5e')}`}
              >
                Masukkan email yang terasosiasi dengan akun Anda.
              </div>
            </Col>
            <Col className={`${mt5}`}>
              <Input
                name='email'
                label='Email'
                value={email}
                onChange={handleChangeEmail}
              />
            </Col>
          </Row>
          <Button
            fluid
            className={cx(
              mt5,
              padding('11px'),
              fontSize(16),
              utils.validator.emailValidator(email)
                ? background('#00acf0')
                : background('#e5e5e5')
            )}
            onClick={() =>
              utils.validator.emailValidator(email) && handleSubmit()
            }
          >
            Lanjutkan
          </Button>
        </Wrapper>
      </div>
      <DialogInfo
        clickOutside={false}
        customMaxWidth={400}
        dialogData={DIALOG_SUCCESS}
        showDialogInfo={showDialogInfo}
        handleClickDialogButton={handleClickDialogButton}
      />
    </Main>
  );
};

export default ForgotPassword;
