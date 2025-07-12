export type LoanStatusTabType = 'IN_PROGRESS' | 'ACTIVE' | 'DONE';

export interface LoanListTableProps {
  loanStatus: LoanStatusTabType;
}
