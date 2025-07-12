import type { ComponentProps } from 'react';

import type { FunctionalComponent } from './type';

/**
 * Funtion to handle multiple initiate Providers.
 * Directly inject your provider or with array to add provider props.
 * @example combineProviders([Provider1, Provider2])
 * @example combineProviders([Provider1, [Provider2, provider2Props]])
 * @param providers
 * @returns
 */
const combineProviders = (
  providers: FunctionalComponent[],
): FunctionalComponent => {
  return providers.reduce(
    (AccumulatedProviders, CurrentProvider) => {
      return ({
        children,
      }: ComponentProps<FunctionalComponent>): JSX.Element => {
        return (
          <AccumulatedProviders>
            <CurrentProvider>{children}</CurrentProvider>
          </AccumulatedProviders>
        );
      };
    },
    ({ children }) => <>{children}</>,
  );
};

export default combineProviders;
