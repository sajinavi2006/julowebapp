import { useContext } from 'react';

import { OtpContext } from './OtpProvider';

function useOtp() {
  return useContext(OtpContext);
}

export default useOtp;
