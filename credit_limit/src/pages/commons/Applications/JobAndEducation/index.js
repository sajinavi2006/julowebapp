import React from 'react';
import Lazyload from 'components/Lazyload';

const JobAndEducationLazy = React.lazy(() =>
  import(
    /* webpackChunkName: "common-job-education-page" */ './JobAndEducation'
  )
);

const JobAndEducation = (props) => {
  return (
    <Lazyload component={JobAndEducationLazy} animationLoading {...props} />
  );
};

export default JobAndEducation;
