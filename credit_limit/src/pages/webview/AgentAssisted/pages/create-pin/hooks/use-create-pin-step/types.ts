export interface CreatePinStepContextProps {
  step: number;
  nextStep: (cb?: () => void) => void;
  prevStep: (cb?: () => void) => void;
}

export interface CreatePinStepProviderProps
  extends Pick<CreatePinStepContextProps, 'step'> {
  children: React.ReactNode;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
