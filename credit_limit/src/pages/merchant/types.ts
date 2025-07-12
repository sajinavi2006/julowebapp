import {
  LOAN_APPROVED,
  LOAN_CANCELLED,
  LOAN_CURRENT,
  LOAN_DRAFT,
  LOAN_INACTIVE,
  LOAN_LENDER_APPROVAL,
  LOAN_REJECTED,
} from './axiata/constants';

export type LoanDetailStatusType =
  | typeof LOAN_DRAFT
  | typeof LOAN_INACTIVE
  | typeof LOAN_LENDER_APPROVAL
  | typeof LOAN_CURRENT
  | typeof LOAN_CANCELLED
  | typeof LOAN_REJECTED
  | typeof LOAN_APPROVED
  ;
