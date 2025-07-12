export interface TimerContextProps {
  startTime: () => void;
  setTime: (date?: string | number | Date) => void;
  time: number;
}

export interface TimerProviderProps {
  children: React.ReactNode;
}
