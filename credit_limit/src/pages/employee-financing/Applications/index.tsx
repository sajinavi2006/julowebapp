import { cx } from '@emotion/css';
import { useParams } from 'react-router-dom';

import { color as colorText, fontSize, marginY } from 'assets/css/stylesValue';

import { Container, Main, Wrapper } from 'assets/css/styled';

import { MAX_WIDTH, MIN_WIDTH } from 'constant';

import Steps from './components/Steps';
import ApplicationLayout from './components/ApplicationLayout';
import PageGuard from 'components/PageGuard';
import ValidationWrapper from '../components/ValidationWrapper';
import PersonalIdentity from './PersonalIdentity';
import FamilyInformation from './FamilyInformation';
import Financial from './Financial';
import { ApplicationUseParams } from './types';

/**
 * Route: /ef-pilot/application/(personal_identity|family_information|financial|loan_application)
 * Access: Private
 */
const EmployeeFinancingApplication = () => {
  const { page } = useParams<ApplicationUseParams>();

  return (
    <ValidationWrapper>
      <Main>
        <Container>
          <Wrapper
            height={'100%'}
            minHeight={'100vh'}
            maxWidth={MAX_WIDTH}
            minWidth={MIN_WIDTH}
            backgroundColor='#fff'
            overflowX='hidden'
          >
            <p
              className={cx(
                fontSize(24),
                colorText('#181818'),
                marginY('20px'),
              )}
            >
              Formulir Permohonan Pinjaman
            </p>
            <p className={cx(fontSize(14), colorText('#9E9E9E'))}>
              Harap lengkapi formulir permohonan pinjaman berikut sesuai dengan
              informasi yang dibutuhkan
            </p>

            <Steps />

            <ApplicationLayout>
              {page === 'personal_identity' && <PersonalIdentity />}
              {page === 'family_information' && (
                <PageGuard
                  previousAllowedState='personal_identity'
                  restrictedTo='/ef-pilot/application/personal_identity'
                >
                  <FamilyInformation />
                </PageGuard>
              )}
              {page === 'financial' && (
                <PageGuard
                  previousAllowedState='family_information'
                  restrictedTo='/ef-pilot/application/family_information'
                >
                  <Financial />
                </PageGuard>
              )}
            </ApplicationLayout>
          </Wrapper>
        </Container>
      </Main>
    </ValidationWrapper>
  );
};

export default EmployeeFinancingApplication;
