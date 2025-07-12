import { GoogleButtonProps } from './components';
export interface GoogleProps {
  onSuccessGoogleLogin?: GoogleButtonProps['onSuccessLogin'];
  onSuccess?: GoogleButtonProps['onSuccess'];
  onErrorGoogleLogin?: GoogleButtonProps['onErrorLogin'];
  render?: GoogleButtonProps['render'];
  onCancelGoogleLogin?: GoogleButtonProps['onCancelLogin'];
}
