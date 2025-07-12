import { css } from '@emotion/react';

import { ChipTypes } from './types';
import { colorsMapper } from './utils/colors-mapper';

export const chipCx = ({ type = 'default' }: { type?: ChipTypes }) => css`
  display: inline-flex;
  
  .MuiChip-root {
    color: ${colorsMapper(type).color};
    background-color: ${colorsMapper(type).background};
    border: 1px ${colorsMapper(type).border} solid;
  }
`;
