import React from 'react';
import Lazyload from 'components/Lazyload';
import { InputProps } from './types';

const InputLazy = React.lazy(
  () => import(/* webpackChunkName: "input-component" */ './Input'),
);

const Input = (props: InputProps) => {
  return <Lazyload component={InputLazy} animationLoading {...props} />;
};

export default Input;
