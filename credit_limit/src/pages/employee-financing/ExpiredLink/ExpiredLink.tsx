import React from 'react';
import { cx } from '@emotion/css';
import { MAX_WIDTH, MIN_WIDTH } from 'constant';
import ExpiredLogo from 'assets/img/logo-disbursment-expired.svg';

import { Container, Div, Img, Main, Wrapper } from 'assets/css/styled';
import {
  alignCenter,
  dFlex,
  flexColumn,
  justifyCenter,
  mb2,
  mb4,
} from 'assets/css/stylesFix';
import { text } from 'assets/css/stylesValue';

const DisbursmentExpired = () => {
  return (
    <Main>
      <Container>
        <Wrapper
          height={'100%'}
          minHeight={'100vh'}
          maxWidth={MAX_WIDTH}
          minWidth={MIN_WIDTH}
          backgroundColor='#fff'
          className={cx(dFlex, alignCenter, flexColumn, justifyCenter)}
        >
          <Div>
            <Img src={ExpiredLogo} alt='Expired Logo' className={mb4} />
          </Div>
          <Div
            className={cx(
              text({
                color: '#1ea7e9',
                size: 20,
                weight: 'bold',
              }),
              mb2
            )}
          >
            Link Sudah Kedaluwarsa
          </Div>
          <Div
            className={text({
              size: 20,
            })}
            textAlign="center"
          >
            Kami akan mengirimkan link terbaru, mohon cek kembali email kamu
          </Div>
        </Wrapper>
      </Container>
    </Main>
  );
};

export default DisbursmentExpired;
