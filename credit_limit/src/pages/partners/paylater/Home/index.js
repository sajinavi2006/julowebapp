import React from 'react';
import Lazyload from 'components/Lazyload';

const HomeLazy = React.lazy(() =>
  import(/* webpackChunkName: "home-page" */ './Home')
);

const Home = (props) => {
  return <Lazyload component={HomeLazy} animationLoading {...props} />;
};

export default Home;
