import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  Accordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails,
  Grid,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import logoBankBCA from 'assets/img/logo/Bank-BCA.svg';
import logoBankBNI from 'assets/img/logo/Bank-BNI.svg';
import logoBankBRI from 'assets/img/logo/Bank-BRI.svg';
import logoBankMandiri from 'assets/img/logo/Bank-Mandiri.svg';
import logoBPJS from 'assets/img/logo/BPJS.png';
import iconChecked from 'assets/img/icon/ic-thumb.svg';
import iconCheckedSmall from 'assets/img/icon/ic-checked.svg';

import DialogWebView from 'components/Dialog/DialogWebView';

import { boostStatus } from 'services/form';
import { useApplicationContext } from 'pages/commons/Applications/providers/ApplicationProvider';
import { useUserContext } from 'providers/UserProvider';
import { fontSize } from 'assets/css/stylesValue';
import utils from 'utils';
import { Button } from 'assets/css/styled';
import { paperInfo } from 'pages/commons/Applications/styles';
import { Div } from 'assets/css/styled';

const useStyles = makeStyles(() => ({
  notDisplay: {
    '&:before': {
      display: 'none',
    },
    '&:after': {
      display: 'none',
    },
  },
}));

const AccordionSummary = withStyles({
  root: {
    padding: 0,
  },
})(MuiAccordionSummary);

const scrapStatus = {
  bpjs: false,
  bca: false,
  mandiri: false,
  bni: false,
  bro: false,
};

