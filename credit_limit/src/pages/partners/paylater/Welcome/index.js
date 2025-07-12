import React from 'react';
import Lazyload from 'components/Lazyload';

const WelcomeLazy = React.lazy(() => import('./Welcome'));

const Welcome = (props) => {
  return <Lazyload component={WelcomeLazy} animationLoading {...props} />;
};

export default Welcome;
