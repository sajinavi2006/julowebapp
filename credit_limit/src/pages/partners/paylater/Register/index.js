import React from 'react';
import Lazyload from 'components/Lazyload';

const RegisterLazy = React.lazy(() =>
  import('./Register')
);

const Register = (props) => {
  return (
    <Lazyload component={RegisterLazy} animationLoading {...props} />
  );
};

export default Register;
