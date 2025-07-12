import { useCallback, useState } from 'react';

function useHandleSuccessDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { onOpen, isOpen, onClose };
}

export default useHandleSuccessDialog;
