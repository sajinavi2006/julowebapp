import React from 'react';
import Lazyload from 'components/Lazyload';

const PersonalIdentityLazy = React.lazy(() =>
  import(
    /* webpackChunkName: "common-personal-identity-page" */ './PersonalIdentity'
  )
);

const PersonalIdentity = (props) => {
  return (
    <Lazyload component={PersonalIdentityLazy} animationLoading {...props} />
  );
};

export default PersonalIdentity;
