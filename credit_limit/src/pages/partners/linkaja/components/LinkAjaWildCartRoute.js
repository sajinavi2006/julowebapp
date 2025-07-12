import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useQueryParams } from 'utils/RouteHelper';

const LinkAjaWildCartRoute = () => {
  const query = useQueryParams();
  const history = useHistory();
  const passbackParams = query?.get('passback_params');
  
  useEffect(() => {
    if (passbackParams && passbackParams === '__web_home') {
      history.replace('/linkaja/home');
    } else {
      history.replace('/linkaja/nik');
    }

  }, [passbackParams]);

  return null;
};

export default LinkAjaWildCartRoute;
