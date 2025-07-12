import { useEffect, useState } from 'react';

import { termsPrivacy } from 'services/form';

export function useHandleAgreementContent() {
  const [agreementContent, setAgreementContent] = useState('');
  const [isAgreementLoading, setIsAgreementLoading] = useState(false);

  useEffect(() => {
    const getAgreement = async () => {
      setIsAgreementLoading(true);
      try {
        const response = await termsPrivacy();
        setAgreementContent(response.preface);
        setIsAgreementLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getAgreement();
  }, []);

  return {
    isAgreementLoading,
    agreementContent,
  };
}
