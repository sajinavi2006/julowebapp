import loading from 'assets/img/loading.gif';

import { useUserContext } from 'providers/UserProvider';
import useGlobalState from 'actions';
import { overlayCx } from './styles';

function LoadingOverlay() {
  const { isLoadingOverlay } = useUserContext();
  const [state] = useGlobalState();
  return state.isLoadingOverlayShown || isLoadingOverlay ? (
    <div className={overlayCx}>
      <img src={loading} alt='' className='loading-img' />
    </div>
  ) : null;
}

export default LoadingOverlay;
