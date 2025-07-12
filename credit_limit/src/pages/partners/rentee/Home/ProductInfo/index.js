import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { useHistory, useParams } from 'react-router';

import utils from 'utils';
import { useUserContext } from 'providers/UserProvider';
import { Card, Div } from 'assets/css/styled';
import {
  alignCenter,
  boxShadowThick,
  cursorPointer,
  dFlex,
  fontWeight600,
  justifyCenter,
  ml3,
  mx3,
  my4,
  positionAbsolute,
  positionRelative,
} from 'assets/css/stylesFix';
import { color, fontSize, right, translate } from 'assets/css/stylesValue';

import iconLocked from 'assets/img/icon/ic-locked.svg';
import iconChevronRight from 'assets/img/icon/ic-chevron_right.svg';
import iconRenteeProduct from 'assets/img/icon/ic-rentee_product.png';
import iconRenteeProductLock from 'assets/img/icon/ic-rentee_product_lock.png';
import IconRenteeContinueTransactions from 'assets/img/icon/ic-rentee_continue_transaction.webp';
import { fetchLoan, reactiveLoan } from 'services/partner/rentee/form';
import DialogInfo from 'components/Dialog/DialogInfo';

const DIALOG_DATA_CANCELED_TRANSACTION = {
  title: {
    text: 'Transaksi Dibatalkan',
  },
  message: {
    text: 'Transasksi Anda telah batal, silahkan coba lagi untuk transaksi ulang.',
  },
  button: [
    {
      fontSize: 12,
      action: 'close',
      text: 'Transaksi Lagi',
    },
  ],
};

const ProductInfo = ({ disabled }) => {
  const theme = useTheme();
  const params = useParams();
  const themeCardPrimary = theme?.cardPrimary;
  const themeText = theme?.text;
  const themeColors = theme?.colors;
  const history = useHistory();
  const {
    datas,
    handleNotification,
    transactionData,
    saveTransactionData,
    handleLoadingOverlay,
  } = useUserContext();
  const [showDialogCanceledTransaction, setShowDialogCanceledTransaction] =
    useState(false);
  const [isMountLoan, setIsMountLoan] = useState(false);
  const [product, setProduct] = useState({
    backgroundColor: themeCardPrimary?.disabled,
    image: iconRenteeProductLock,
    text: themeText?.primary,
  });
  const loanXid = transactionData?.loan_xid || utils.store.get('loanXid');
  const loanStatus =
    transactionData?.loan_status || utils.store.get('loanStatus');

  const fetchLoanDetail = async () => {
    try {
      const response = await fetchLoan();

      saveTransactionData({
        ...transactionData,
        loan_status: response.data?.loan_status,
        loan_xid: response.data?.loan_xid,
      });
      if (
        response.data?.loan_status == 216 ||
        response.data?.loan_status == 217
      ) {
        setShowDialogCanceledTransaction(true);
      }
    } catch (error) {
      handleNotification({
        isOpen: true,
        message: error?.response?.data?.errors?.[0],
        data: error?.response,
      });
    }
  };

  const handleDialogInfo = () => {
    setShowDialogCanceledTransaction(false);
  };

  const handleReactiveLoan = async (valueXid) => {
    try {
      await reactiveLoan(valueXid);
      history.push(product?.action, { from: 'home' });
    } catch (error) {
      handleNotification({
        isOpen: true,
        message: error?.response?.data?.errors?.[0],
      });
    } finally {
      handleLoadingOverlay(false);
    }
  };

  const handleClickMenu = async () => {
    if (loanXid) {
      if (loanStatus == 216) {
        return await handleReactiveLoan(loanXid);
      }
      return history.push(product?.action, { from: 'home' });
    } else {
      if (!product?.disabled) {
        return history.push(product?.action, { from: 'home' });
      }
    }
  };

  const renderProduct = () => {
    if (loanXid && isMountLoan) {
      return (
        <Div
          fluid
          display='flex'
          justifyContent='space-between'
          alignItems='center'
        >
          <Div display='flex' alignItems='center'>
            <img src={product?.image} width='50' height='50' />
            <Div className={`${mx3}`}>
              <Div
                fontSize={product?.title?.size}
                color={product?.title?.color}
                fontWeight={product?.title?.weight}
              >
                {product?.title?.text}
              </Div>
              <Div
                fontSize={product?.title?.size}
                color={product?.title?.color}
              >
                {product?.description?.text}
              </Div>
            </Div>
          </Div>
          <img src={product?.imageAction} width='18' height='18' />
        </Div>
      );
    } else {
      return (
        <>
          <div className={`${positionRelative}`}>
            <img src={product?.image} width='60' height='60' />
            {product?.disabled && (
              <img
                src={iconLocked}
                width='20'
                height='20'
                className={`${positionAbsolute} ${translate(
                  '0%',
                  '-25%',
                )} ${right('0%')}`}
              />
            )}
          </div>
          <div className={`${ml3} ${color(product?.title?.color)}`}>
            {product?.title?.text}
          </div>
        </>
      );
    }
  };

  useEffect(() => {
    if (loanXid) {
      setProduct({
        disabled: false,
        backgroundColor: themeColors?.white,
        image: IconRenteeContinueTransactions,
        imageAction: iconChevronRight,
        action: 'transaction-summaries',
        title: {
          text: 'Lanjutkan Transaksi Anda',
          color: themeText?.primary,
          size: 12,
          weight: 'bold',
        },
        description: {
          text: 'Yuk, lanjutkan transaksi Anda atau transaksi  akan otomatis dibatalkan oleh sistem ',
          color: themeText?.primary,
          size: 10,
        },
      });
      fetchLoanDetail();
      setIsMountLoan(true);
    } else {
      if (datas?.appStatus < 190) {
        setProduct({
          disabled: true,
          backgroundColor: themeCardPrimary?.disabled,
          image: iconRenteeProductLock,
          title: {
            text: 'Rentee Erafone',
            color: themeText?.primary,
          },
        });
      } else {
        setProduct({
          disabled: disabled,
          backgroundColor: disabled
            ? themeCardPrimary?.disabled
            : themeCardPrimary?.backgroundColor,
          image: disabled ? iconRenteeProductLock : iconRenteeProduct,
          action: 'introduction',
          title: {
            text: 'Rentee Erafone',
            color: disabled ? themeText?.primary : themeCardPrimary?.color,
          },
        });
      }
      setIsMountLoan(false);
    }
  }, [loanXid, disabled, params.partner]);

  return (
    <>
      <Card
        rounded
        className={`${boxShadowThick} ${my4}`}
        backgroundColor={`${product?.backgroundColor}`}
      >
        <div
          className={cx(
            {
              [cursorPointer]: !product?.disabled,
              [fontWeight600]: !loanXid,
              [color(themeText?.primary)]: !loanXid,
            },
            `${fontSize(14)} ${dFlex} ${justifyCenter} ${alignCenter}`,
          )}
          onClick={() => handleClickMenu()}
        >
          {renderProduct()}
        </div>
      </Card>

      <DialogInfo
        dialogData={DIALOG_DATA_CANCELED_TRANSACTION}
        showDialogInfo={showDialogCanceledTransaction}
        handleShowDialogInfo={(e) => setShowDialogCanceledTransaction(e)}
        handleClickDialogButton={(e) => handleDialogInfo(e)}
      />
    </>
  );
};

ProductInfo.propTypes = {
  disabled: PropTypes.bool,
};

export default ProductInfo;
