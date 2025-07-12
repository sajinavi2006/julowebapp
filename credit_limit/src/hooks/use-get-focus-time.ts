import { useEffect, useMemo, useRef, useState } from 'react';
import { QueryKey } from '@tanstack/react-query';

import { queryClient } from 'constants/client';

interface UseGetFocusTimeOptions {
  /**
   * {unit} seconds
   * @default 6s
   */
  interval?: number;
  queryKey: QueryKey;
}

/**
 * This hooks is used to help handled refetchOnWindowFocus so it has debounce time before it's able to refetch again
 */
export default function useGetFocusTime(options: UseGetFocusTimeOptions) {
  const { interval = 6, queryKey } = options;

  const currentFocusedTime = useRef<Date>(new Date());
  const previousFocusedTime = useRef<Date>(new Date());
  const [isAbleToFetch, setIsAbleToFetch] = useState<boolean>(false);
  const isFetching = useMemo(
    () => !!queryClient.isFetching(queryKey),
    [queryKey],
  );

  useEffect(() => {
    if (isFetching) {
      previousFocusedTime.current = new Date();
    }
  }, [isFetching]);

  useEffect(() => {
    function handleFocus() {
      const now = new Date();

      currentFocusedTime.current = now;
      if (previousFocusedTime.current && currentFocusedTime.current) {
        const difference = Math.round(
          ((currentFocusedTime.current?.getTime() || 0) -
            (previousFocusedTime.current?.getTime() || 0)) /
            1000,
        );

        if (difference >= interval) {
          setIsAbleToFetch(true);
          previousFocusedTime.current = now;
        } else {
          setIsAbleToFetch(false);
        }
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('focus', handleFocus, false);
      return () => {
        window.removeEventListener('focus', handleFocus);
      };
    }
  }, [interval]);

  return {
    currentFocusedTime,
    previousFocusedTime,
    isAbleToFetch,
  };
}
