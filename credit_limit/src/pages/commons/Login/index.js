import React from 'react';
import Lazyload from 'components/Lazyload';

const LoginLazy = React.lazy(() =>
  import(/* webpackChunkName: "common-login-page" */ './Login')
);

const Login = (props) => {
  return <Lazyload component={LoginLazy} animationLoading {...props} />;
};

export default Login;
