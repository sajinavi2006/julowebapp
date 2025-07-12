import React from 'react';
import ApplicationPage from 'components/ApplicationPage';
import { Div, Row, Col } from 'assets/css/styled';

interface Props {
  children: React.ReactNode;
}

const ApplicationLayout: React.FC<Props> = ({ children }) => {
  return (
    <Div>
      <ApplicationPage>
        <Div>
          <Row>
            <Col md='12'>
              <Div paddingBottom='15px' marginTop='30px'>
                {children}
              </Div>
            </Col>
          </Row>
        </Div>
      </ApplicationPage>
    </Div>
  );
};

export default ApplicationLayout;
