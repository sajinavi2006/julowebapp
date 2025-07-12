import React from 'react';
import Lazyload from 'components/Lazyload';

const AgreementSummariesLazy = React.lazy(() =>
  import('./AgreementSummaries')
);

const AgreementSummaries = (props) => {
  return (
    <Lazyload component={AgreementSummariesLazy} animationLoading {...props} />
  );
};

export default AgreementSummaries;
