import CircularProgress from '@material-ui/core/CircularProgress';

import { Logo } from 'new-components/shapes';
import { loadingCx } from './styles';

const Loading = () => {
  return (
    <div css={loadingCx} className='loading'>
      <header className='loading-header'>
        <Logo />
      </header>
      <div className='loading-content'>
        <CircularProgress className='loader' size='6.625rem' />
        <div className='description'>
          Sebentar ya, permintaanmu sedang diproses
        </div>
      </div>
    </div>
  );
};

export default Loading;
