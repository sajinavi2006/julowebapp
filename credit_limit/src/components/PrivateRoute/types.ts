export interface PrivateRouteProps extends Record<string, unknown> {
  component: (props: Record<string, unknown>) => JSX.Element;
  redirectUrl?: string;
  type: 'webview' | 'view';
}
