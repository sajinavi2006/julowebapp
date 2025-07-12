import { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';

import { useUserContext } from 'providers/UserProvider';
import { validateToken } from 'services/employee-financing';
import { useQueryParams } from 'utils/RouteHelper';
import store from 'utils/Store';

interface Props {
  children: React.ReactElement;
}

const ValidationWrapper: React.FC<Props> = ({ children }) => {
  const { handleLoadingOverlay, handleNotification } = useUserContext();
  const history = useHistory();
  const query = useQueryParams();
  const token = query?.get('token') || '';
  const storedToken = store.get('token') || '';

  // any type but with static declaration
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  const isErrorWithMessage = (
    error: unknown,
  ): error is {
    message: string;
    response: {
      data: {
        errors: string[];
      };
    };
  } => {
    return (
      typeof error === 'object' &&
      error !== null &&
      typeof (error as AxiosError).response?.data === 'object'
    );
  };

  const getTokenValidation = async () => {
    handleLoadingOverlay(true);
    try {
      await validateToken(token || storedToken);
      // if no error, then token is valid
      handleLoadingOverlay(false);
    } catch (error) {
      if (isErrorWithMessage(error)) {
        const errors = error?.response?.data?.errors ?? {};
        const errorMessage = Object.values(errors)[0];

        handleNotification({
          isOpen: true,
          message: errorMessage,
        });
        // notification will change to go to error page

        history.replace('/ef-pilot/expired');
        handleLoadingOverlay(false);
      }
    }
  };

  useEffect(() => {
    getTokenValidation();
  }, []);
  return children;
};

export default ValidationWrapper;
