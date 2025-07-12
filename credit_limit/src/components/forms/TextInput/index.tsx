import React from 'react';
import Lazyload from 'components/Lazyload';
import { Props } from './type';

const TextInputLazy = React.lazy(() =>
  import(/* webpackChunkName: "text-input-component" */ './TextInput')
);

const TextInputComponent: React.FC<Props> = (props) => {
  return <Lazyload component={TextInputLazy} animationLoading {...props} />;
};

export default TextInputComponent;