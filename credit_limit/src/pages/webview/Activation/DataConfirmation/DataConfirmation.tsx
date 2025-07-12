import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { cx } from '@emotion/css';
import { yupResolver } from '@hookform/resolvers/yup';
import replaceWhiteSpace from '@julofinance/web-helpers/dist/string/replaceWhiteSpace';

import { useUserContext } from 'providers/UserProvider';
import { schemaDataConfirmation } from './validator';

import Input from 'components/Input';

import imgDataActivation from 'assets/img/webview/activation/img-data_activation.webp';

import {
  bottom,
  minHeight,
  padding,
  paddingBottom,
  text,
} from 'assets/css/stylesValue';
import { Button, Container, Col, Div, Img, Row } from 'assets/css/styled';
import { borderNone, mt3 } from 'assets/css/stylesFix';
import { useTheme } from '@emotion/react';

const DataConfirmation = () => {
  const history = useHistory();
  const theme = useTheme();
  const themeColor = theme.colors;
  const themeText = theme.text;
  const { datas } = useUserContext();
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      email: replaceWhiteSpace(datas?.params?.email || '', '+'),
      phone: replaceWhiteSpace(datas?.params?.phone || '', '+'),
    },
    resolver: yupResolver(schemaDataConfirmation),
    //mode 'all' to validate error onChange and onSubmit
    mode: 'all',
  });

  const submitForm = () => {
    history.push('otp-verification', { from: 'data-confirmation' });
  };

  return (
    <Container
      height='100%'
      position='relative'
      className={cx(paddingBottom('6rem'))}
    >
      <Div background={themeColor.white} padding='16px'>
        <Row
          background={themeColor.backgroundColorBlueLight}
          borderRadius='10px'
          margin='0px'
          padding='16px'
        >
          <Col xs='2' sm='2' position='relative'>
            <Img
              src={imgDataActivation}
              alt='Aktifasi Data'
              position='absolute'
              minHeight='60px'
              height='150%'
              top='25px'
              left='50%'
              transform='translate(-50%, -45px)'
            />
          </Col>
          <Col xs='10' sm='10'>
            <Div
              className={cx(
                text({ size: 14, color: themeText.primary, weight: 'bold' }),
              )}
            >
              Pastikan Data Kamu Benar
            </Div>
            <Div className={cx(text({ size: 10, color: themeText.primary }))}>
              Silahkan cek kembali data diri dibawah apakah sudah sesuai
            </Div>
          </Col>
        </Row>
      </Div>
      <Div background={themeColor.white} padding='16px' className={cx(mt3)}>
        <Controller
          control={control}
          name='phone'
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <Input
              disabled
              errorMessage={error?.message}
              name={name}
              label='No. Handphone'
              value={value}
              inputProps={{
                maxLength: 16,
              }}
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name='email'
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <Input
              disabled
              errorMessage={error?.message}
              name={name}
              label='Email'
              value={value}
              inputProps={{
                maxLength: 60,
              }}
              onChange={onChange}
            />
          )}
        />
      </Div>
      <Div
        fluid
        position='absolute'
        className={cx(bottom('0'), padding('24px 15px'))}
      >
        <Button
          fluid
          disabled={!isValid || datas?.invalidParams}
          onClick={handleSubmit(submitForm)}
          className={cx(
            borderNone,
            padding('11px'),
            minHeight(48),
            text({ size: 14, weight: '600' }),
          )}
        >
          Lanjutkan
        </Button>
      </Div>
    </Container>
  );
};

export default DataConfirmation;
