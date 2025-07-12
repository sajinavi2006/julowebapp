import React from 'react';
import PropTypes from 'prop-types';
import PrivateRoute from 'components/PrivateRoute';

const LinkAjaPrivateRoute = ({ component, path, ...rest }) => {
  return (
    <PrivateRoute
      {...rest}
      exact
      component={component}
      path={path}
      redirectUrl={`/linkaja/nik`}
    />
  );
};

LinkAjaPrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  path: PropTypes.string,
};

export default LinkAjaPrivateRoute;
