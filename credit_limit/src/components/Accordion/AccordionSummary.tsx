import React from 'react';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { AccordionSummaryProps } from '@material-ui/core';

import { Chevron } from 'new-components/shapes';

const AccordionSummary: React.FC<AccordionSummaryProps> = ({
  children,
  ...props
}) => {
  return (
    <div id='accordion-summary-component'>
      <MuiAccordionSummary
        expandIcon={
          <div>
            <Chevron style={{ transform: 'rotate(90deg)' }} fill='#414042' />
          </div>
        }
        {...props}
      >
        {children}
      </MuiAccordionSummary>
    </div>
  );
};

export default AccordionSummary;
