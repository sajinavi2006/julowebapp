import React from 'react';
import PropTypes from 'prop-types';
import Steps from 'components/Steps';
import ApplicationPage from 'components/ApplicationPage';
import { Div, Row, Col } from 'assets/css/styled';

const dialogConfirmationSkipFormData = {
  img: null,
  title: {
    text: 'Apakah Anda yakin?',
  },
  message: {
    text: 'Jika Anda tidak menyelesaikan formulir pengajuan ini, pengajuan pinjaman Anda tidak akan diproses.',
  },
  button: [
    {
      text: 'Lanjutkan',
      action: 'close',
      url: '',
    },
    {
      bgColor: '#fff',
      borderColor: '#a1a1a1',
      color: '#a1a1a1',
      text: 'Lewati',
      action: 'redirect',
      url: 'home',
    },
  ],
};

const ApplicationLayout = ({ children, isShowHeader, step, title }) => {
  return (
    <Div>
      {!isShowHeader && (
        <Row className='longFormOverFlw'>
          <Col md='12' padding='0' className='px-0'>
            <Div padding='10px 30px' borderBottom='1px solid #e0e0e0'>
              <span className='subform-title-no-margin'>{title}</span>
            </Div>
          </Col>
        </Row>
      )}
      <ApplicationPage useHeader>
        <Div className='container-fluid appForms longFormOverFlw'>
          {isShowHeader && (
            <Steps step={step} dialogData={dialogConfirmationSkipFormData} />
          )}
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

ApplicationLayout.propTypes = {
  children: PropTypes.node.isRequired,
  isShowHeader: PropTypes.bool,
  step: PropTypes.number,
  title: PropTypes.string,
};

ApplicationLayout.defaultProps = {
  isShowHeader: true,
  step: 1,
};
export default ApplicationLayout;
