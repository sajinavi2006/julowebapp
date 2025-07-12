import React from 'react';
import Lazyload from 'components/Lazyload';
import { DialogInfoProp } from './types';

const DialogInfoLazy = React.lazy(
  () => import(/* webpackChunkName: "dialog-info-component" */ './DialogInfo'),
);

const DialogInfo = (props: DialogInfoProp) => {
  return <Lazyload component={DialogInfoLazy} animationLoading {...props} />;
};

export default DialogInfo;
