import React from 'react';
import Lazyload from 'components/Lazyload';
import { Props } from './type';

const RadioInputLazy = React.lazy(() =>
  import(
    /* webpackChunkName: "radio-input-component" */ './RadioInput'
  )
);

const RadioInput: React.FC<Props> = (props) => {
  return (
    <Lazyload component={RadioInputLazy} animationLoading {...props} />
  );
};

export default RadioInput;
