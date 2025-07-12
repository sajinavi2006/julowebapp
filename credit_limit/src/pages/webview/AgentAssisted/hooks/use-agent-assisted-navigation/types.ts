export type AgentAssistedPage =
  | 'create-pin'
  | 'confirm-pin'
  | 'success'
  | 'error-token'
  | 'loading'
  | 'home';

export interface AgentAssistedContextProps {
  page: AgentAssistedPage;
  goTo: React.Dispatch<React.SetStateAction<AgentAssistedPage>>;
}

export interface AgentAssistedNavigationProviderProps
  extends Pick<AgentAssistedContextProps, 'page'> {
  children: React.ReactNode;
  setPage: React.Dispatch<React.SetStateAction<AgentAssistedPage>>;
}
