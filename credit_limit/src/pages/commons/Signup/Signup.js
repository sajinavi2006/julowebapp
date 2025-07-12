import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { useTheme } from '@emotion/react';
import { cx } from '@emotion/css';

import bgLogin from 'assets/img/background/bg-J1_login.png';
import icIdCard from 'assets/img/icon/ic-idcard.svg';
import icMail from 'assets/img/icon/ic-email.svg';
import logo from 'assets/img/logo-vertical.svg';
import ojk from 'assets/img/OJK.svg';

import Page from 'components/Page';
import Input from 'components/Input';

import {
  backgroundImage,
  height,
  text,
  translate,
} from 'assets/css/stylesValue';
import {
  Button,
  Col,
  Div,
  Span,
  Divider,
  Img,
  Label,
  Row,
  Wrapper,
} from 'assets/css/styled';
import { mb0, mb2, mb4, mb5, mt0, px3 } from 'assets/css/stylesFix';
import utils from 'utils';

import { inputCx } from './styles';
import { useHandleSubmit } from './usecase';

function Signup() {
  const history = useHistory();
  const theme = useTheme() || {};
  const themeColors = theme.colors;
  const { onSubmitRegister, formControl } = useHandleSubmit();

  useEffect(() => {
    window.history.pushState(null, null, location.href);
    utils.store.clearAllItem();
  }, []);

  return (
    <Page useHeader>
      <form onSubmit={onSubmitRegister}>
        <Div minHeight='100vh' className={backgroundImage(bgLogin)}>
          <Wrapper className={translate('0px', '20vh')}>
            <Row justifyContent='center' alignItems='center'>
              <Col xs='12' sm='12' md='4' lg='3' marginBottom='30px'>
                <Div marginBottom='30px' textAlign='center'>
                  <Img data-testid='julo-logo' src={logo} alt='julo-logo' />
                </Div>

                <Div marginBottom='1rem'>
                  <Label fontSize='12px' color='#FFFFFF' marginBottom='0.5rem'>
                    Isi nomor KTP
                  </Label>
                  <Controller
                    control={formControl}
                    name='nik'
                    render={({
                      field: { onChange, value, name },
                      fieldState: { error },
                    }) => (
                      <Input
                        name={name}
                        label='NIK'
                        value={value}
                        preventFocusOnError
                        onChange={onChange}
                        hiddenLabel={true}
                        isNumeric={true}
                        isOutlined={true}
                        type='numeric'
                        startAdornment={<Img src={icIdCard} />}
                        className={cx(inputCx, mb0)}
                        errorMessage={error?.message}
                        classNameInput={cx(height('39px'))}
                        inputProps={{ maxLength: 16, 'data-testid': 'nik' }}
                      />
                    )}
                  />
                </Div>
                <Div>
                  <Label fontSize='12px' color='#FFFFFF' marginBottom='0.5rem'>
                    Email
                  </Label>
                  <Controller
                    control={formControl}
                    name='email'
                    render={({
                      field: { onChange, value, name },
                      fieldState: { error },
                    }) => (
                      <Input
                        name={name}
                        label='Masukkan Email'
                        value={value}
                        preventFocusOnError
                        onChange={onChange}
                        hiddenLabel={true}
                        isOutlined={true}
                        type='text'
                        startAdornment={<Img src={icMail} />}
                        className={cx(inputCx, mb4)}
                        errorMessage={error?.message}
                        helperText='Harap masukkan alamat Gmail'
                        classNameInput={cx(height('39px'), px3)}
                        inputProps={{ 'data-testid': 'email' }}
                      />
                    )}
                  />
                </Div>

                <Div className={cx(mb5)}>
                  <Button
                    type='submit'
                    data-testid='register-button'
                    types='secondary'
                    fluid
                    marginBottom='12px'
                  >
                    Lanjutkan
                  </Button>
                  <Div textAlign='center' color='#FFFFFF' fontSize='12px'>
                    Sudah punya akun?{' '}
                    <Span
                      onClick={() => history.push(`login`)}
                      cursor='pointer'
                      textDecoration='underline'
                    >
                      Masuk
                    </Span>
                  </Div>
                </Div>

                <Divider color={themeColors.borderLight} className={mt0} />
                <Div
                  textAlign='center'
                  className={cx(
                    mb2,
                    text({ size: 9, color: themeColors.white }),
                  )}
                >
                  Berizin dan diawasi oleh
                </Div>
                <Div textAlign='center'>
                  <Img data-testid='ojk-logo' src={ojk} alt='ojk-logo' />
                </Div>
              </Col>
            </Row>
          </Wrapper>
        </Div>
      </form>
    </Page>
  );
}

export default Signup;
