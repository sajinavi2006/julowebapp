import React from 'react';
import Lazyload from 'components/Lazyload';

const VerifyDataLazy = React.lazy(
  () =>
    import(
      /* webpackChunkName: "webview-activation-verify-data" */ './VerifyData'
    ),
);

const VerifyData = () => {
  return <Lazyload component={VerifyDataLazy} animationLoading />;
};

export default VerifyData;
