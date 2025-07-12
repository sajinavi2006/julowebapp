import React from 'react';
import MuiChip, { ChipProps as MuiChipProps } from '@material-ui/core/Chip';

import { chipCx } from './styles';
import { ChipTypes } from './types';

interface ChipProps extends MuiChipProps {
  className?: string;
  label: string;
  type?: ChipTypes;
}

const Chip: React.FC<ChipProps> = ({
  className,
  label,
  type = 'default',
  ...props
}) => {
  return (
    <div id='chip-component' css={chipCx({ type })} className={className}>
      <MuiChip size='small' label={label} {...props} />
    </div>
  );
};

export default Chip;
