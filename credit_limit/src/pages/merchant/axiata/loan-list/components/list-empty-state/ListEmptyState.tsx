import { LoanEmpty } from 'new-components/shapes';

import { emptyCx } from './styles';

const ListEmptyState = () => {
  return (
    <div css={emptyCx}>
      <LoanEmpty />
      <span>Belum Ada Pinjaman Diajukan</span>
      <span>
        Semua pengajuan yang sedang dalam proses
        <br /> akan ditampilkan di halaman ini, ya.
      </span>
    </div>
  );
};

export default ListEmptyState;
