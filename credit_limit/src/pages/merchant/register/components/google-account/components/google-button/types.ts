import { UseGoogleLoginOptions } from '@react-oauth/google';

import { ButtonProps } from 'new-components/elements';

export interface GoogleButtonProps extends ButtonProps {
  onSuccessLogin?: UseGoogleLoginOptions['onSuccess'];
  onErrorLogin?: UseGoogleLoginOptions['onError'];
  onCancelLogin?: UseGoogleLoginOptions['onNonOAuthError'];
  onSuccess?: (profile: GoogleProfile) => void;
  onError?: (error: unknown) => void;
  render?: RenderCustomGoogleButton;
}

interface RenderCustomGoogleButtonProps {
  onClick?: () => void;
}

export type RenderCustomGoogleButton = (
  props: RenderCustomGoogleButtonProps,
) => React.ReactNode;

export interface GoogleProfile {
  email: string;
  name: string;
}
