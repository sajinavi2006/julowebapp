import React from 'react';
import Lazyload from 'components/Lazyload';

const CancelScreenLazy = React.lazy(() =>
  import(/* webpackChunkName: "cancel-screen-page" */ './CancelScreen')
);

const CancelScreen = (props) => {
  return <Lazyload component={CancelScreenLazy} animationLoading {...props} />;
};

export default CancelScreen;
