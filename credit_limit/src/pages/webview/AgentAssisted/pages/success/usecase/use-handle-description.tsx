import thousandSeparator from '@julofinance/web-helpers/dist/number/thousandSeparator';

import { ApplicationStatus } from 'pages/webview/AgentAssisted/types';

interface UseHandleDescriptionOptions {
  status: ApplicationStatus;
  limit: number | null;
}

export function useHandleDescription(props: UseHandleDescriptionOptions) {
  const { status, limit = '' } = props;

  if (status === 'approved')
    return (
      <>
        Yuk, mulai gunakan limit{' '}
        <b className='limit'>Rp{thousandSeparator(String(limit))} </b>
        kamu lewat aplikasi JULO!
      </>
    );

  return 'Yuk, download JULO dan lanjutkan proses pengajuanmu di aplikasi!';
}
