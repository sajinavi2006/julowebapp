import { useMemo } from 'react';
import { MenuItem } from '@material-ui/core';

import type { SelectOption, SelectProps } from '../types';

interface UseSelectMapOptionsOption {
  options: SelectProps['options'];
}

function useSelectMapOptions({ options }: UseSelectMapOptionsOption) {
  const mappedOptions = useMemo(() => {
    if (!options) return;

    if (typeof options[0] === 'object')
      return (options as SelectOption[]).map(({ value, label, ...res }) => (
        <MenuItem key={value} value={value} {...res}>
          {label}
        </MenuItem>
      ));

    return (options as Array<string>).map((v, i) => (
      <MenuItem key={`${i}-${v}`} value={v}>
        {v}
      </MenuItem>
    ));
  }, [options]);

  return { mappedOptions };
}

export default useSelectMapOptions;
