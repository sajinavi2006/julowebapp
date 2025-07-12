import { useMemo } from 'react';

import { SelectOption, SelectProps } from '../types';
import { placeholderCx } from '../styles';

interface UseSelectPlaceholderProps {
  options?: SelectProps['options'];
  placeholder?: string;
}

const useSelectPlaceholder = (props: UseSelectPlaceholderProps) => {
  const { options, placeholder: placeholderText } = props;
  
  const placeholder = useMemo(() => {
    if (!placeholderText) return {};

    if (!options) return {};

    const placeholderElement = <div css={placeholderCx}>{placeholderText}</div>;

    return {
      displayEmpty: true,
      renderValue: (val: unknown) => {
        if (val) {
          return typeof options[0] === 'object'
            ? (options as SelectOption[]).find((obj) => obj.value === val)
                ?.label
            : val;
        }
        return placeholderElement;
      },
    };
  }, [options]);

  return placeholder;
};

export default useSelectPlaceholder;
