import React, { useEffect, useState } from 'react';

import Table from 'components/Table';
import { useRGetLoans } from 'repositories/merchant/loan';

import { useColumns } from './use-columns';
import { LoanListTableProps } from './types';
import { loanListTableCx } from './styles';
import { DEFAULT_LIMIT } from './constants';

import ListEmptyState from '../list-empty-state';

const LoanListTable: React.FC<LoanListTableProps> = (props) => {
  const { loanStatus } = props;
  const { columns } = useColumns({ loanStatus });

  const [isHaveData, setIsHaveData] = useState(false);
  const [page, setPage] = useState(0);

  const limit = DEFAULT_LIMIT;

  const { data, isLoading } = useRGetLoans({
    enabled: true,
    loanStatus,
    page: page + 1,
    limit,
  });

  const loanData = data?.data ?? [];
  const loanMeta = data?.meta;

  useEffect(() => {
    // to prevent keep showing data empty if go to next page
    if (loanData.length > 0) {
      setIsHaveData(true);
    }
  }, [loanData]);

  return (
    <div css={loanListTableCx}>
      {isHaveData || isLoading ? (
        <Table
          getRowId={(row) => row.loanXid}
          columns={columns}
          pagination
          loading={isLoading}
          rows={loanData}
          rowCount={loanMeta?.total}
          onPageChange={(val) => setPage(val)}
          pageSize={limit}
          page={page}
          paginationMode='server'
        />
      ) : (
        <ListEmptyState />
      )}
    </div>
  );
};

export default LoanListTable;
