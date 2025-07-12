import React from 'react';
import Lazyload from 'components/Lazyload';
import { PageProps } from './type';

const PageLazy = React.lazy(
  () => import(/* webpackChunkName: "page-component" */ './Page'),
);

const PageComponent = (props: PageProps) => {
  return <Lazyload component={PageLazy} animationLoading {...props} />;
};

export default PageComponent;
