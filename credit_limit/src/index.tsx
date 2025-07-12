import 'react-app-polyfill/stable';

import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App';
import ThemeSelector from './components/ThemeSelector';
import { queryClient } from 'constants/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

Sentry.init({
  dsn: 'https://7c3e27cec15c49aab93d08b7faaaeead@o54883.ingest.sentry.io/5831345',
  tracesSampleRate: 0.3,
  environment: process.env.REACT_APP_ENV_NAME,
});

ReactDOM.render(
  <Router>
    <ThemeSelector>
      <QueryClientProvider client={queryClient}>
        <App />
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
      </QueryClientProvider>
    </ThemeSelector>
  </Router>,
  document.getElementById('root'),
);
