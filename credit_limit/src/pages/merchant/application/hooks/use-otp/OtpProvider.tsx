import { createContext, useState } from 'react';

import { OtpContextProps, OtpProviderProps } from './types';

export const OtpContext = createContext<OtpContextProps>({
  isPhoneNumberVerified: false,
  setIsPhoneNumberVerified: () => {},
});

const OtpProvider = (props: OtpProviderProps) => {
  const { children } = props;

  const [isPhoneNumberVerified, setIsPhoneNumberVerified] = useState(false);

  return (
    <OtpContext.Provider
      value={{
        isPhoneNumberVerified,
        setIsPhoneNumberVerified,
      }}
    >
      {children}
    </OtpContext.Provider>
  );
};

export default OtpProvider;
