import { Suspense, lazy } from 'react';

const Register = lazy(() => import('./Register'));

const LazyRegister = () => (
  <Suspense fallback>
    <Register />
  </Suspense>
);

export default LazyRegister;
