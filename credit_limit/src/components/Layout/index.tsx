import { useTheme } from '@emotion/react';
import { cx } from '@emotion/css';

import { MIN_WIDTH } from 'constant';

import { Content, fluid, defaultWidth } from './styles';
import { dFlex, flexColumn } from 'assets/css/stylesFix';
import { background, flex, padding } from 'assets/css/stylesValue';
import { Div, Wrapper, Container } from 'assets/css/styled';

import BarBack from 'components/BarBack';
import NavBar from 'components/NavBar';

import { LayoutProps, ThemeProps } from './type';
import { ActionsMenu } from '../BarBack/types';

const Layout = ({
  children,
  disableClickLogo,
  fullWidth = false,
  hideBarBack = false,
  hideNavbar = false,
  hideNavbarMenu,
  barBackTitle = '',
  barBackColor,
  barBackbackgroundColor,
  barBackborderBottom,
  barBackImage,
  barBackHideImage,
  disableBarBackRedirect,
  layoutContainer,
  layoutBackground = '#fff',
  contentBackground = '#fff',
  barBackType = 'primary',
  barBackActions,
  onClickActionsMenu,
  mainWrapperStyles,
}: LayoutProps) => {
  const theme = useTheme() as unknown as ThemeProps;

  const handleClickActions = (value: ActionsMenu) => {
    if (onClickActionsMenu) onClickActionsMenu(value);
  };

  return (
    <Container minWidth={fullWidth ? '100%' : MIN_WIDTH}>
      <div className='layout-component global-wrapper'>
        {!hideNavbar && (
          <NavBar
            disableClickLogo={disableClickLogo}
            hideMenu={hideNavbarMenu}
          />
        )}
        {!hideBarBack && (
          <BarBack
            title={barBackTitle}
            color={barBackColor}
            backgroundColor={barBackbackgroundColor}
            borderBottom={barBackborderBottom}
            disableRedirect={disableBarBackRedirect}
            hideImage={barBackHideImage}
            img={barBackImage}
            withNavbar={!hideNavbar}
            type={barBackType}
            actions={barBackActions}
            handleClickActionsMenu={(e) => handleClickActions(e)}
          />
        )}
        <Wrapper
          height={'100%'}
          minHeight={'100vh'}
          className={cx(
            {
              [padding('125px 0px 0px 0px')]: !hideNavbar && !hideBarBack,
            },
            {
              [padding('64px 0px 0px 0px')]:
                !hideNavbar && hideBarBack && !hideNavbarMenu,
            },
            {
              [padding('58px 0px 0px 0px')]:
                !hideNavbar && hideBarBack && hideNavbarMenu,
            },
            {
              [padding('58px 0px 0px 0px')]: hideNavbar && !hideBarBack,
            },
            {
              [padding('0px')]: hideNavbar && hideBarBack,
            },
            {
              [background(layoutBackground)]: !!layoutBackground,
            },
            {
              [background(theme?.colors?.backgroundColorPrimary)]:
                !layoutBackground,
            },
          )}
          style={{
            display: 'flex',
            position: 'relative',
            ...mainWrapperStyles,
          }}
        >
          <div className={`${dFlex} ${flexColumn} ${flex('1 1 100%')}`}>
            <Wrapper
              className={cx(
                { [fluid]: fullWidth },
                { [defaultWidth]: !fullWidth },
              )}
              backgroundColor={contentBackground}
              style={{
                flex: '1 1 100%',
                padding: '0px',
                position: 'relative',
              }}
            >
              <Content>
                <Div
                  position='relative'
                  className='container layout-wrapper'
                  style={layoutContainer}
                  maxWidth={`${fullWidth ? '100%' : ''}`}
                >
                  {children}
                </Div>
              </Content>
            </Wrapper>
          </div>
        </Wrapper>
      </div>
    </Container>
  );
};

export default Layout;
