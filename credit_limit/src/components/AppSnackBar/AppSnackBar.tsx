import { cx } from '@emotion/css';

import { useUserContext } from 'providers/UserProvider';
import useGlobalState from 'actions';

function AppSnackBar() {
  const { isNotificationOpened, notificationMessage, notificationSeverity } =
    useUserContext();

  const [state] = useGlobalState();
  const isShowNotificationFromGlobalState =
    state.isNotificationOpened && state.notificationMessage;

  const message = state.notificationMessage || notificationMessage;
  const isOpened = isShowNotificationFromGlobalState || isNotificationOpened;
  const severity = state.notificationSeverity || notificationSeverity;

  return (
    <div
      data-testid='snackbar'
      id='snackbar'
      // pre-wrap to make \n new line
      style={{ whiteSpace: 'pre-wrap' }}
      className={cx({
        ['show']: Boolean(isOpened),
        ['success']: Boolean(severity),
        ['fail']: Boolean(!severity),
      })}
    >
      {message}
    </div>
  );
}

export default AppSnackBar;
