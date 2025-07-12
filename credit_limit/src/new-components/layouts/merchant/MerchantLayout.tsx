import { ThemeProvider } from '@material-ui/core';

import { MENUS } from 'pages/merchant/axiata/constants';

import Header from './components/header';
import Sidebar from './components/sidebar';

import type { MerchantLayoutProps } from './types';
import { mainCx, merchantCx } from './styles';
import { DEFAULT_THEME } from './constants';

const MerchantLayout = (props: MerchantLayoutProps) => {
  const { children } = props;

  return (
    <ThemeProvider theme={DEFAULT_THEME}>
      <Header />
      <Sidebar menu={MENUS} />
      <main css={mainCx} id='merchant-content-container'>
        <div css={merchantCx} id='merchant-content'>
          {children}
        </div>
      </main>
    </ThemeProvider>
  );
};

export default MerchantLayout;
