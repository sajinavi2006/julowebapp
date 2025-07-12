import React from 'react';
import Lazyload from 'components/Lazyload';
import { Props } from './type';

const CropImageLazy = React.lazy(() =>
  import(
    /* webpackChunkName: "crop-image-component" */ './CropImage'
  )
);

const CropImage: React.FC<Props> = (props) => {
  return (
    <Lazyload component={CropImageLazy} animationLoading {...props} />
  );
};

export default CropImage;
