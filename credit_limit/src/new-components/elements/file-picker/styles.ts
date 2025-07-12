import { css } from '@emotion/react';

export const filePickerCx = css`
  &:not([data-filepicker-mode='drag-drop']) {
    cursor: pointer;
  }

  &[data-filepicker-disabled='true'] {
    cursor: not-allowed;
  }
`;
