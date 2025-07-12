import React from 'react';
import Lazyload from 'components/Lazyload';

const FamilyInformationLazy = React.lazy(() =>
  import(
    /* webpackChunkName: "common-family-information-page" */ './FamilyInformation'
  )
);

const FamilyInformation = (props) => {
  return (
    <Lazyload component={FamilyInformationLazy} animationLoading {...props} />
  );
};

export default FamilyInformation;
