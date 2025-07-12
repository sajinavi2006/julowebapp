export interface PublicRouteProps {
  component: (props: Record<string, unknown>) => JSX.Element;
  redirectUrl?: string;
  type: 'webview' | 'view';
  [key: string]: unknown;
}
