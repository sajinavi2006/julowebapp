export interface MethodValueTypes {
  url: string;
  // data can be anything on axios
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  headers?: unknown;
  params?: unknown;
}

export interface OptionsTypes {
  authErrorRedirect?: string;
}
