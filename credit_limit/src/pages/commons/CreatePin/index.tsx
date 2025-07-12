import React from 'react';
import Lazyload from 'components/Lazyload';

const CreatePinLazy = React.lazy(
  () => import(/* webpackChunkName: "create-pin-page" */ './CreatePin'),
);

const CreatePin = () => {
  return <Lazyload component={CreatePinLazy} animationLoading />;
};

export default CreatePin;
