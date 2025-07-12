import React, { Suspense } from 'react';

interface Props {
  /**
   * Component that need to lazying
   */
  component: React.ElementType;

  /**
   * custom loader component
   */
  loaderCustom?: React.ElementType;

  /**
   * what fallback you want.
   *
   * true => fallback with `feature/common/loader/Loading.tsx`
   *
   * false | undefined => <div>Loading..</div>
   */
  animationLoading?: boolean;
}

const LazyLoad: React.FC<Props> = ({
  component: Component,
  loaderCustom: LoaderCustom,
  ...rest
}) => {
  /**
   * Default Fallback when props `LoaderCustom` not given
   */

  return (
    <Suspense fallback={LoaderCustom ? <LoaderCustom /> : ''}>
      <Component {...rest} />
    </Suspense>
  );
};

export default LazyLoad;
