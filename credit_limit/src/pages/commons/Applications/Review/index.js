import React from 'react';
import Lazyload from 'components/Lazyload';

const ReviewLazy = React.lazy(() =>
  import(
    /* webpackChunkName: "common-review-page" */ './Review'
  )
);

const Review = (props) => {
  return (
    <Lazyload component={ReviewLazy} animationLoading {...props} />
  );
};

export default Review;
