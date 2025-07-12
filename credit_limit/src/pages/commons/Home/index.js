import React from 'react';
import { withRouter } from 'react-router-dom';

import { MAX_WIDTH, MIN_WIDTH, NAVBAR_MENU } from '../../../constant';

import { Container, Main, Wrapper } from '../../../assets/css/styled';
import { py3 } from '../../../assets/css/stylesFix';
import { paddingTop } from '../../../assets/css/stylesValue';

import logoName from '../../assets/img/logo-horizontal.svg';

import NavBar from '../../../components/NavBar';

import { CermatiComponent } from './Content';

const Home = () => {
  return (
    <Main>
      <NavBar menu={NAVBAR_MENU} logo={logoName} />
      <Container>
        <Wrapper
          height={'100%'}
          minHeight={'100vh'}
          maxWidth={MAX_WIDTH}
          minWidth={MIN_WIDTH}
          backgroundColor='#fff'
          className={`${py3} ${paddingTop('80px!important')}`}
        >
          <CermatiComponent />
        </Wrapper>
      </Container>
    </Main>
  );
};

export default withRouter(Home);
