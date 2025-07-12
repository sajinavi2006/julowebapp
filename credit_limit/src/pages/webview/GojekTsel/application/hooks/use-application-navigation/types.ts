import { pages } from './constants';

export interface ApplicationNavigationProviderProps {
  children: React.ReactNode;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export type ApplicationNavigationPage = (typeof pages)[number];

export interface ApplicationNavigationContextProps {
  navigate: (page: ApplicationNavigationPage) => void;
}
