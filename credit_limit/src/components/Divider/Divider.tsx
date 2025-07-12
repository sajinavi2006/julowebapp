import React from 'react';
import DefaultDivider, { DividerProps } from '@material-ui/core/Divider';

import { dividerCx } from './styles';

interface Props extends DividerProps {
  className?: string;
}

const Divider: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div id='divider-component' css={dividerCx} className={className}>
      <DefaultDivider {...props} />
    </div>
  );
};

export default Divider;
