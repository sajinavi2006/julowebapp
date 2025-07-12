import React from 'react';
import Lazyload from 'components/Lazyload';
import { IButtonProps } from './type';

const ButtonFormLazy = React.lazy(
  () => import(/* webpackChunkName: "button-form-component" */ './ButtonForm'),
);

const ButtonFormComponent: React.FC<IButtonProps> = (props) => {
  return <Lazyload component={ButtonFormLazy} animationLoading {...props} />;
};

export default ButtonFormComponent;
