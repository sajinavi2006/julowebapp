import '@emotion/react';

declare module '@emotion/react' {
  interface Colors extends Record<string, string> {
    primary: string;
    white: string;
  }

  export interface Theme extends Record<string, Record<string, string>> {
    colors: Colors;
  }
}
