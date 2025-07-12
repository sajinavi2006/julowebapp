import { useEffect, useState } from 'react';

import { getApplicantInfo } from 'services/webview/agentAssisted';

import { ApplicationInfo } from '../types';
import { AgentAssistedPage } from '../hooks';

interface UseHandleGetApplicationInfoOptions {
  setPage: React.Dispatch<React.SetStateAction<AgentAssistedPage>>;
  isTokenExist: boolean;
}

export function useHandleGetApplicationInfo(
  options: UseHandleGetApplicationInfoOptions,
) {
  const { setPage, isTokenExist } = options;

  const [data, setData] = useState<ApplicationInfo>({
    applicationStatus: 'processed',
    creditLimit: null,
    customer: '',
  });

  const handleGetApplicantInfo = async () => {
    try {
      const result = await getApplicantInfo();
      if (result) {
        const {
          customer,
          application_status: applicationStatus,
          credit_limit: creditLimit,
        } = result.data;
        setData({ customer, applicationStatus, creditLimit });
      }
      setPage('home');
    } catch (error) {
      setPage('error-token');
    }
  };

  useEffect(() => {
    if (isTokenExist) {
      handleGetApplicantInfo();
    }
  }, [isTokenExist]);

  return data;
}
