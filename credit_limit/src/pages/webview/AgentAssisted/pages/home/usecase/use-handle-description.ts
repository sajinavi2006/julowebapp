import { ApplicationStatus } from 'pages/webview/AgentAssisted/types';

interface UseHandleDescriptionOptions {
  status: ApplicationStatus;
}

export function useHandleDescription({ status }: UseHandleDescriptionOptions) {
  if (status === 'approved')
    return 'Tinggal satu langkah lagi untuk pakai limit kamu. Klik tombol di bawah untuk buat PIN, ya!';
  if (status === 'processed')
    return 'Untuk melanjutkan proses pengajuan di JULO, klik tombol di bawah untuk buat PIN, ya!';
  if (status === 'rejected')
    return 'Untuk lanjutkan proses pengajuan ulang di JULO, buat PIN dulu dengan klik tombol di bawah, ya!';
}
