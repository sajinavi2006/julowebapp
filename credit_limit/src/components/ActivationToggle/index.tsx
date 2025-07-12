import React from 'react';
import Lazyload from 'components/Lazyload';
import { ActivationToggleProps } from './types';

const ActivationToggleLazy = React.lazy(
  () =>
    import(
      /* webpackChunkName: "activation-toggle-component" */ './ActivationToggle'
    ),
);

const ActivationToggle: React.FC<ActivationToggleProps> = (props) => {
  return (
    <Lazyload component={ActivationToggleLazy} animationLoading {...props} />
  );
};

export default ActivationToggle;
