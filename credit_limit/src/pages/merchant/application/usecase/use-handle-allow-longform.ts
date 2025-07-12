import { useHistory } from 'react-router-dom';

import { ProfileResponse, useRGetProfile } from 'repositories/merchant/auth';

function useHandleAllowedLongform() {
  const { replace } = useHistory();
  const { isLoading } = useRGetProfile({
    onSuccess: (data: { data: ProfileResponse }) => {
      if (data.data.application.status !== 100) {
        replace('/merchant/axiata');
      }
    },
  });

  return isLoading;
}

export default useHandleAllowedLongform;
