export interface ApplicationParams {
  name: string;
  nik: string;
  email: string;
  phoneNumber: string;
  otherPhoneNumber?: string;
  agreementRegistration: boolean;
  agreementTnc: boolean;
}
