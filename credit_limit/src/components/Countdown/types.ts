export interface CountdownProps {
  isLoading?: boolean;
  messageError: string;
  messageTimesUp?: string;
  isTimerReady: boolean;
  isTimesUp: boolean;
  showError: boolean;
  setIsTimesUp: (value: boolean) => void;
  triggerNewTimer: () => void;
}
