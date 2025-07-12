export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  partner: string;
}

export interface LoginParam {
  nik: string;
  password: string;
}

export interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
  partner: string;
}

export interface RegisterParam {
  email: string;
  nik: string;
  password: string;
  confirmPassword: string;
}
