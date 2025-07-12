import { Suspense, lazy } from 'react';

const ApplicationLazy = lazy(() => import('./Application'));

const Application = () => (
  <Suspense fallback>
    <ApplicationLazy />
  </Suspense>
);

export default Application;
