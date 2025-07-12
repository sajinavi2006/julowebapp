import NumberFormat from 'react-number-format';
import { PhoneFormatCustomProps } from './types';

const PhoneFormatCustom = (props: PhoneFormatCustomProps) => {
  const { inputRef, onChange, defaultValue, ...resProps } = props;

  return (
    <NumberFormat
      {...resProps}
      getInputRef={inputRef}
      defaultValue={defaultValue as string | number | undefined}
      onChange={onChange}
      allowLeadingZeros
      pattern='[0-9],*'
      maxLength={14}
    />
  );
};

export default PhoneFormatCustom;
