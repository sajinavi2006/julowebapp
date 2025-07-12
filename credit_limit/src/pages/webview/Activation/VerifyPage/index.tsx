import React from 'react';
import Lazyload from 'components/Lazyload';

const VerifyPageLazy = React.lazy(
  () =>
    import(
      /* webpackChunkName: "webview-activation-verify-data" */ './VerifyPage'
    ),
);

const VerifyPage = () => {
  return <Lazyload component={VerifyPageLazy} animationLoading />;
};

export default VerifyPage;
