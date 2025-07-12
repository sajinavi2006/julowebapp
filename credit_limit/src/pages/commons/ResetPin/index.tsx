import React from 'react';
import Lazyload from 'components/Lazyload';
import { ResetPinProps } from './types';

const ResetPinLazy = React.lazy(
  () => import(/* webpackChunkName: "common-reset-pin-page" */ './ResetPin'),
);

const ResetPin = (props: ResetPinProps) => {
  return <Lazyload component={ResetPinLazy} animationLoading {...props} />;
};

export default ResetPin;
