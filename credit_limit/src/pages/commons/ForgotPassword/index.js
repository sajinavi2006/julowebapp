import React from 'react';
import Lazyload from 'components/Lazyload';

const ForgotPasswordLazy = React.lazy(() =>
  import(/* webpackChunkName: "forgot-password-page" */ './ForgotPassword')
);

const ForgotPassword = (props) => {
  return (
    <Lazyload component={ForgotPasswordLazy} animationLoading {...props} />
  );
};

export default ForgotPassword;
