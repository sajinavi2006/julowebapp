import React from 'react';
import Lazyload from 'components/Lazyload';
import { Props } from './type';

const InputAutocompleteLazy = React.lazy(() =>
  import(
    /* webpackChunkName: "input-auto-complete-component" */ './InputAutocomplete'
  )
);

const InputAutocomplete: React.FC<Props> = (props) => {
  return (
    <Lazyload component={InputAutocompleteLazy} animationLoading {...props} />
  );
};

export default InputAutocomplete;