const ProofOfIncome = ({ isReview, onClick }) => {
  const { settings } = useApplicationContext();
  const { handleNotification } = useUserContext();
  const classes = useStyles();
  const { partner } = useParams();
  const isMounted = useRef(true);
  const [status, setStatus] = useState(scrapStatus);
  const [url, setUrl] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrowdownBank, setOpenDropdownBank] = useState(false);
  const [openDrowdownBpjs, setOpenDropdownBpjs] = useState(false);

  const bankParams = settings?.boost?.paramater ?? {};

  const clickWeb = (name) => {
    if (onClick) onClick(name);

    const token = utils.store.get('token');
    const applicationId = utils.store.get('applicationId');
    const customerId = utils.store.get('customerId');
    const currentPage = isReview ? 'review' : 'financial';
    let temp_url =
      process.env.REACT_APP_BANK_SCRAPE_URL +
      `${token}/${applicationId}?bank=${name}&type=${partner}` +
      `_` +
      currentPage;
    if (name === 'bpjs') {
      temp_url =
        process.env.REACT_APP_BPJS_URL +
        `web_${partner}` +
        '_' +
        currentPage +
        `/${customerId}/${applicationId}/`;
    }
    setUrl(temp_url);
    window.location.assign(temp_url);
  };

  const checkBooster = async () => {
    try {
      const response = await boostStatus();
      if (response.success) {
        let newStatus = {
          bpjs: response.data.bpjs_status === 'Verified',
        };
        response.data?.bank_status?.map((x) => {
          newStatus[x.bank_name] = x.status === 'Verified';
        });

        //prevent memory leaks warning
        if (isMounted.current) {
          setStatus(newStatus);
          if (
            newStatus.bca ||
            newStatus.mandiri ||
            newStatus.bri ||
            newStatus.bni
          ) {
            setOpenDropdownBank(true);
          }
          if (newStatus.bpjs) {
            setOpenDropdownBpjs(true);
          }
        }
      }
    } catch (error) {
      handleNotification({
        isOpen: true,
        message: error.response.data
          ? error.response.errors?.[0]?.[0]
          : error.response.errors?.[0],
      });
    }
  };

  useEffect(() => {
    checkBooster();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <Div margin='27px 0px'>
      {bankParams?.bank?.is_active && (
        <Accordion
          onChange={() => setOpenDropdownBank(!openDrowdownBank)}
          expanded={openDrowdownBank}
          style={{
            boxShadow: 'none',
            borderBottom: '1px solid #e0e0e0',
          }}
          classes={{
            root: classes.notDisplay,
          }}
        >
          <AccordionSummary
            disabled={isReview}
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <span
              className={`${fontSize(16)}`}
              style={{ color: '#5e5e5e', fontWeight: 'bold' }}
            >
              Bank{' '}
              <span
                className={`${fontSize(14)}`}
                style={{ color: '#e0e0e0', fontWeight: 'normal' }}
              >
                (tidak wajib)
              </span>
            </span>
            &nbsp;&nbsp;
            {status.bca || status.mandiri || status.bri || status.bni ? (
              <img src={iconChecked} />
            ) : null}
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {bankParams?.bank?.bca?.is_active ? (
                <Grid item xs={6}>
                  <Button
                    fluid
                    backgroundColor={`linear-gradient(to top, #ffffff, #f5f5f5)`}
                    borderColor={'#e3e7ea'}
                    padding={`10px 20px`}
                    onClick={() =>
                      !status.bca && !isReview ? clickWeb('bca') : null
                    }
                    style={{
                      opacity: status.bca || isReview ? 0.5 : 1,
                      position: status.bca || isReview ? 'relative' : 'none',
                    }}
                  >
                    {status.bca && (
                      <img
                        src={iconCheckedSmall}
                        alt={`Selected bca`}
                        className='iconChecked'
                      />
                    )}
                    <img
                      src={logoBankBCA}
                      alt={`Logo bca`}
                      width={`60px`}
                      height={'18px'}
                    />
                  </Button>
                </Grid>
              ) : null}
              {bankParams?.bank?.mandiri?.is_active ? (
                <Grid item xs={6}>
                  <Button
                    fluid
                    backgroundColor={`linear-gradient(to top, #ffffff, #f5f5f5)`}
                    borderColor={'#e3e7ea'}
                    padding={`10px 20px`}
                    onClick={() =>
                      !status.mandiri && !isReview ? clickWeb('mandiri') : null
                    }
                    style={{
                      opacity: status.mandiri || isReview ? 0.5 : 1,
                      position:
                        status.mandiri || isReview ? 'relative' : 'none',
                    }}
                  >
                    {status.mandiri && (
                      <img
                        src={iconCheckedSmall}
                        alt={`Selected mandiri`}
                        className='iconChecked'
                      />
                    )}
                    <img
                      src={logoBankMandiri}
                      alt={`Logo mandiri`}
                      width={`60px`}
                      height={'18px'}
                    />
                  </Button>
                </Grid>
              ) : null}
              {bankParams?.bank?.bri?.is_active ? (
                <Grid item xs={6}>
                  <Button
                    fluid
                    backgroundColor={`linear-gradient(to top, #ffffff, #f5f5f5)`}
                    borderColor={'#e3e7ea'}
                    padding={`10px 20px`}
                    onClick={() =>
                      !status.bri && !isReview ? clickWeb('bri') : null
                    }
                    style={{
                      opacity: status.bri || isReview ? 0.5 : 1,
                      position: status.bri || isReview ? 'relative' : 'none',
                    }}
                  >
                    {status.bri && (
                      <img
                        src={iconCheckedSmall}
                        alt={`Selected bri`}
                        className='iconChecked'
                      />
                    )}
                    <img
                      src={logoBankBRI}
                      alt={`Logo bri`}
                      width={`60px`}
                      height={'18px'}
                    />
                  </Button>
                </Grid>
              ) : null}
              {bankParams?.bank?.bni?.is_active ? (
                <Grid item xs={6}>
                  <Button
                    fluid
                    backgroundColor={`linear-gradient(to top, #ffffff, #f5f5f5)`}
                    borderColor={'#e3e7ea'}
                    padding={`10px 20px`}
                    onClick={() =>
                      !status.bni && !isReview ? clickWeb('bni') : null
                    }
                    style={{
                      opacity: status.bni || isReview ? 0.5 : 1,
                      position: status.bni || isReview ? 'relative' : 'none',
                    }}
                  >
                    {status.bni && (
                      <img
                        src={iconCheckedSmall}
                        alt={`Selected bni`}
                        className='iconChecked'
                      />
                    )}
                    <img
                      src={logoBankBNI}
                      alt={`Logo bni`}
                      width={`60px`}
                      height={'18px'}
                    />
                  </Button>
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <div className={paperInfo}>
                  <b>Info Penting:</b>
                  <br />
                  <br />
                  <span>
                    Tolong masukkan data akun rekening bank yang terdaftar
                    sebagai sarana penyaluran gaji karyawan ataupun penghasilan
                    lainnya.
                  </span>
                </div>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
      {bankParams?.bpjs?.is_active && (
        <Accordion
          onChange={() => setOpenDropdownBpjs(!openDrowdownBpjs)}
          expanded={openDrowdownBpjs}
          style={{
            boxShadow: 'none',
            borderBottom: '1px solid #e0e0e0',
            marginBottom: '1rem',
          }}
          classes={{
            root: classes.notDisplay,
          }}
        >
          <AccordionSummary
            disabled={isReview}
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <span
              className={`${fontSize(16)}`}
              style={
                status.bca ||
                status.mandiri ||
                status.bri ||
                status.bni ||
                status.bpjs
                  ? { color: '#5e5e5e', fontWeight: 'bold' }
                  : { color: '#ccc', fontWeight: 'bold' }
              }
            >
              BPJS{' '}
              <span
                className={`${fontSize(14)}`}
                style={{ color: '#e0e0e0', fontWeight: 'normal' }}
              >
                (tidak wajib)
              </span>
            </span>
            &nbsp;&nbsp;
            {status.bpjs ? <img src={iconChecked} /> : null}
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  fluid
                  backgroundColor={`linear-gradient(to top, #ffffff, #f5f5f5)`}
                  borderColor={'#e3e7ea'}
                  padding={`10px 20px`}
                  onClick={() =>
                    !status.bpjs && !isReview ? clickWeb('bpjs') : null
                  }
                  style={{
                    opacity: status.bpjs || isReview ? 0.5 : 1,
                    position: status.bpjs || isReview ? 'relative' : 'none',
                  }}
                >
                  {status.bpjs && (
                    <img
                      src={iconCheckedSmall}
                      alt={`Selected bpjs`}
                      className='iconChecked'
                    />
                  )}
                  <img
                    src={logoBPJS}
                    alt={`Logo bpjs`}
                    width={`60px`}
                    height={'18px'}
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <div className={paperInfo}>
                  <b>Info Penting:</b>
                  <br />
                  <br />
                  <ul className='px-3'>
                    <li>
                      JULO hanya akan melihat data dan status kepegawaian dari
                      akun BPJS Ketenagakerjaan Anda sebagai bentuk verifikasi.
                    </li>
                    <li>
                      Kami menggunakan sertifikasi keamanan dan enkripsi data
                      perlindungan GoDaddy Verified & Secured.
                    </li>
                  </ul>
                </div>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
      <DialogWebView
        url={url}
        handleShowDialogWebView={(value) => setOpenDialog(value)}
        showDialogWebView={openDialog}
      />
    </Div>
  );
};

ProofOfIncome.propTypes = {
  isReview: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ProofOfIncome;
