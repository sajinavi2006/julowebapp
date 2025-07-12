import React from 'react';
import Lazyload from 'components/Lazyload';

const PrivacyLazy = React.lazy(() =>
  import(/* webpackChunkName: "common-privacy-page" */ './Privacy')
);

const Privacy = (props) => {
  return <Lazyload component={PrivacyLazy} animationLoading {...props} />;
};

export default Privacy;
