import React from 'react';
import Lazyload from 'components/Lazyload';

const ResetPinLazy = React.lazy(() =>
  import('./ResetPin')
);

const ResetPin = (props) => {
  return (
    <Lazyload component={ResetPinLazy} animationLoading {...props} />
  );
};

export default ResetPin;
