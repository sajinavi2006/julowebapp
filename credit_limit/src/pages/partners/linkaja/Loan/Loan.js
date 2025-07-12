import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@emotion/react';
import { useUserContext } from 'providers/UserProvider';

import { sentLoanExpectation } from 'services/partner/common/partnership';

import utils from 'utils';

import LoanPage from 'pages/commons/LoanPage';

import { Div } from 'assets/css/styled';

/**
 * Route: /linkaja/loan-expectation
 * Access: Private
 */
const Loan = () => {
  const theme = useTheme();
  const history = useHistory();
  const { handleNotification } = useUserContext();
  const [isLoadingSubmit, setIsloadingSubmit] = useState(false);
  const [loanValue, setLoanValue] = useState({
    loan_amount: 1000000,
  });

  // for development
  const [rangeRandom, setRangeRandom] = useState([]);

  const convertToRupiah = (data) => {
    let rupiahArr = data.toString().split('');
    let results = [];
    rupiahArr.reverse().map((item, key) => {
      if (key % 3 === 0 && key !== 0) {
        results.push('.');
      }
      results.push(item);
    });
    return results.reverse().join('');
  };

  const handleSubmit = async ({ duration, loan_amount }) => {
    // handle submit click
    setIsloadingSubmit(true);
    try {
      const payload = {
        duration,
        nik: utils?.store?.get('nik'),
        loan_amount,
      };
      const response = await sentLoanExpectation(payload);

      if (response?.success) {
        history.push({
          pathname: '/linkaja/register',
          state: { from: 'loan-expectation' },
        });
      } else {
        handleNotification({
          isOpen: true,
          message: response?.errors[0],
        });
      }
    } catch (error) {
      handleNotification({
        isOpen: true,
        message: error?.response?.data?.errors?.[0],
      });
    } finally {
      setIsloadingSubmit(false);
    }
  };

  const handleChangeForm = (data) => {
    setLoanValue((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  // FOR DEVELOPMENT
  useEffect(() => {
    let min = 1000000;
    let max = 20000000;
    let results = [];
    while (min <= max) {
      results.push({
        value: min,
        title: convertToRupiah(min),
      });
      min = min + 500000;
    }
    setRangeRandom(results);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Div>
        <LoanPage
          backTitle='*Loan Expectation Page'
          submitTitle='Lanjutkan'
          loanValue={loanValue}
          range={rangeRandom}
          isLoadingSubmit={isLoadingSubmit}
          pageType={'loan-expectation'}
          onChangeForm={handleChangeForm}
          onSubmit={(value) => {
            // handle for submit in here
            handleSubmit(value);
          }}
        />
      </Div>
    </ThemeProvider>
  );
};

export default Loan;
