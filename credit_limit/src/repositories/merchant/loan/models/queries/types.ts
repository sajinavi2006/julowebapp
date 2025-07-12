import { LoanDetailStatusType } from 'pages/merchant/types';

export interface LoansResponse {
  loanXid: string;
  loanAmount: number;
  cdate: string;
  loanStatus: number;
}

export interface LoansMeta {
  lastPage: number;
  total: number;
}
export interface LoanResponse {
  loanXid: string;
  cdate: string;
  email: string;
  loanStatus: LoanDetailStatusType;
  loanType: string;
  loanAmount: number;
  loanDuration: number;
  installmentNumber: number;
  invoiceNumber: string;
  distributorName: string;
  interestRate: string;
  provisionRate: string;
  installmentAmount: number;
  provisionAmount: number;
  invoiceFile: string;
  invoiceUrl: string;
  bilyetFile: string;
  bilyetUrl: string;
  skrtpFile: string;
  skrtpUrl: string;
  maxPlatformCheck: 'DONE' | 'IN_PROGRESS' | 'FAIL';
}

export interface MasterAgreementResponse {
  data: string;
}
