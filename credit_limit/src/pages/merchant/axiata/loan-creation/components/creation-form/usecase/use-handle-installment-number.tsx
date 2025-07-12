import { useEffect, useMemo } from 'react';

import { LoanCreationParam } from 'repositories/merchant/loan';
import { UseFormReturn } from 'hooks/react-hook-form';

interface UseHandleInstallmentNumberProps {
  form: UseFormReturn<LoanCreationParam, unknown>;
}

export const useHandleInstallmentNumber = (
  props: UseHandleInstallmentNumberProps,
) => {
  const { form } = props;

  const { watch, setValue } = form;

  const loanDurationWatched = watch('loanDuration');
  const installmentNumberWatched = watch('installmentNumber');

  const loanDurationOptions = useMemo(() => {
    const options = [{ label: '1x', value: '1' }];

    const durationOptions = { start: 60, end: 180, multiplier: 30 };

    for (
      let i = durationOptions.start, duration = 2;
      i <= durationOptions.end;
      i += durationOptions.multiplier, duration++
    ) {
      if (loanDurationWatched === i.toString()) {
        options.push({ label: `${duration}x`, value: duration.toString() });
      }
    }
    return options;
  }, [loanDurationWatched]);

  useEffect(() => {
    if (installmentNumberWatched !== '1') {
      setValue('installmentNumber', '');
    }
  }, [loanDurationWatched]);

  return {
    isDisabled: !loanDurationWatched,
    selectOptions: loanDurationOptions,
    selectValue: installmentNumberWatched,
  };
};
