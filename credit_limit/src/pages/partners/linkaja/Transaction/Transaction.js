import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { cx } from '@emotion/css';
import { useUserContext } from 'providers/UserProvider';
import formatMoney from '@julofinance/web-helpers/dist/string/formatMoney';

import utils from 'utils';

import LoanPage from 'pages/commons/LoanPage';

import DropdownAutocomplete from 'components/DropdownAutocomplete';
import LoaderText from 'components/LoaderText';

import { Col, Div, Row, Wrapper } from 'assets/css/styled';
import { mb3, mb4, ml2, pb4 } from 'assets/css/stylesFix';
import { flex, text, transition } from 'assets/css/stylesValue';

import ConfirmationPopUp from './ConfirmationDialog';
import {
  fetchLoanOffer,
  getPartnershipDropdowns,
} from 'services/partner/common/partnership';
import debounce from 'lodash.debounce';

const Transaction = () => {
  const theme = useTheme();
  const history = useHistory();
  const { handleNotification, savePreTransactionData, transactionData } =
    useUserContext();

  const [loanList, setLoanList] = useState({});
  const [loanPurposeList, setLoanPurposeList] = useState([]);

  const [loanRange, setLoanRange] = useState([]);
  const [monthRange, setMonthRange] = useState([]);

  const [monthResponse, setMonthResponse] = useState([]);

  const [isLoadingVerifyLoan, setIsLoadingVerifyLoan] = useState(false);
  const [isLoadingFetchLoanPurpose, setIsLoadingFetchLoanPurpose] =
    useState(false);

  const [errorLoanPurpose, setErrorLoanPurpose] = useState({
    status: true,
    message: '',
  });

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const loanXid = transactionData?.loan_xid || utils.store.get('loanXid');
  const applicationXid = utils.store.get('applicationXid');
  const applicationId = utils.store.get('applicationId');

  const fetchLoanOfferHandler = async (loanAmount, firstFetch = false) => {
    // THIS FUNCTION BLOCK FOR DEVELOPMENT
    setIsLoadingVerifyLoan(true);
    try {
      let initialIncrement = 500000;

      const response = await fetchLoanOffer({
        loan_amount_request: loanAmount ? loanAmount : undefined,
        application_xid: applicationXid,
      });

      if (response?.success) {
        const data = response.data;
        setMonthResponse(response.data.loan_duration);
        // SET MONTH LIST
        const monthResults = [];
        data.loan_duration.map((item) => {
          monthResults.push({
            id: item.duration,
            title: `${item.duration} Bulan`,
            value: item.duration,
            is_active: false,
          });
        });

        setMonthRange(monthResults);

        // SET LOAN MIN
        let min = data.min_amount;
        const results = [];

        setLoanList((prevState) => ({
          ...prevState,
          loan_amount: firstFetch ? data.min_amount : data.selected_amount,
        }));

        let id = 0;
        // Looping for Create Range Slider
        while (min <= data.max_amount) {
          // pushing current min to results variable
          results.push({
            id: id,
            value: min,
            title: formatMoney(min, false) || '0',
          });

          // incrementing id
          id++;

          if (data.max_amount < initialIncrement) {
            /**
             * if max_amount lower than initialIncrement
             *
             * the increment will not be initialIncrement
             * but increment is initialIncrement minus max_amount
             *
             * eg:
             *  max_amount : 300000
             *  initialIncrement: 500000
             *  increment: 200000
             */
            let increment = initialIncrement - data.max_amount;
            min = min + increment;
          } else if (min < initialIncrement) {
            /**
             * if min lower than initialIncrement
             *
             * the increment will not be initialIncrement
             * but increment is initialIncrement minus min_amount
             *
             * eg:
             *  min_amount : 300000
             *  initialIncrement: 500000
             *  increment: 200000
             */
            let increment = initialIncrement - data.min_amount;
            min = min + increment;
          } else {
            /**
             * is the default increment using var initialIncrement
             * and logic for end of range, example the max_amount is 10.200.000
             * the last increment is 200.000
             */
            let increment = min + initialIncrement - data.max_amount;
            if (increment > 0 && increment < initialIncrement) {
              min = min + (initialIncrement - increment);
            } else {
              min = min + initialIncrement;
            }
          }
        }

        if (firstFetch)
          results.forEach((item, key) => {
            if (results.length === key + 1) {
              setLoanList((prevState) => ({
                ...prevState,
                loan_amount_index: item.id,
                loan_amount: item.value,
              }));
            }
          });
        setLoanRange(results);
      } else {
        handleNotification({
          isOpen: true,
          message: response?.errors[0],
        });
      }
      setIsLoadingVerifyLoan(false);
    } catch (error) {
      handleNotification({
        isOpen: true,
        message: error?.response?.data?.errors?.[0],
      });
      setIsLoadingVerifyLoan(false);
    }
  };

  const fetchLoanPurpose = async () => {
    setIsLoadingFetchLoanPurpose(true);
    try {
      const response = await getPartnershipDropdowns({
        data_selected: 'loan_purposes',
      });

      if (response.success) {
        const tmpPurpose = await response.data.map((item) => {
          return {
            id: item,
            title: item,
          };
        });
        setLoanPurposeList(tmpPurpose);

        setErrorLoanPurpose({
          status: false,
          message: '',
        });
      }
    } catch (error) {
      setErrorLoanPurpose({
        status: true,
        message: error?.response?.data?.errors?.[0],
      });
      handleNotification({
        isOpen: true,
        message: error?.response?.data?.errors?.[0],
      });
    } finally {
      setIsLoadingFetchLoanPurpose(false);
    }
  };

  /**
   * Debounced loan offer API call to prevent multiple call at a time
   */
  const debounceFetchLoanOffer = useCallback(
    debounce(fetchLoanOfferHandler, 500),
    [],
  );

  const handleSelectPeminjaman = async (data) => {
    setLoanList((prevState) => ({
      ...prevState,
      loan_purpose: data.id,
    }));
  };

  const handleConfirmationSubmit = () => {
    const payload = {
      application_id: applicationId,
      loan_amount_request: loanList?.loan_amount,
      loan_duration: loanList?.duration,
      loan_purpose: loanList?.loan_purpose,
    };

    savePreTransactionData(payload);
    history.push('/linkaja/pin-transaction', { from: 'transaction' });
  };

  const handleShowDialog = (e) => {
    setShowConfirmationDialog(e);
  };

  const handleChangeForm = (data) => {
    if (data.loan_amount && data.loan_amount !== loanList.loan_amount) {
      setIsLoadingVerifyLoan(true);
    }

    const monthResult =
      monthResponse.find((x) => x.duration === data.duration) || {};

    const loanFind = loanRange.find((x) => x.value === data.loan_amount);

    let extraData = {};
    if (loanFind) extraData.loan_amount_index = loanFind?.id;

    setLoanList((prevState) => ({
      ...prevState,
      ...data,
      ...extraData,
      loan_detail: monthResult,
    }));
  };

  useEffect(() => {
    if (loanXid) {
      return history.replace('/linkaja/agreement-summaries');
    }
    fetchLoanOfferHandler(0, true);

    // FETCHING LOAN PURPOSES FOR DROPDOWN
    fetchLoanPurpose();
  }, []);

  useEffect(() => {
    // IF MONTH DURATION NOT NULL
    const monthResult =
      monthResponse.find((x) => x.duration === loanList.duration) || {};
    if (monthResult)
      setLoanList((prevState) => ({
        ...prevState,
        loan_detail: monthResult,
      }));
  }, [monthResponse]);

  return (
    <Div>
      <LoanPage
        loanValue={loanList}
        backTitle='Tarik Dana'
        onChangeForm={handleChangeForm}
        onSliderChange={debounceFetchLoanOffer}
        range={loanRange}
        monthRange={monthRange}
        isLoadingSlider={isLoadingVerifyLoan}
        onSubmit={() => {
          handleShowDialog(true);
        }}
      >
        <Div
          background={theme?.colors?.backgroundColorBlueGradient}
          padding='15px'
          className={mb4}
        >
          <Div
            className={`${text({
              size: 14,
              color: theme?.colors?.white,
            })} ${mb3}`}
          >
            Ringkasan Transaksi
          </Div>
          <Wrapper>
            <Row height='70px'>
              <Col
                xs='6'
                sm='4'
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                borderRight={`1px solid ${theme?.colors?.borderLight}`}
              >
                <Div
                  className={`${text({
                    size: 14,
                    color: theme?.colors?.white,
                  })}`}
                >
                  Dana Cair
                  <Div
                    className={`${text({
                      size: 10,
                      color: theme?.colors?.white,
                    })}`}
                  >
                    *setelah biaya provinsi
                  </Div>
                </Div>
                <Div
                  className={`${text({
                    size: 14,
                    color: theme?.colors?.white,
                  })}`}
                >
                  Cicilan per bulan
                </Div>
              </Col>
              <Col
                xs='6'
                sm='8'
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
              >
                <Div
                  display='flex'
                  alignItems='center'
                  className={`${text({
                    color: theme?.colors?.white,
                    weight: 'bold',
                  })}`}
                >
                  {isLoadingVerifyLoan ? (
                    <LoaderText width='16px' />
                  ) : loanList?.loan_detail?.disbursement_amount ? (
                    <>
                      <Div className={`${text({ size: 16 })}`}>Rp</Div>
                      <Div className={cx(ml2, text({ size: 16 }))}>
                        {formatMoney(
                          loanList.loan_detail.disbursement_amount,
                          false,
                        ) || '-'}
                      </Div>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </Div>
                <Div
                  display='flex'
                  alignItems='center'
                  className={`${text({
                    color: theme?.colors?.white,
                    weight: 'bold',
                  })}`}
                >
                  {isLoadingVerifyLoan ? (
                    <LoaderText width='16px' />
                  ) : loanList?.loan_detail?.monthly_installment ? (
                    <>
                      {/* {JSON.stringify(loanList.loan_detail)} */}
                      <Div className={`${text({ size: 16 })}`}>Rp</Div>
                      <Div className={cx(ml2, text({ size: 16 }))}>
                        {formatMoney(
                          loanList.loan_detail.monthly_installment,
                          false,
                        ) || '-'}
                      </Div>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </Div>
              </Col>
            </Row>
          </Wrapper>
        </Div>

        {/* DROPDOWN TUJUAN PINAJAMAN */}
        <Wrapper>
          <Div className={`${text({ size: 14 })}`}>Tujuan Pinjam</Div>

          <DropdownAutocomplete
            disabledInput={true}
            placeholder='Pilih Tujuan Pinjam'
            options={loanPurposeList}
            onSelect={(value) => handleSelectPeminjaman(value)}
            isLoading={isLoadingFetchLoanPurpose}
            titleClass={`${text({ size: 14 })} ${flex('1 1 70%')}`}
            descriptionClass={`${text({
              size: 14,
              weight: 'bold',
            })} ${flex('1 1 30%')}`}
            dropdownClass={`${errorLoanPurpose.status ? pb4 : ''} ${transition(
              'padding 0.3s',
            )}`}
            inputClass={`${text({ size: 16 })}`}
            error={errorLoanPurpose.message}
          />
        </Wrapper>

        <ConfirmationPopUp
          onSubmit={handleConfirmationSubmit}
          transactionDetail={loanList}
          showDialog={showConfirmationDialog}
          handleShowDialog={(e) => handleShowDialog(e)}
        />
      </LoanPage>
    </Div>
  );
};

export default Transaction;
