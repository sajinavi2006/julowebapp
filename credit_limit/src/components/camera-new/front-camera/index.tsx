import React from 'react';
import LazyLoad from 'components/Lazyload';

const FrontCameraLazy = React.lazy(
  () =>
    import(
      /* webpackChunkName: "new-front-camera-component" */ './FrontCamera'
    ),
);

const FrontCamera: React.FC = (props) => {
  return <LazyLoad component={FrontCameraLazy} animationLoading {...props} />;
};

export default FrontCamera;
