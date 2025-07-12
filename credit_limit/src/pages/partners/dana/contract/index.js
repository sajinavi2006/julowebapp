import React from 'react';
import Lazyload from 'components/Lazyload';

const DanaContractLazy = React.lazy(() =>
  import(/* webpackChunkName: "dana-contract" */ './contract')
);

const DanaContract = (props) => {
  return <Lazyload component={DanaContractLazy} animationLoading {...props} />;
};

export default DanaContract;
