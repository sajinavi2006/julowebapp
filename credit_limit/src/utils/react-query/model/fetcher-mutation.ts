import { HTTPMethods } from './http';

// variables can be anything
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FMOptions<TVars = any> {
  variables?: TVars;
  context: {
    path: string;
    method?: HTTPMethods;
    meta?: Record<string, unknown>;
    headers?: Record<string, string>;
    isFormData?: boolean;
  };
}
