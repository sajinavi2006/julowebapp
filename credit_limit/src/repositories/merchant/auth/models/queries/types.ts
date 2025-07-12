export interface ProfileResponse {
  email: string;
  nik: string;
  partner: string;
  fullname: string;
  application: {
    label: string;
    status: number;
  };
}
