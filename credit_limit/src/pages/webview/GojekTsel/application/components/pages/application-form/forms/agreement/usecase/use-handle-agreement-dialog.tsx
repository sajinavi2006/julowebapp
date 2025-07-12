import { useCallback, useState } from 'react';

import { useFormContext } from 'hooks/react-hook-form';

export function useHandleAgreementDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { setValue } = useFormContext();

  const handleOnClose = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setIsOpen((prev) => !prev);
      } else {
        setValue('agreementTnc', e.target.checked);
      }
    },
    [],
  );

  return {
    isOpen,
    handleCheckboxChange,
    handleOnClose,
  };
}
