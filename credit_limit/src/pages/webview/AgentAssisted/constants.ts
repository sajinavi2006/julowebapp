import type { AgentAssistedPage } from './hooks';
import { Loading, Home, CreatePin, Success, ErrorToken } from './pages';

export const AgentAssistedPages: Record<
  AgentAssistedPage,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: any) => JSX.Element
> = {
  home: Home,
  loading: Loading,
  'create-pin': CreatePin,
  'confirm-pin': CreatePin,
  'error-token': ErrorToken,
  success: Success,
};
