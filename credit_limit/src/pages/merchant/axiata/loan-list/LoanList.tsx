import Tabs from 'components/Tabs';

import MainInfo from './components/main-info';
import LoanListTable from './components/loan-list-table';
import { tablesContainerCx } from './styles';

const LoanList = () => {

  const tabs = [
    {
      label: 'Pinjaman Diajukan',
      component: <LoanListTable loanStatus='IN_PROGRESS' />,
    },
    { label: 'Pinjaman Aktif', 
    component: <LoanListTable loanStatus='ACTIVE' />,
  },
    {
      label: 'Riwayat Pinjaman',
      component: <LoanListTable loanStatus='DONE' />,
    },
  ];

  return (
    <div id='merchant-loan-list'>
      <MainInfo />
      <div css={tablesContainerCx}>
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};

export default LoanList;
