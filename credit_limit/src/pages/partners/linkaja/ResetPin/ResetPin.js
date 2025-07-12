import React from 'react';

import Layout from 'components/Layout';
import ResetPin from 'pages/commons/ResetPin';

const ResetPinPage = () => {
  return (
    <Layout useHeader barBackTitle='Lupa PIN / Kata Sandi'>
      <ResetPin hideBarBack />
    </Layout>
  );
};

export default ResetPinPage;
