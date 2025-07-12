import React from 'react';
import { AccordionProps } from '@material-ui/core';

import { StyledAccordion } from './styles';

const Accordion: React.FC<AccordionProps> = ({ children, ...props }) => {
  return (
    <div id='accordion-component'>
      <StyledAccordion elevation={0} square {...props}>
        {children}
      </StyledAccordion>
    </div>
  );
};

export default Accordion;
