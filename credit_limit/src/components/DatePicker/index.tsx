import React from 'react';
import Lazyload from 'components/Lazyload';
import { Props } from './type';

const DatePickerLazy = React.lazy(
  () => import(/* webpackChunkName: "datepicker-component" */ './DatePicker')
);

const DatePicker: React.FC<Props> = (props) => {
  return <Lazyload component={DatePickerLazy} animationLoading {...props} />;
};

export default DatePicker;
