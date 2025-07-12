import React from 'react';
import Lazyload from 'components/Lazyload';
import { Props } from './types';

const InputLazy = React.lazy(
  () => import(/* webpackChunkName: "active-camera-page" */ './ActiveCamera'),
);

const ActiveCamera: React.FC<Props> = (props) => {
  return <Lazyload component={InputLazy} animationLoading {...props} />;
};

export default ActiveCamera;
