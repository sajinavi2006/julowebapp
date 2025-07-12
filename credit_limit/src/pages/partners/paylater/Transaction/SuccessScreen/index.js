import React from 'react';
import Lazyload from 'components/Lazyload';

const SuccessScreenLazy = React.lazy(() =>
  import(/* webpackChunkName: "success-screen-page" */ './SuccessScreen')
);

const SuccessScreen = (props) => {
  return <Lazyload component={SuccessScreenLazy} animationLoading {...props} />;
};

export default SuccessScreen;
