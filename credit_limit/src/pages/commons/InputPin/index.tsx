import React from 'react';
import Lazyload from 'components/Lazyload';

const InputPinLazy = React.lazy(
  () => import(/* webpackChunkName: "common-input-pin-page" */ './InputPin'),
);

const InputPin = () => {
  return <Lazyload component={InputPinLazy} animationLoading />;
};

export default InputPin;
