import React from 'react';
import Lazyload from 'components/Lazyload';
import type { MerchantLayoutProps } from './types';


const MerchantLayoutLazy = React.lazy(
  () =>
    import(
      /* webpackChunkName: "merchant-layout" */ './MerchantLayout'
    ),
);

const MerchantLayout: React.FC<MerchantLayoutProps> = (props) => {
  return (
    <Lazyload component={MerchantLayoutLazy} animationLoading {...props} />
  );
};

export default MerchantLayout;
