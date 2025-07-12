import React from 'react';
import LinkAjaOtpEmailVerification from './OtpEmailVerification';
import PageGuard from 'components/PageGuard';

const OtpEmailVerification = () => {
  return (
    <PageGuard previousAllowedState='register' restrictedTo='/linkaja/nik'>
      <LinkAjaOtpEmailVerification />
    </PageGuard>
  );
};

export default OtpEmailVerification;
