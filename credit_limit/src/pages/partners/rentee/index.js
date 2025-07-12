import React from "react";
import { useParams, withRouter, useHistory } from "react-router-dom";

import { Main } from "assets/css/styled";

import PageGuard from "components/PageGuard";

import Home from "./Home";
import Introduction from "./Introduction";
import Transaction from "./Transaction";
import PinPageVerification from "./PinVerification";
import TransactionSummaries from "./Transaction/Summaries";
import SPHPPage from "./SPHP";
import Deposit from "./Deposit";
import StoreList from "./StoreList";
import SignaturePage from "./Signature";
import PaymentTutorialPage from "./PaymentTutorial";
import RenteePrivacyPage from "./Privacy";

const Rentee = () => {
  const { page, partner } = useParams();
  const history = useHistory();

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home />;
      case "introduction":
        return (
          <PageGuard
            previousAllowedState="home"
            restrictedTo="/rentee/home"
          >
            <Introduction />
          </PageGuard>
        );
      case "transaction":
        return (
          <PageGuard
            previousAllowedState="introduction"
            restrictedTo="/rentee/home"
          >
            <Transaction />
          </PageGuard>
        );
      case "pin-verification":
        return <PinPageVerification />;
      case "transaction-summaries":
        return <TransactionSummaries />;
      case "how-to-pay":
        return <PaymentTutorialPage />;
      case "seller-verification":
        return (
          <PageGuard
            previousAllowedState="transaction-summaries"
            restrictedTo="/rentee/transaction-summaries"
          >
            <PinPageVerification />
          </PageGuard>
        );

      case "signature":
        return (
          <PageGuard
            previousAllowedState="transaction-summaries"
            restrictedTo="/rentee/transaction-summaries"
          >
            <SignaturePage />
          </PageGuard>
        );
      case "sphp":
        return (
          <PageGuard
            previousAllowedState="transaction-summaries"
            restrictedTo="/rentee/transaction-summaries"
          >
            <SPHPPage />
          </PageGuard>
        );
      case "deposit":
        return (
          <PageGuard
            previousAllowedState="sphp"
            restrictedTo="/rentee/transaction-summaries"
          >
            <Deposit />
          </PageGuard>
        );
        case "store-list":
        return (
          <PageGuard
            previousAllowedState="introduction"
            restrictedTo="/rentee/home"
          >
            <StoreList />
          </PageGuard>
        );
      case "rentee-tnc":
        return (
          <PageGuard
            previousAllowedState="introduction"
            restrictedTo="/rentee/home"
          >
            <RenteePrivacyPage />
          </PageGuard>
        );

      default:
        return history.replace(`/${partner}/home`);
    }
  };

  return <Main>{renderPage()}</Main>;
};

export default withRouter(Rentee);
