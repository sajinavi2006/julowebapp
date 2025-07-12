import humps from 'humps';

type FetchArgumentType = Parameters<typeof fetch>;
export type FetchRequestInfoType = NonNullable<FetchArgumentType['0']>;
export type FetchInitType = NonNullable<FetchArgumentType['1']>;

export class CustomError<TPayload = Record<string, unknown>> extends Error {
  public retry: boolean;

  public payload?: TPayload;

  constructor(message: string, retry: boolean, payload?: TPayload) {
    super(message);
    this.retry = retry;
    this.payload = payload
      ? (humps.camelizeKeys(payload) as TPayload)
      : payload;
  }
}
