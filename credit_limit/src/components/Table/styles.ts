import { css } from '@emotion/react';

export const tableCx = css`
  display: flex;
  height: 100%;

  &:focus-visible {
    outline: none;
  }

  .MuiDataGrid-root {
    border: none;

    .MuiDataGrid-columnsContainer {
      background-color: #ededed;
      font-weight: 700;
    }

    .MuiDataGrid-columnSeparator {
      display: none !important;
    }

    .MuiDataGrid-columnHeaderTitle {
      font-weight: 500;
      font-size: 0.875rem;
      color: #000000;
    }

    .MuiDataGrid-row {
      color: #404040;
    }

    .MuiDataGrid-cell:focus {
        outline: none;
    }

    .MuiDataGrid-cell:focus-within {
        outline: none;
    }

    .MuiDataGrid-columnHeaderTitleContainer {
        padding: 0;
    }
  }
`;
