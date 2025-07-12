import { useCallback, useState } from 'react';

import callAllFn from '@julofinance/web-helpers/dist/fn/callAllFn';

interface UseHandleChangeEmaillDialogOptions {
  onCancel?: () => void;
  onOk?: () => void;
  onOpen?: () => void;
}

function useHandleChangeEmaillDialog(
  options: UseHandleChangeEmaillDialogOptions = {},
) {
  const { onCancel, onOk, onOpen } = options;

  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleOk = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    onCancel: callAllFn(handleCancel, onCancel),
    onOk: callAllFn(handleOk, onOk),
    onOpen: callAllFn(handleOpen, onOpen),
  };
}

export default useHandleChangeEmaillDialog;
