
import React from 'react';
import Lazyload from 'components/Lazyload';
import { Props } from './type';

const NumberFormatLazy = React.lazy(() =>
  import(
    /* webpackChunkName: "number-format-component" */ './NumberFormat'
  )
);

const NumberFormat: React.FC<Props> = (props) => {
  return (
    <Lazyload component={NumberFormatLazy} animationLoading {...props} />
  );
};

export default NumberFormat;