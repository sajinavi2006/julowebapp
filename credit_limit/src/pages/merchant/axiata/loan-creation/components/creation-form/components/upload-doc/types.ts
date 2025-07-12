import { ReactNode } from "react";

export interface UploadDocProps {
    name: string;
    label: string;
    labelIndicator?: ReactNode;
    infoText?: string;
    onChange?: (data?: File) => void;
    required?: boolean;
  }