import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import { cx } from '@emotion/css';
import formatMoney from '@julofinance/web-helpers/dist/string/formatMoney';

import { RANGE_FUND, LOAN_TIME_PERIOD } from 'constant';

import LoaderText from 'components/LoaderText';
import Layout from 'components/Layout';
import Slider from 'components/Slider';

import { content } from './styles';
import {
  Button,
  ButtonOutline,
  Card,
  Col,
  Div,
  Row,
  Wrapper,
} from 'assets/css/styled';
import {
  alignCenter,
  borderNone,
  dFlex,
  justifyCenter,
  mb2,
  mb4,
  mt4,
  pl2,
  positionAbsolute,
  pr2,
  w100,
} from 'assets/css/stylesFix';
import {
  bottom,
  fontSize,
  minHeight,
  padding,
  text,
  zIndex,
} from 'assets/css/stylesValue';

const LoanPage = (props) => {
  const theme = useTheme();
  const [timePeriod, setTimePeriod] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Handle Click Time Period
  const handleClickTimePeriod = (value) => {
    props.onChangeForm && props.onChangeForm({ duration: value });
  };

  // Render Button with flagging active
  const renderButton = (key, item) => {
    const parameters = {
      borderRadius: '8px',
      theme: theme,
      className: `${cx(text({ size: 14 }), mb2)}`,
    };
    if (item.is_active)
      return (
        <Button
          fluid
          types='gradient'
          {...parameters}
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onClick={() => handleClickTimePeriod(item.value)}
        >
          {props.isLoadingSlider ? <LoaderText width='22px' /> : item.title}
        </Button>
      );
    else
      return (
        <ButtonOutline
          disabled={props.loanValue.loan_amount === 0 && props.isLoadingSlider}
          types='primary'
          fluid
          {...parameters}
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onClick={() => handleClickTimePeriod(item.value)}
        >
          {props.isLoadingSlider ? <LoaderText width='22px' /> : item.title}
        </ButtonOutline>
      );
  };

  // Handle Slider Event
  const handleSlide = (res) => {
    if (props.onSliderChange) {
      props.onSliderChange(res.value);
    }
    // reset duration if loan amount change
    props.onChangeForm && props.onChangeForm({ loan_amount: res.value });
  };

  // Handle Mapping time period for flagging gradient
  const mappingTimePeriod = () => {
    setTimePeriod([]);
    const tempTimePeriod = props.monthRange.map((item) => {
      item['is_active'] = false;
      if (item.value === props.loanValue.duration) item['is_active'] = true;
      return item;
    });

    setTimePeriod((prev) => {
      return [...prev, ...tempTimePeriod];
    });
  };

  // VALIDATE FORM
  const validateForm = () => {
    // Condition for duration
    const condition1 = props.loanValue?.duration;

    // Condition for loan_amount
    const condition2 = props.loanValue?.loan_amount;

    // Condition for loan_purpose
    let condition3 = true;
    if (props.pageType !== 'loan-expectation')
      condition3 = props.loanValue?.loan_purpose;

    // check the condition
    if (condition1 && condition2 && condition3) return false;
    else return true;
  };

  useEffect(() => {
    setLoadingSubmit(props?.isLoadingSubmit);
  }, [props?.isLoadingSubmit]);

  useEffect(() => {
    // call when props.monthRange
    mappingTimePeriod();
  }, [props.monthRange, props.loanValue?.duration]);

  return (
    <Layout
      barBackTitle={props.backTitle}
      barBackType='primary'
      layoutContainer={{
        padding: '0px',
        height: 'inherit',
      }}
    >
      <Div className={`${content}`}>
        <Wrapper>
          <Div className={`${fontSize(14)}`}>
            Ketik jumlah dana dan pilih jangka waktu
          </Div>

          <Row justifyContent='space-between'>
            <Col xs='4' sm='4' display='flex' alignItems='center'>
              <Div className={`${fontSize(14)}`}>Jumlah Dana</Div>
            </Col>
            <Col xs='6' sm='6'>
              <Div
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                borderBottom={`2px solid ${theme?.colors?.borderLight}`}
              >
                <Div
                  className={`${text({
                    color: theme?.text?.greyLight,
                    size: 20,
                  })}`}
                >
                  Rp
                </Div>
                <Div
                  className={`${text({
                    color: theme?.text?.blue,
                    size: 28,
                    weight: 'bold',
                  })} ${dFlex} ${justifyCenter} ${alignCenter}`}
                >
                  {formatMoney(
                    props.loanValue?.loan_amount,
                    false,
                  ) || '0'}
                </Div>
              </Div>
            </Col>
          </Row>

          {/* SLIDER FOR JUMLAH DANA */}
          <Row className={cx(mb4, pr2, pl2, mt4)}>
            <Col xs='12'>
              <Slider
                marks={false}
                data={props.range}
                onChange={handleSlide}
                value={props.loanValue?.loan_amount_index}
              />
            </Col>
          </Row>

          {/* JANGKA WAKTU */}
          <Row className={`${mb4}`} justifyContent='space-between'>
            <Col xs='4' sm='4' display='flex' alignItems='center'>
              <Div className={`${fontSize(14)}`}>Jangka Waktu</Div>
            </Col>
            <Col xs='6' sm='6'>
              <Div
                className={`${text({
                  color: theme?.text?.blue,
                  size: 28,
                  weight: 'bold',
                  align: 'right',
                })}`}
              >
                {props.loanValue?.duration
                  ? `${props.loanValue?.duration} bulan`
                  : '-'}
              </Div>
            </Col>
          </Row>

          {/* BUTTON LIST FOR JANGKA WAKTU */}
          <Row className={`${mb2}`}>
            {timePeriod.map((item, key) => (
              <Col xs='4' sm='3' key={key}>
                {renderButton(key, item)}
              </Col>
            ))}
          </Row>
        </Wrapper>
        {props.children}
      </Div>

      <Div
        className={cx(
          w100,
          positionAbsolute,
          dFlex,
          justifyCenter,
          bottom('0px'),
          zIndex(2),
        )}
      >
        <Card
          fluid
          paddingValue={`24px 15px`}
          style={{
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          }}
        >
          <Button
            fluid
            disabled={loadingSubmit || validateForm()}
            className={cx(
              borderNone,
              padding('11px'),
              minHeight(48),
              fontSize(16),
            )}
            onClick={() => props.onSubmit(props.loanValue)}
          >
            {loadingSubmit ? <LoaderText /> : props.submitTitle}
          </Button>
        </Card>
      </Div>
    </Layout>
  );
};

LoanPage.propTypes = {
  backTitle: PropTypes.string,
  submitTitle: PropTypes.string,
  children: PropTypes.node,
  isLoadingSubmit: PropTypes.bool,
  onChangeForm: PropTypes.func,
  onSubmit: PropTypes.func,
  range: PropTypes.array,
  loanValue: PropTypes.object,
  monthRange: PropTypes.array,
  onSliderChange: PropTypes.func,
  isLoadingSlider: PropTypes.bool,
  pageType: PropTypes.string,
};

LoanPage.defaultProps = {
  backTitle: 'Kembali',
  submitTitle: 'Tarik Dana',
  isLoadingSubmit: false,
  range: RANGE_FUND,
  loanValue: null,
  monthRange: LOAN_TIME_PERIOD,
  isLoadingSlider: false,
  pageType: 'transaction',
};

export default LoanPage;
