import React from 'react';
import Lazyload from 'components/Lazyload';

const ApplicationHeaderLazy = React.lazy(
  () =>
    import(
      /* webpackChunkName: "application-header-component" */ './ApplicationHeader'
    ),
);

const ApplicationHeader = () => {
  return <Lazyload component={ApplicationHeaderLazy} animationLoading />;
};

export default ApplicationHeader;
