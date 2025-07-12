import { useContext, useState, useEffect } from 'react';
import { UserContext } from 'providers/UserProvider';
import {
  Route,
  Switch,
  withRouter,
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';
import { downloadAppUrl, whitelistedPartner } from '../../constant';

import J1 from 'pages/partners/j1';
import LinkAjaRoute from 'pages/partners/linkaja';
import PaylaterRoute from 'pages/partners/paylater';
import Rentee from 'pages/partners/rentee';
import DanaRoute from 'pages/partners/dana';

import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';

import Application from 'pages/commons/Applications';
import LoginPage from 'pages/commons/Login';
import SignupPage from 'pages/commons/Signup';
import ForgotPasswordPage from 'pages/commons/ForgotPassword';
import PinPage from 'pages/commons/Pin';
import OtpPage from 'pages/commons/Otp';
import PrivacyPage from 'pages/commons/Privacy';
import OnboardingJ1 from 'pages/partners/j1/OnBoarding';
import OpenApp from 'pages/partners/j1/OpenApp';
import OnBoardingRentee from 'pages/partners/rentee/OnBoarding';
import RenteePrivacyPage from 'pages/partners/rentee/Privacy';

function PartnerRoutes() {
  const { partner } = useParams();
  const history = useHistory();
  const { search } = useLocation();
  const { datas, setDatas } = useContext(UserContext);
  const [validPartner, setValidPartner] = useState(true);
  const [privateComp, setPrivateComp] = useState({
    application: Application,
    partner: Rentee,
  });

  const toPlaystore = () => {
    window.location.assign(downloadAppUrl);
    return null;
  };

  const FetchRoutes = () => {
    setDatas((prevState) => ({
      ...prevState,
      partner: partner,
      paramsUrl: search,
    }));

    // for access specific partner, have to add partner in src/constant whitelistedPartner array
    // or the user will be automatically redirected to j1
    switch (partner) {
      case 'rentee':
        setPrivateComp((prevState) => ({
          ...prevState,
          partner: Rentee,
        }));
        break;
      case 'sellury':
        setPrivateComp((prevState) => ({
          ...prevState,
          partner: J1,
        }));
        break;
      case '99usahaku':
        setPrivateComp((prevState) => ({
          ...prevState,
          partner: J1,
        }));
        break;
      case 'klar':
        setPrivateComp((prevState) => ({
          ...prevState,
          partner: J1,
        }));
        break;
      case 'olx':
        setPrivateComp((prevState) => ({
          ...prevState,
          partner: J1,
        }));
        break;
      case 'finfleet':
        setPrivateComp((prevState) => ({
          ...prevState,
          partner: J1,
        }));
        break;
      case 'klop':
        setPrivateComp((prevState) => ({
          ...prevState,
          partner: J1,
        }));
        break;
      case 'cermati':
        setPrivateComp((prevState) => ({
          ...prevState,
          partner: J1,
        }));
        break;
      case 'smartfren':
        setPrivateComp((prevState) => ({
          ...prevState,
          partner: J1,
        }));
      case 'jeff':
        setPrivateComp((prevState) => ({
          ...prevState,
          partner: J1,
        }));
        break;
      case 'j1':
        setPrivateComp((prevState) => ({
          ...prevState,
          partner: J1,
        }));
        break;
      case 'myim3':
        setPrivateComp((prevState) => ({
          ...prevState,
          partner: J1,
        }));
        break;
      case 'digifin':
        setPrivateComp((prevState) => ({
          ...prevState,
          partner: J1,
        }));
        break;
      case 'dana':
        break;
      case 'linkaja':
        break;
      case 'paylater':
        break;
      default:
        if (datas.partner && datas.token)
          return history.replace({
            pathname: `/${datas.partner}/`,
            search: search,
          });
        toPlaystore();
    }
  };

  const checkValidPartner = () => {
    if (whitelistedPartner.includes(partner)) {
      setValidPartner(true);
    } else {
      setValidPartner(false);
    }
    FetchRoutes();
  };

  useEffect(() => {
    checkValidPartner();
    return () => {
      //
    };
  }, [partner]);

  if (!validPartner) return toPlaystore();

  return (
    <Switch>
      <Route component={LinkAjaRoute} path={`/linkaja`} />
      <Route component={PaylaterRoute} path={`/paylater`} />
      <Route component={DanaRoute} path={`/dana`} />

      <PublicRoute exact component={LoginPage} path={`/:partner/login`} />
      <PublicRoute exact component={SignupPage} path={`/:partner/signup`} />
      <PublicRoute exact component={PinPage} path={`/:partner/pin`} />
      <PublicRoute exact component={OtpPage} path={`/:partner/otp`} />
      <PublicRoute exact component={OpenApp} path={`/:partner/open-app`} />

      <Route
        exact
        component={ForgotPasswordPage}
        path={`/:partner/forgot-password`}
      />
      <Route exact component={PrivacyPage} path={`/:partner/tnc`} />
      <Route
        exact
        component={RenteePrivacyPage}
        path={`/:partner/rentee-tnc`}
      />

      <PublicRoute
        exact
        component={OnBoardingRentee}
        path={`/rentee/onboarding`}
      />
      <PublicRoute
        exact
        component={OnboardingJ1}
        path={`/:partner/onboarding`}
      />
      <PrivateRoute
        exact
        component={Application}
        path={`/:partner/application/:type`}
      />
      <PrivateRoute exact component={privateComp.partner} path={`/:partner`} />
      <PrivateRoute exact component={privateComp.partner} path={`/:partner/`} />
      <PrivateRoute
        exact
        component={privateComp.partner}
        path={`/:partner/:page`}
      />
      <PrivateRoute
        exact
        component={privateComp.application}
        path={`/:partner/:page/:type`}
      />
    </Switch>
  );
}

export default withRouter(PartnerRoutes);
