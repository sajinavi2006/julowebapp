import React from 'react';
import Lazyload from 'components/Lazyload';

const SignatureLazy = React.lazy(() =>
  import('./Signature')
);

const Signature = (props) => {
  return (
    <Lazyload component={SignatureLazy} animationLoading {...props} />
  );
};

export default Signature;
