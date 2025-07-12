import React from 'react';
import Lazyload from 'components/Lazyload';
import { Props } from './type';

const StepsLazy = React.lazy(() =>
  import(/* webpackChunkName: "steps-component" */ './Steps')
);

const Steps: React.FC<Props> = (props) => {
  return <Lazyload component={StepsLazy} animationLoading {...props} />;
};

export default Steps;