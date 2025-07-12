export interface SliderProps {
  data: unknown[];
  marks?: boolean;
  value: number;
  max: number;
  onChange?: (value: unknown) => void;
}
