import thousandSeparator from '@julofinance/web-helpers/dist/number/thousandSeparator';

import { LimitBackground } from './shapes';
import type { LimitBannerProps } from './types';
import { limitBannerCx } from './styles';

const LimitBanner = (props: LimitBannerProps) => {
  const { limit = '' } = props;

  return (
    <div css={limitBannerCx} className='limit-banner'>
      <div className='banner-text'>
        <div className='label'>Kamu mendapatkan limit sebesar</div>
        <div className='limit'>Rp{thousandSeparator(String(limit))}</div>
      </div>
      <LimitBackground className='limit-bg' />
    </div>
  );
};

export default LimitBanner;
