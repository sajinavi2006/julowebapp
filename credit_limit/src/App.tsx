import { useEffect } from 'react';

import Routes from 'routes';
import AppSnackBar from 'components/AppSnackBar';
import LoadingOverlay from 'components/LoadingOverlay';
import GlobalContextProvider from 'providers/GlobalContextProvider';
import { useQueryParams } from 'utils/RouteHelper';

import './SnackBar.css';

function App() {
  const query: URLSearchParams = useQueryParams();
  const passbackParams = query.get('passback_params');

  useEffect(() => {
    document.title = 'JULO';
    if (passbackParams) {
      localStorage?.setItem('passback_params', passbackParams);
    } else {
      localStorage?.setItem('passback_params', '');
    }
  }, []);

  return (
    <GlobalContextProvider>
      <LoadingOverlay />
      <Routes />
      <AppSnackBar />
    </GlobalContextProvider>
  );
}

export default App;
