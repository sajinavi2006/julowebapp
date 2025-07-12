import React from 'react';
import Lazyload from 'components/Lazyload';

const OtpVerificationDialogLazy = React.lazy(() =>
  import(
    /* webpackChunkName: "otp-verification-component" */ './OtpVerificationDialog'
  )
);

const OtpVerificationDialog = (props) => {
  return (
    <Lazyload component={OtpVerificationDialogLazy} animationLoading {...props} />
  );
};

export default OtpVerificationDialog;
