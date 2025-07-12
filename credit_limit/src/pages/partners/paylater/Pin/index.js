import React from 'react';
import Lazyload from 'components/Lazyload';

const PinLazy = React.lazy(() =>
  import('./Pin')
);

const Pin = (props) => {
  return (
    <Lazyload component={PinLazy} animationLoading {...props} />
  );
};

export default Pin;
