import { useCallback, useState } from 'react';

function useShowAlert() {
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const onOpenAlert = useCallback(() => {
    setIsOpenAlert(true);
  }, []);

  const onCloseAlert = useCallback(() => {
    setIsOpenAlert(false);
  }, []);

  return { isOpenAlert, onOpenAlert, onCloseAlert };
}

export default useShowAlert;
