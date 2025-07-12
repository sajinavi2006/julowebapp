import React from 'react';
import Lazyload from 'components/Lazyload';

const SPHPLazy = React.lazy(() =>
  import('./SPHP')
);

const SPHP = (props) => {
  return (
    <Lazyload component={SPHPLazy} animationLoading {...props} />
  );
};

export default SPHP;
