import parse from 'html-react-parser';

import { Arrow } from 'new-components/shapes';

import { useIsScrollBottom } from '../../usecase';
import { AgreementDialogContentProps } from './types';
import { agreementDialogContentCx } from './styles';
import { PRIVACY_POLICY } from './constants';

const AgreementDialogContent = (props: AgreementDialogContentProps) => {
  const { agreementContent } = props;
  const { isScrollBottom, onScrollToBottom } = useIsScrollBottom();

  return (
    <div css={agreementDialogContentCx} className='agreement-dialog-content'>
      <div className='agreement-dialog-text'>
        {parse(agreementContent + PRIVACY_POLICY)}
      </div>
      {!isScrollBottom && (
        <div className='scroll-to-bottom' onClick={onScrollToBottom}>
          <Arrow
            width={12}
            height={12}
            transform='rotate(-90)'
            fill='#306CF7'
          />
          <span>Lihat ke Bawah</span>
        </div>
      )}
    </div>
  );
};

export default AgreementDialogContent;
