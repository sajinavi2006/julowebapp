import React from 'react';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { AccordionDetailsProps } from '@material-ui/core';

const AccordionDetails: React.FC<AccordionDetailsProps> = ({
  children,
  ...props
}) => {
  return (
    <div id='accordion-details-component'>
      <MuiAccordionDetails {...props}>{children}</MuiAccordionDetails>
    </div>
  );
};

export default AccordionDetails;
