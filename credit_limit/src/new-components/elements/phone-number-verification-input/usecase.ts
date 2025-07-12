import { useCallback } from 'react';

export function useHandleKeyDown() {
  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (/[^a-zA-Z0-9]/.test(e.key) || /^[a-zA-Z]$/.test(e.key))
        return e.preventDefault();

      if (
        e.key.length > 1 ||
        ((e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) &&
          e.key.length <= 1)
      )
        return;
    },
    [],
  );

  return handleOnKeyDown;
}
