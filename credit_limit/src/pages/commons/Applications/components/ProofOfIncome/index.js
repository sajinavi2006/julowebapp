import React from 'react';
import Lazyload from 'components/Lazyload';

const ProofOfIncomeLazy = React.lazy(() =>
  import(
    /* webpackChunkName: "proof-of-income" */ './ProofOfIncome'
  )
);

const ProofOfIncome = (props) => {
  return (
    <Lazyload component={ProofOfIncomeLazy} animationLoading {...props} />
  );
};

export default ProofOfIncome;
