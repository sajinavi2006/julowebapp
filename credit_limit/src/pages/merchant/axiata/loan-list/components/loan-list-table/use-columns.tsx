import { useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  GridAlignment,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';

import formatMoney from '@julofinance/web-helpers/dist/string/formatMoney';
import formatDate from '@julofinance/web-helpers/dist/date/formatDate';

import { LOAN_PAID_OFF } from 'pages/merchant/axiata/constants';
import { Button } from 'new-components/elements';
import { Chevron } from 'new-components/shapes';

import { loanStatusMapper } from '../../utils/loan-status-mapper';
import { LoanStatusTabType } from './types';

interface UseColumnsProps {
  loanStatus: LoanStatusTabType;
}

export const useColumns = (props: UseColumnsProps) => {
  const { loanStatus } = props;

  const history = useHistory();
  const { partnerName } = useParams<{ partnerName: string }>();

  const goToDetail = (id: string) => {
    history.push(`/merchant/${partnerName}/loan/${id}`);
  };

  const columns = useMemo<GridColDef[]>(
    () =>
      [
        { field: 'loanXid', headerName: 'ID Pinjaman' },
        {
          field: 'loanAmount',
          headerName: 'Jumlah Pinjaman',
          align: 'right' as GridAlignment,
          renderCell: (param: GridRenderCellParams) => (
            <div className='loan-amount-cell'>
              {param.formattedValue
                ? formatMoney(param.formattedValue as number)
                : ''}
            </div>
          ),
        },
        {
          field: 'cdate',
          headerName: 'Tanggal Peminjaman',
          renderCell: (param: GridRenderCellParams) =>
            param.formattedValue
              ? formatDate(param.formattedValue as string, 'DD/MM/YYYY')
              : '',
        },
        {
          field: 'loanStatus',
          headerName: 'Status Pinjaman',
          width: 230,
          renderCell: (param: GridRenderCellParams) =>
            param.formattedValue
              ? loanStatusMapper(param.formattedValue as number)
              : '',
        },
        {
          field: '',
          headerName: '',
          renderCell: (param: GridRenderCellParams) => {
            if (param.row.loanStatus !== LOAN_PAID_OFF) {
              return (
                <Button
                  onClick={() => {
                    param.row.loanXid ? goToDetail(param.row.loanXid) : null;
                  }}
                  className='go-to-button'
                >
                  {loanStatus === 'IN_PROGRESS'
                    ? 'Lihat Proses'
                    : 'Lihat Detail'}
                  <Chevron
                    className='chevron-icon'
                    fill='white'
                    width={10}
                    height={15}
                  />
                </Button>
              );
            }
          },
        },
      ].map((column) => ({
        ...column,
        sortable: false,
        minWidth: 200,
      })),
    [],
  );
  return { columns };
};
