import React from 'react';
import Lazyload from 'components/Lazyload';

const ApplicationsLazy = React.lazy(() =>
  import(/* webpackChunkName: "common-applications-page" */ './Applications')
);

const Applications = (props) => {
  return <Lazyload component={ApplicationsLazy} animationLoading {...props} />;
};

export default Applications;