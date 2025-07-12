import React from 'react';
import PropTypes from 'prop-types';
import PublicRoute from 'components/PublicRoute';

const PaylaterPublicRoute = ({ component, path, ...rest }) => {
  return (
    <PublicRoute
      {...rest}
      exact
      component={component}
      path={path}
      redirectUrl={`/paylater/home`}
    />
  );
};

PaylaterPublicRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  path: PropTypes.string,
};

export default PaylaterPublicRoute;
