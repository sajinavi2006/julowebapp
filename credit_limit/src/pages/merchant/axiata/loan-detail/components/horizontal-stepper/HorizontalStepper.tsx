import React from 'react';
import Typography from '@material-ui/core/Typography';

import { activeStepCx, stepCx, stepInfoCx, stepperCx } from './styles';

interface HorizontalStepperProps {
  totalSteps: number;
  activeStep: number;
  hidden?: boolean;
}

const HorizontalStepper: React.FC<HorizontalStepperProps> = ({
  totalSteps,
  activeStep,
  hidden = false,
}) => {
  if (hidden) return null;

  return (
    <div css={stepperCx}>
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          css={[stepCx, index + 1 <= activeStep && activeStepCx]}
        ></div>
      ))}
      <Typography css={stepInfoCx} variant='body2'>
        {String(activeStep)} / {String(totalSteps)}
      </Typography>
    </div>
  );
};

export default HorizontalStepper;
