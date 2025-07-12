import { useState } from 'react';
import { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';
import { cx } from '@emotion/css';

import { MAX_WIDTH, MIN_WIDTH } from 'constant';

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
  px4,
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
import arrowLeft from 'assets/img/icon/ic-arrow_left_blue.svg';

import { useUserContext } from 'providers/UserProvider';
import Input from 'components/Input';
import DialogInfo from 'pages/commons/Home/DialogInfo';

import { resetPassword } from 'services/pin';

import utils from 'utils';
import { ResetPinProps } from './types';
import { DIALOG_SUCCESS } from './constants';

const ResetPin = (props: ResetPinProps) => {
  const { hideBarBack } = props;

  const { handleNotification, handleLoadingOverlay } = useUserContext();

  const [email, setEmail] = useState('');
  const [showDialogInfo, setShowDialogInfo] = useState(false);
  const history = useHistory();

  const handleChangeEmail = (value: string) => {
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
            (error as AxiosError)?.response?.data?.errors?.length > 0
              ? (error as AxiosError)?.response?.data?.errors[0]
              : (error as Error).message,
        });
      }
      handleLoadingOverlay(false);
    }
  };

  const handleClickDialogButton = () => {
    setShowDialogInfo(false);
    setEmail('');
  };

  return (
    <Main>
      <div
        className={`${dFlex} ${flexColumn} ${h100} ${minWidth(
          MIN_WIDTH,
        )} ${background(`#fff`)} ${paddingTop('8px!important')}`}
      >
        {!hideBarBack && (
          <div
            className={`${py4} ${px4} ${dFlex} ${minWidth(
              MIN_WIDTH,
            )} ${borderBottom('1px solid #e0e0e0')} ${cursorPointer}`}
            onClick={() => history.goBack()}
          >
            <div>
              <img src={arrowLeft} alt='Back Button' width='12' height='12.8' />
            </div>
            <div
              className={`${ml3} ${fontSize(14, 'fixed')} ${fontWeight(
                'bold',
              )} ${color('#5e5e5e')}`}
            >
              Lupa PIN / Kata Sandi
            </div>
          </div>
        )}
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
                : background('#e5e5e5'),
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

export default ResetPin;
