import { useEffect, useState } from 'react';
import { cx } from '@emotion/css';
import { useHistory, useParams } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useUserContext } from 'providers/UserProvider';
import decimalToPercent from '@julofinance/web-helpers/dist/number/decimalToPercent';
import formatMoney from '@julofinance/web-helpers/dist/string/formatMoney';
import stringSeparator from '@julofinance/web-helpers/dist/string/stringSeparator';
import { getLoanDetail } from 'services/partner/common/partnership';

import utils from 'utils';

import {
  Button,
  Card,
  Col,
  Div,
  Divider,
  Img,
  Row,
  Wrapper,
} from 'assets/css/styled';
import {
  borderNone,
  dFlex,
  justifyCenter,
  mb2,
  mb3,
  mb4,
  mt4,
  my3,
  my4,
  w100,
} from 'assets/css/stylesFix';
import {
  bottom,
  minHeight,
  padding,
  text,
  zIndex,
} from 'assets/css/stylesValue';

import juloLogoBlue from 'assets/img/logo/logo-name_blue.png';

import Layout from 'components/Layout';

/**
 * Route: /linkaja/agreement-summaries
 */
const AgreementSummaries = () => {
  const theme = useTheme();
  const themeTexts = theme?.text;
  const themeCardPrimary = theme?.cardPrimary;
  const [summaries, setSummaries] = useState({});
  const history = useHistory();
  const { handleNotification, handleLoadingOverlay, transactionData, datas } =
    useUserContext();

  const loanXid = transactionData?.loan_xid || utils.store.get('loanXid');
  const { partner } = useParams();

  const handleAction = (value, state) => {
    history.push(value, { from: state });
  };

  const fetchLoanDetails = async (loanXid) => {
    handleLoadingOverlay(true);
    handleNotification({ isOpen: false });
    try {
      const response = await getLoanDetail(loanXid, partner);
      if (!response.success) {
        const errorMessage = response?.errors?.[0];

        return handleNotification({
          isOpen: true,
          message: errorMessage,
          severity: false,
        });
      }

      return setSummaries(response.data);
    } catch (error) {
      handleNotification({
        isOpen: true,
        message: error?.response?.data?.errors?.[0],
      });
    } finally {
      handleLoadingOverlay(false);
    }
  };

  useEffect(() => {
    if (loanXid) {
      fetchLoanDetails(loanXid);
    } else {
      return history.replace('/linkaja/home');
    }
  }, [transactionData?.loan_xid]);

  return (
    <Layout hideBarBack={true}>
      <Div>
        <Div
          display='flex'
          justifyContent='space-between'
          alignItems='flex-end'
        >
          <Img src={juloLogoBlue} height='30' alt='logo' />
          <Div
            className={cx(
              text({ size: 18, color: themeTexts?.blue, weight: 'bold' }),
            )}
          >
            Ringkasan Perjanjian
          </Div>
        </Div>
        <Wrapper padding='0px'>
          <Card
            rounded
            boxShadow={themeCardPrimary?.boxShadow}
            className={cx(my4)}
            paddingValue={'15px'}
          >
            <Div display='flex' justifyContent='space-between'>
              <Div
                className={cx(
                  text({
                    size: 14,
                    color: themeTexts?.greyLight,
                  }),
                )}
              >
                Jumlah pinjaman
              </Div>
              <Div
                className={cx(
                  text({
                    size: 14,
                    color: '#5e5e5e',
                    weight: 'bold',
                  }),
                )}
              >
                {formatMoney(summaries?.loan?.loan_amount)}
              </Div>
            </Div>
            <Div
              display='flex'
              justifyContent='space-between'
              className={cx(my3)}
            >
              <Div
                className={cx(text({ size: 14, color: themeTexts?.greyLight }))}
              >
                Jangka waktu
              </Div>
              <Div
                className={cx(
                  text({
                    size: 14,
                    color: '#5e5e5e',
                    weight: 'bold',
                  }),
                )}
              >
                {summaries?.loan?.loan_duration} bulan
              </Div>
            </Div>
            <Div
              display='flex'
              justifyContent='space-between'
              className={cx(my3)}
            >
              <Div
                className={cx(
                  text({
                    size: 14,
                    color: themeTexts?.greyLight,
                  }),
                )}
              >
                Bunga per bulan
              </Div>
              <Div
                className={cx(
                  text({
                    size: 14,
                    color: '#5e5e5e',
                    weight: 'bold',
                  }),
                )}
              >
                {decimalToPercent(
                  summaries?.loan?.interest_rate_monthly
                )}
              </Div>
            </Div>
            <Div
              display='flex'
              justifyContent='space-between'
              className={`${mb2}`}
            >
              <Div
                className={cx(
                  text({
                    size: 14,
                    color: themeTexts?.greyLight,
                  }),
                )}
              >
                Dana cair
                <Div className={cx(text({ size: 10 }))}>
                  *setelah biaya provisi
                </Div>
              </Div>
              <Div
                className={cx(
                  text({
                    size: 14,
                    color: '#5e5e5e',
                    weight: 'bold',
                  }),
                )}
              >
                {formatMoney(
                  summaries?.loan?.loan_disbursement_amount
                )}
              </Div>
            </Div>
            <Div display='flex' justifyContent='space-between'>
              <Div
                className={cx(
                  text({
                    size: 14,
                    color: themeTexts?.greyLight,
                  }),
                )}
              >
                Tagihan per bulan
              </Div>
              <Div
                className={cx(
                  text({
                    size: 14,
                    color: '#5e5e5e',
                    weight: 'bold',
                  }),
                )}
              >
                {formatMoney(summaries?.loan?.installment_amount)}
              </Div>
            </Div>
          </Card>

          <Div
            className={cx(
              text({ size: 14, color: themeTexts?.greyLight, weight: 'bold' }),
            )}
          >
            Informasi Transaksi
          </Div>

          <Card
            rounded
            boxShadow={themeCardPrimary?.boxShadow}
            className={cx(my3)}
            padding='15px'
          >
            <Row>
              <Col
                xs='5'
                sm='4'
                className={cx(
                  text({
                    size: 12,
                    color: themeTexts?.greyLight,
                  }),
                  mb3,
                )}
              >
                Nama
              </Col>
              <Col
                xs='7'
                sm='8'
                className={cx(
                  text({
                    size: 12,
                    color: themeTexts?.primary,
                    weight: 'bold',
                  }),
                  mb3,
                )}
              >
                {datas?.fullname}
              </Col>
              <Col
                xs='5'
                sm='4'
                className={cx(
                  text({
                    size: 12,
                    color: themeTexts?.greyLight,
                  }),
                )}
              >
                No Handphone
              </Col>
              <Col
                xs='7'
                sm='8'
                className={cx(
                  text({
                    size: 12,
                    color: themeTexts?.primary,
                    weight: 'bold',
                  }),
                )}
              >
                {stringSeparator({
                  string: datas?.phone,
                  num: 4,
                  separator: ' ',
                })}
              </Col>
            </Row>
          </Card>
        </Wrapper>
        <Wrapper padding='0px'>
          <Div className={cx('text-center', mb4)}>
            <Div
              className={cx(
                text({
                  size: 12,
                  color: themeTexts?.blue,
                  weight: 'bold',
                  decoration: 'underline',
                }),
              )}
              onClick={() =>
                handleAction('/linkaja/sphp', '/linkaja/agreement-summaries')
              }
            >
              Lihat Surat Perjanjian Hutang Piutang
            </Div>
          </Div>

          <Div
            className={cx(
              text(
                { size: 14, color: themeTexts?.greyLight, weight: 'bold' },
                mt4,
              ),
            )}
          >
            Pernyataan Perjanjian
          </Div>

          <Div
            className={cx(w100, dFlex, justifyCenter, bottom('0px'), zIndex(2))}
          >
            <Card
              fluid
              paddingValue={`10px 0px`}
              style={{
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
                boxShadow: 'none',
              }}
            >
              <Divider margin='1rem 0px' />
              <Button
                fluid
                className={cx(
                  borderNone,
                  padding('11px'),
                  minHeight(48),
                  text({ size: 14, weight: 'bold' }),
                )}
                onClick={() =>
                  handleAction(
                    '/linkaja/signature',
                    '/linkaja/agreement-summaries',
                  )
                }
              >
                Tanda Tangan Elektronik
              </Button>
            </Card>
          </Div>
        </Wrapper>
      </Div>
    </Layout>
  );
};

export default AgreementSummaries;
