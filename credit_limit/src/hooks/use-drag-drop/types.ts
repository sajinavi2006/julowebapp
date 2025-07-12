export interface UseDragDropOptions {
  onDrop?: (files: File[], errors: boolean[], e: DragEvent) => void;
  disabled?: boolean;
  limitFile?: number;
  /**
   * @description limiFileSize in KB value
   */
  limitFileSize?: number;
  onErrorLimitFileSize?: (errors: boolean[]) => void;
  onErrorLimitFile?: (isExceedLimitFile: boolean) => void;
}
