import { useFormContext } from 'hooks/react-hook-form';
import { useCallback } from 'react';

interface UseHandleAgreeAgreement {
  onClose: () => void;
}

function useHandleAgreeAgreement(props: UseHandleAgreeAgreement) {
  const { onClose } = props;

  const { setValue } = useFormContext();

  const onAgreeAgreement = useCallback(() => {
    setValue('agreementTnc', true);
    onClose();
  }, []);

  return { onAgreeAgreement };
}

export default useHandleAgreeAgreement;
