import NumberFormat, {
  NumberFormatValues,
  SourceInfo,
} from 'react-number-format';

import _noop from '@julofinance/web-helpers/dist/fn/noop';

import { NumberFormatCustomProps } from './types';

const NumberFormatCustom = (props: NumberFormatCustomProps) => {
  const { inputRef, onChange = _noop, defaultValue, ...other } = props;

  const currencyFormatter = (val: string) => {
    return val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  function handleValueChange(
    values: NumberFormatValues,
    sourceInfo: SourceInfo,
  ) {
    const event = { ...sourceInfo.event };
    const target = { ...event.target };
    target.value = values.value;
    event.target = target;
    onChange({ ...event });
  }

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      format={currencyFormatter}
      defaultValue={defaultValue as string | number | undefined}
      onValueChange={handleValueChange}
      allowLeadingZeros={false}
    />
  );
};

export default NumberFormatCustom;
