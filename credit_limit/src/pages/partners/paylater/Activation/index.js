import React from 'react';
import Lazyload from 'components/Lazyload';

const ActivationLazy = React.lazy(() =>
  import(/* webpackChunkName: "activation-page" */ './Activation')
);

const Activation = (props) => {
  return <Lazyload component={ActivationLazy} animationLoading {...props} />;
};

export default Activation;
