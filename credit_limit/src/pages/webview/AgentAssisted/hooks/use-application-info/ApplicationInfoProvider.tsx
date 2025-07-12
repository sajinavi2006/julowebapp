import { createContext } from 'react';

import { ApplicationInfo } from '../../types';
import { ApplicationInfoProviderProps } from './types';

export const ApplicationInfoContext = createContext<ApplicationInfo>({
  applicationStatus: 'processed',
  customer: '',
  creditLimit: null,
});

const ApplicationInfoProvider = (props: ApplicationInfoProviderProps) => {
  const { applicationInfo, children } = props;

  return (
    <ApplicationInfoContext.Provider value={applicationInfo}>
      {children}
    </ApplicationInfoContext.Provider>
  );
};

export default ApplicationInfoProvider;
