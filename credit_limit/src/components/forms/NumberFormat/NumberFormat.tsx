import React from 'react';
import NumberFormatLib from 'react-number-format';
import { Props } from './type';

const NumberFormat: React.FC<Props> = (props) => {
  const { inputRef, onChange, ...other } = props;

  function currencyFormatter(val: string): string {
    return (val && val.toString().replace(/^a*$/, '')) || '';
  }

  return (
    <NumberFormatLib
      {...other}
      getInputRef={inputRef}
      format={currencyFormatter}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      allowLeadingZeros={true}
      pattern='[0-9],*'
    />
  );
};

export default NumberFormat;
