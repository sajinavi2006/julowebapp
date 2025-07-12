import React from 'react';
import LazyLoad from 'components/Lazyload';

const BackCameraLazy = React.lazy(
  () =>
    import(/* webpackChunkName: "new-back-camera-component" */ './BackCamera'),
);

const BackCamera: React.FC = (props) => {
  return <LazyLoad component={BackCameraLazy} animationLoading {...props} />;
};

export default BackCamera;
