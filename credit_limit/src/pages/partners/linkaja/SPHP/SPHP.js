import { useState, useEffect } from 'react';
import { cx } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { useUserContext } from 'providers/UserProvider';
import utils from 'utils';

import { getSphp } from 'services/partner/common/partnership';

import { Card, Div, Img, Wrapper } from 'assets/css/styled';
import { dBlock, mb2, mb4 } from 'assets/css/stylesFix';
import { text } from 'assets/css/stylesValue';

import ojk from 'assets/img/OJK.svg';

import Layout from 'components/Layout';

/**
 * Route: /linkaja/sphp
 */
const SPHP = () => {
  const theme = useTheme();
  const themeColors = theme?.colors;
  const themeCardPrimary = theme?.cardPrimary;
  const { handleNotification, handleLoadingOverlay, transactionData } =
    useUserContext();
  const [htmlContent, setHtmlContent] = useState('');

  const loanXid = transactionData?.loan_xid || utils.store.get('loanXid');

  const getSphpContent = async (loanXid) => {
    handleLoadingOverlay(true);
    handleNotification({ isOpen: false });

    try {
      const response = await getSphp(loanXid);
      return setHtmlContent(response.data);
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
    getSphpContent(loanXid);
  }, [transactionData?.loan_xid]);

  return (
    <Layout
      barBackType=''
      barBackTitle='Surat Perjanjian'
      contentBackground={themeColors?.backgroundColorPrimary}
    >
      <Wrapper padding='0px'>
        <Card
          rounded
          boxShadow={themeCardPrimary?.boxShadow}
          className={cx(mb4)}
        >
          {htmlContent && (
            <Div
              style={{ padding: '0 20px' }}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          )}
        </Card>
        <Div
          className={cx(
            text({
              align: 'center',
            }),
            mb2,
          )}
        >
          <span className={cx(text({ size: 12 }), dBlock, mb2)}>
            Berizin dan diawasi oleh
          </span>
          <Img src={ojk} alt='ojk' />
        </Div>
      </Wrapper>
    </Layout>
  );
};

export default SPHP;
