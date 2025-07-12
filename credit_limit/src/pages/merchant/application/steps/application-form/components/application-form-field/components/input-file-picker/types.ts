import { FieldGroupProps, AllFilePicker } from 'new-components/elements';

export interface InputFilePickerProps
  extends Omit<AllFilePicker, 'mode'>,
    Omit<FieldGroupProps, 'children'> {
  name: DocumentType;
  isLoading?: boolean;
  onChangeFile?: (files: File[]) => void;
  filePickerRef?: React.Ref<HTMLDivElement>;
  type: 'image' | 'document';
  isSingle?: boolean;
  mode: 'all' | 'choose' | 'drag-drop';
}

export type DocumentType =
  | 'financialDocument'
  | 'cashflowReport'
  | 'otherDocument'
  | 'nibDocument'
  | 'ktp'
  | 'selfie'
  | 'companyPhoto';
