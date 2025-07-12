export interface PageGuardProps {
  children: React.ReactElement;
  previousAllowedState: string[];
  restrictedTo: string;
}

export interface LocationState {
  from: string;
}
