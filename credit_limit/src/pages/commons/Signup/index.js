import React from 'react';
import Lazyload from 'components/Lazyload';

const SignupLazy = React.lazy(() =>
  import(/* webpackChunkName: "common-signup-page" */ './Signup')
);

const Signup = (props) => {
  return <Lazyload component={SignupLazy} animationLoading {...props} />;
};

export default Signup;
