import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { tableCx } from './styles';
import { TableProps } from './types';

const Table: React.FC<TableProps> = ({ columns, rows, ...props }) => {
  return (
    <div id='table-component' css={tableCx}>
      <DataGrid
        disableSelectionOnClick={true}
        autoHeight
        disableColumnMenu
        rows={rows}
        columns={columns}
        localeText={{
          MuiTablePagination: {
            labelDisplayedRows: ({ from, to, count }) => {
              return `${from}-${to} dari ${count}`;
            },
          },
        }}
        {...props}
      />
    </div>
  );
};

export default Table;
