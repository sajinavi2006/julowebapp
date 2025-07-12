import React from 'react';
import Lazyload from 'components/Lazyload';

const AppSnackBarLazy = React.lazy(() =>
  import(/* webpackChunkName: "app-snack-bar-component" */ './AppSnackBar')
);

const AppSnackBar: React.FC = (props) => {
  return <Lazyload component={AppSnackBarLazy} animationLoading {...props} />;
};

export default AppSnackBar;
