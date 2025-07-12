import React from 'react';
import LinkAjaOtpVerification from './OtpVerification';
import PageGuard from 'components/PageGuard';

const OtpVerification = () => {
  return (
    <PageGuard
      previousAllowedState='nik'
      restrictedTo='/linkaja/nik'
    >
      <LinkAjaOtpVerification />
    </PageGuard>
  );
};

export default OtpVerification;
