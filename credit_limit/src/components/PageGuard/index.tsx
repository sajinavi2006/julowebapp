import React from 'react';
import Lazyload from 'components/Lazyload';
import { Props } from './type';

const PageGuardLazy = React.lazy(() =>
  import(/* webpackChunkName: "page-guard-component" */ './PageGuard')
);

const PageGuard: React.FC<Props> = (props) => {
  return <Lazyload component={PageGuardLazy} animationLoading {...props} />;
};

export default PageGuard;
