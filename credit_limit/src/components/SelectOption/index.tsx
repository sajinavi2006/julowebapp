import React from 'react';
import Lazyload from 'components/Lazyload';
import { SelectProps } from './type';

const SelectOptionLazy = React.lazy(
  () =>
    import(/* webpackChunkName: "select-option-component" */ './SelectOption'),
);

const SelectOption: React.FC<SelectProps> = (props) => {
  return <Lazyload component={SelectOptionLazy} animationLoading {...props} />;
};

export default SelectOption;
