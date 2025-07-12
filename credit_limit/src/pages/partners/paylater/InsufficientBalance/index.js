import React from 'react';
import Lazyload from 'components/Lazyload';

const InsufficientBalanceLazy = React.lazy(() =>
  import('./InsufficientBalance')
);

const InsufficientBalance = (props) => {
  return (
    <Lazyload component={InsufficientBalanceLazy} animationLoading {...props} />
  );
};

export default InsufficientBalance;
