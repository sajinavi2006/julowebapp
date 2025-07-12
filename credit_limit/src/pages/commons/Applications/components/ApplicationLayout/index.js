import React from 'react';
import Lazyload from 'components/Lazyload';

const ApplicationLayoutLazy = React.lazy(() =>
  import(
    /* webpackChunkName: "application-layout-component" */ './ApplicationLayout'
  )
);

const ApplicationLayout = (props) => {
  return (
    <Lazyload component={ApplicationLayoutLazy} animationLoading {...props} />
  );
};

export default ApplicationLayout;
