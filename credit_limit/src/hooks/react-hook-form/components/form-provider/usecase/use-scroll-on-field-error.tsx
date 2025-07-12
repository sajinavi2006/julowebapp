import { MutableRefObject, useEffect, useRef } from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';

interface UseScrollOnFieldErrorOptions<TFields extends FieldValues> {
  errors: FieldErrors<TFields>;
  submitCount: number;
  fieldsRef: MutableRefObject<Record<string, HTMLDivElement | null>>;
  scrollToFieldOnError: boolean;
}

function useScrollOnFieldError<TFields extends FieldValues>({
  errors,
  submitCount,
  fieldsRef,
  scrollToFieldOnError,
}: UseScrollOnFieldErrorOptions<TFields>) {
  const prevSubmitAttempt = useRef(submitCount);

  useEffect(() => {
    if (!scrollToFieldOnError) return;

    if (
      Object.keys(errors).length > 0 &&
      submitCount !== prevSubmitAttempt.current
    ) {
      const [, ref] =
        Object.entries(fieldsRef.current).find(([key]) => {
          return !!errors[key as keyof TFields];
        }) ?? [];

      ref?.scrollIntoView();
      prevSubmitAttempt.current = submitCount;
    }
  }, [errors, fieldsRef, scrollToFieldOnError, submitCount]);

  return { fieldsRef };
}

export default useScrollOnFieldError;
