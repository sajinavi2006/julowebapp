import useStep from './use-step';

export type StepContextProps = ReturnType<typeof useStep>;

export interface StepProviderProps extends StepContextProps {
  children: React.ReactNode;
}

export interface UseStepOptions {
  defaultStep?: number;
  totalStep: number;
  onPrevStep?(): void;
  onNextStep?(): void;
}
