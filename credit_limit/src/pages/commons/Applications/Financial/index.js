import React from 'react';
import Lazyload from 'components/Lazyload';

const FinancialLazy = React.lazy(() =>
  import(
    /* webpackChunkName: "common-financial-page" */ './Financial'
  )
);

const Financial = (props) => {
  return (
    <Lazyload component={FinancialLazy} animationLoading {...props} />
  );
};

export default Financial;
