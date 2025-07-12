import React from 'react';
import Lazyload from 'components/Lazyload';
import { Props } from './type';

const FormTakePhotoLazy = React.lazy(
  () =>
    import(
      /* webpackChunkName: "form-take-photo-component" */ './FormTakePhoto'
    )
);

const FormTakePhoto: React.FC<Props> = (props) => {
  return <Lazyload component={FormTakePhotoLazy} animationLoading {...props} />;
};

export default FormTakePhoto;
