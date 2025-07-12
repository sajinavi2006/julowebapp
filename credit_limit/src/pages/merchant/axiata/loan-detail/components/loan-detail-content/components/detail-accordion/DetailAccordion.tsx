import Typography from '@material-ui/core/Typography';

import formatDate from '@julofinance/web-helpers/dist/date/formatDate';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from 'components/Accordion';

import { LoanDetailContentProps } from '../../types';

import { detailContainerCx, loanAccordionCx, summaryTitleCx } from './styles';
import { InfoText } from './components';

const DetailAccordion: React.FC<LoanDetailContentProps> = ({ data }) => {
  return (
    <div css={loanAccordionCx} className='loan-accordion'>
      <Accordion elevation={0}>
        <AccordionSummary>
          <Typography variant='subtitle1' css={summaryTitleCx}>
            Detail Pinjaman
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <div css={detailContainerCx}>
            <Typography className='date' variant='body2'>
              Tanggal Peminjaman: {formatDate(data.cdate, 'DD/MM/YYYY')}
            </Typography>

            <div className='info-wrapper'>
              <InfoText label='Jenis Pinjaman' value={data.loanType} />
              <InfoText label='Distributor' value={data.distributorName} />
              <InfoText label='Nomor Invoice' value={data.invoiceNumber} />
              <InfoText
                label='Dokumen Invoice'
                value={data.invoiceFile}
                url={data.invoiceUrl}
                type='doc'
              />
              <InfoText
                label='Berkas Giro'
                value={data.bilyetFile}
                url={data.bilyetUrl}
                type='doc'
              />
              <InfoText
                label='Surat Perjanjian'
                value={data.skrtpFile}
                url={data.skrtpUrl}
                type='doc'
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default DetailAccordion;
