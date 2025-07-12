export interface LoanCreationParam {
  loanType: string;
  loanAmount: string;
  loanDuration: string;
  installmentNumber: string;
  invoiceNumber: string;
  invoiceFile: string;
  bilyetFile?: string;
}
export interface LoanCreationResponse {
  loanXid: string;
}
export interface LoanAgreementParam {
  isAgreeAgreement: boolean;
}
