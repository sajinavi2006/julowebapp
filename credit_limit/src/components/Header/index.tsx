import React from 'react';
import Lazyload from 'components/Lazyload';

const HeaderLazy = React.lazy(
  () => import(/* webpackChunkName: "header-component" */ './Header')
);

const Header: React.FC = (props) => {
  return <Lazyload component={HeaderLazy} animationLoading {...props} />;
};

export default Header;
