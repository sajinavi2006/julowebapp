import { LoanResponse } from "repositories/merchant/loan";

export interface MasterAgreementModalProps {
    loanData: LoanResponse;
    open: boolean;
    onClose?: () => void;
}

export interface SuccessModalProps {
    open: boolean;
}