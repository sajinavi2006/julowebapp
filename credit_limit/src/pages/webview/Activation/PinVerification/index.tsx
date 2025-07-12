import React from 'react';
import Lazyload from 'components/Lazyload';

const PinVerificationLazy = React.lazy(
  () =>
    import(
      /* webpackChunkName: "webview-activation-pin-verification" */ './PinVerification'
    ),
);

const PinVerification = () => {
  return <Lazyload component={PinVerificationLazy} animationLoading />;
};

export default PinVerification;
