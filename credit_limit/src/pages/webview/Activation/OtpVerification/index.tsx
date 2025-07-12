import React from 'react';
import Lazyload from 'components/Lazyload';

const OtpVerificationLazy = React.lazy(
  () =>
    import(
      /* webpackChunkName: "webview-activation-otp-verification" */ './OtpVerification'
    ),
);

const OtpVerification = () => {
  return <Lazyload component={OtpVerificationLazy} animationLoading />;
};

export default OtpVerification;
