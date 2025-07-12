export interface UseChooseFileOptions {
  multiple?: boolean;
  onChooseFile?: (files: File[], errors: boolean[]) => void;
  disabled?: boolean;
  accept?: string[];
  onErrorLimitFileSize?: (errors: boolean[]) => void;
  /**
   * @description limiFileSize in KB value
   */
  limitFileSize?: number;
}
