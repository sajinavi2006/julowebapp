import { useParams, useHistory } from 'react-router-dom';

import { Main } from 'assets/css/styled';

import Sphp from './SPHP';
import SPHPSuccess from './SphpSuccess';

const MerchantFinancing = () => {
  const { page } = useParams<{ page: string }>();
  const history = useHistory();

  const renderPage = () => {
    switch (page) {
      case 'sphp':
        return <Sphp />;
      case 'sphp-success':
        return <SPHPSuccess />;
      default:
        return history.replace(`/view/login`);
    }
  };

  return <Main>{renderPage()}</Main>;
};

export default MerchantFinancing;
