export interface OtpContextProps {
  isPhoneNumberVerified: boolean;
  setIsPhoneNumberVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface OtpProviderProps {
  children: React.ReactNode;
}
