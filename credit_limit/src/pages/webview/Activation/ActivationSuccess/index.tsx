import React from 'react';
import Lazyload from 'components/Lazyload';

const ActivationSuccessLazy = React.lazy(
  () =>
    import(
      /* webpackChunkName: "webview-activation-activation-success" */ './ActivationSuccess'
    ),
);

const ActivationSuccess = () => {
  return <Lazyload component={ActivationSuccessLazy} animationLoading />;
};

export default ActivationSuccess;
