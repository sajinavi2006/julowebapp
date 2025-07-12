import { DataGridProps, GridColDef } from '@mui/x-data-grid';

export interface TableProps extends DataGridProps {
    columns: GridColDef[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rows: any;
  }