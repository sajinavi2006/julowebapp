import { css } from '@emotion/react';

export const fieldGroupCx = css`
  display: flex;
  flex-direction: column;

  .field-label {
    font-size: 0.8125rem;
    margin-bottom: 0.375rem;
  }

  .field-info {
    margin-top: 0.25rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    .field-info-item {
      font-size: 0.75rem;
      &.error {
        color: #f44336;
      }

      &.error,
      &.helper {
        width: 100%;
      }

      &.helper,
      &.counter {
        color: #616161;
      }

      &.counter {
        margin-left: auto;
        width: fit-content;
        white-space: nowrap;
      }
    }

    .error + .counter,
    .helper + .counter {
      margin-left: 0.25rem;
      flex: 1;
    }
  }
`;
