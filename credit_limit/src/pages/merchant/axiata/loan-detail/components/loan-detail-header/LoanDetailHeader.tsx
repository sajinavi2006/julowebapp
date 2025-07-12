import Typography from '@material-ui/core/Typography';

import HorizontalStepper from '../horizontal-stepper';
import { useDetailContent } from '../../hooks/use-detail-content';

import { loanDetailHeaderCx } from './styles';
import { LoanDetailHeaderProps } from './types';

const LoanDetailHeader: React.FC<LoanDetailHeaderProps> = (props) => {
  const { data } = props;
  const { header } = useDetailContent({ loanStatus: data.loanStatus });
  
  return (
    <div css={loanDetailHeaderCx}>
      <div className='loan-step'>
        <HorizontalStepper
          totalSteps={4}
          activeStep={header.step}
          hidden={header.step === 0}
        />
      </div>
      <Typography className='header-title-text' variant='body1'>
        {header.title}
      </Typography>
      <Typography
      className='header-subtitle-text'
        variant='caption'
      >
        <Typography variant='caption'>
          {header.subtitle && 'Selanjutnya:'}
        </Typography>{' '}
        {header.subtitle}
      </Typography>
    </div>
  );
};

export default LoanDetailHeader;
