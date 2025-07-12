import { useCallback, useState } from 'react';

function useHandleOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, onClose: handleClose, onOpen: handleOpen };
}

export default useHandleOverlay;
