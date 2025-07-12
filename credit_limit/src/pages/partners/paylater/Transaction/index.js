import React from 'react';
import Lazyload from 'components/Lazyload';

const TransactionLazy = React.lazy(() =>
  import('./Transaction')
);

const Transaction = (props) => {
  return (
    <Lazyload component={TransactionLazy} animationLoading {...props} />
  );
};

export default Transaction;
