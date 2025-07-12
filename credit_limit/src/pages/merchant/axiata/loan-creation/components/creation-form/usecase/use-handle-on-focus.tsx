import { useCallback, useState } from 'react';

export const useHandleOnFocus = () => {
  const [isFocus, setIsFocus] = useState<{ [key: string]: boolean }>({});

  const onFocus = useCallback((fieldName: string) => {
    setIsFocus({ ...isFocus, [fieldName]: true });
  }, []);

  const onBlur = useCallback((fieldName: string) => {
    setIsFocus({ ...isFocus, [fieldName]: false });
  }, []);

  return {
    onFocus,
    onBlur,
    isFocus,
  };
};
