import React from 'react';
import Lazyload from 'components/Lazyload';

const PinVerificationLazy = React.lazy(() =>
  import('./PinVerification')
);

const PinVerification = (props) => {
  return (
    <Lazyload component={PinVerificationLazy} animationLoading {...props} />
  );
};

export default PinVerification;
