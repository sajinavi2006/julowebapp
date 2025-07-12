import { Suspense, lazy } from 'react';

const Login = lazy(() => import('./Login'));

const LazyLogin = () => (
  <Suspense fallback>
    <Login />
  </Suspense>
);

export default LazyLogin;
