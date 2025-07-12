export interface ApplicationUseParams {
  page:
    | 'personal_identity'
    | 'family_information'
    | 'financial'
    | 'loan_application';
}

export interface ApplicationParam {
  email: string;
  nik: string;
  place_of_birth: string;
  gender: 'male' | 'female' | 'Laki-laki' | 'Perempuan';
  mother_name: string;
  mother_phone_number: string;
  couple_name?: string;
  couple_phone_number?: string;
  expense_per_month: string;
  expenses_monthly_house_rent: string;
  debt_installments_per_month: string;
  request_loan_amount: string;
  tenor: string;
  ktp_image: string;
  selfie: string;
  marriage_status: 'married' | 'not_married' | 'Lajang' | 'Menikah';
  phone_number: string;
}

export interface ErrorType {
  message: string;
  response: {
    data: {
      errors: string[];
    };
  };
}
