import combineProviders from 'utils/combine-providers';
import { UserProvider } from 'providers/UserProvider';
import { ApplicationProvider } from 'pages/commons/Applications/providers/ApplicationProvider';
import { GlobalContextProviderProps } from './types';

/**
 * Combine Internal Custom Provider
 */
const GlobalProviders = combineProviders([UserProvider, ApplicationProvider]);

/**
 * GlobalContextProvider is component like CombineReducer but for Context Provider;
 * @param
 */
const GlobalContextProvider = ({ children }: GlobalContextProviderProps) => {
  return <GlobalProviders>{children}</GlobalProviders>;
};

export default GlobalContextProvider;
