import React from 'react';
import Lazyload from 'components/Lazyload';
import { Props } from './type';

const DialogLazy = React.lazy(() =>
  import(/* webpackChunkName: "dialog-component" */ './Dialog')
);

const Dialog: React.FC<Props> = (props) => {
  return <Lazyload component={DialogLazy} animationLoading {...props} />;
};

export default Dialog;