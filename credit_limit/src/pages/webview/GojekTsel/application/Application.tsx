import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Global, css } from '@emotion/react';

import { FormProvider, useForm } from 'hooks/react-hook-form';

import { Navbar } from './components/navbar';
import {
  ApplicationPages,
  applicationFormSchema,
  defaultValues,
} from './constants';
import { applicationCx } from './styles';
import { ApplicationParams } from './types';
import { ApplicationNavigationProvider } from './hooks';

const Application = () => {
  const history = useHistory();
  const [page, setPage] = useState(0);
  const queryParams = new URLSearchParams(window.location.search);
  const portalId = queryParams.get('portal_id');

  const form = useForm<ApplicationParams>({
    defaultValues: defaultValues,
    resolver: yupResolver(applicationFormSchema),
    mode: 'onChange',
  });

  const ApplicationPage = ApplicationPages[page];

  if (!portalId) history.replace(`/view/error`);

  return (
    <div css={applicationCx} className='application-page'>
      <Navbar />
      <ApplicationNavigationProvider page={page} setPage={setPage}>
        <FormProvider {...form}>
          <ApplicationPage />
          <Global
            styles={css`
              html {
                font-size: 16px !important;
              }
            `}
          />
        </FormProvider>
      </ApplicationNavigationProvider>
    </div>
  );
};

export default Application;
