import { createContext } from "react";

import type { StepContextProps, StepProviderProps } from "./types";

export const StepContext = createContext<StepContextProps>({
  currentStep: 0,
  onNextStep: () => { },
  onPrevStep: () => { },
  goTo: () => { },
});

function StepProvider(props: StepProviderProps) {
  const { children, ...contextValue } = props;

  return (
    <StepContext.Provider value={contextValue}>{children}</StepContext.Provider>
  );
}

export default StepProvider;