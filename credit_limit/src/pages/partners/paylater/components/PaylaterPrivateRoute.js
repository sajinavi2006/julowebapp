import React from 'react';
import PropTypes from 'prop-types';
import PrivateRoute from 'components/PrivateRoute';

const PaylaterPrivateRoute = ({ component, path, ...rest }) => {
  return (
    <PrivateRoute
      {...rest}
      exact
      component={component}
      path={path}
      redirectUrl={`/paylater/nik`}
    />
  );
};

PaylaterPrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  path: PropTypes.string,
};

export default PaylaterPrivateRoute;
