import React from 'react';
import PropTypes from 'prop-types';
import PublicRoute from 'components/PublicRoute';

const LinkAjaPublicRoute = ({ component, path, ...rest }) => {
  return (
    <PublicRoute
      {...rest}
      exact
      component={component}
      path={path}
      redirectUrl={`/linkaja/home`}
    />
  );
};

LinkAjaPublicRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  path: PropTypes.string,
};

export default LinkAjaPublicRoute;
