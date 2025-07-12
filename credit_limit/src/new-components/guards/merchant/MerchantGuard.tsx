import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import COOKIES_KEY from 'constants/cookies';
import useCookie from 'hooks/use-cookie';

import useGetFocusTime from 'hooks/use-get-focus-time';
import { queryStringify, queryParse } from 'utils/url';
import { useRGetProfile } from 'repositories/merchant/auth';
import { MerchantGuardProps } from './types';
import { PARTNERS, PUBLIC_ROUTE } from './constants';

const MerchantGuard = (props: MerchantGuardProps) => {
  const { children } = props;

  const { replace } = useHistory();
  const { pathname, search } = useLocation();
  const { cookies } = useCookie();

  const { isAbleToFetch } = useGetFocusTime({
    queryKey: ['profile'],
  });

  const { data } = useRGetProfile({
    enabled: !!cookies[COOKIES_KEY.AUTHORIZATION],
    refetchOnWindowFocus: isAbleToFetch,
  });

  useEffect(() => {
    const partnerName = data?.data.partner;
    const paramPartnerName = pathname.split('/')[2];

    /**
     * If user access /merchant
     */

    if (
      (pathname.split('/merchant')[1] === '/' ||
        pathname.split('/merchant')[1] === '') &&
      cookies[COOKIES_KEY.AUTHORIZATION]
    ) {
      if (!cookies[COOKIES_KEY.AUTHORIZATION] || !partnerName) {
        return replace('/');
      }

      return replace(`/merchant/${partnerName}`);
    }

    /**
     * If user access /merchant/:partnerName but incorrect partner
     */

    if (partnerName && partnerName !== paramPartnerName) {
      return replace('/');
    }

    /**
     * If user access /merchant/:partnerName and correct partner
     */

    const partner = partnerName ?? paramPartnerName;
    const route = pathname.split(`/merchant/${partner}`).join('');

    if (!PARTNERS.some((partner) => partner === paramPartnerName)) {
      return replace('/');
    }

    if (
      !cookies[COOKIES_KEY.AUTHORIZATION] &&
      !PUBLIC_ROUTE.some((path) => route.includes(path))
    ) {
      const query = queryParse(search);
      query['next'] = pathname;

      return replace({
        pathname: `/merchant/${partner}/login`,
        search: queryStringify(query),
      });
    }

    if (
      cookies[COOKIES_KEY.AUTHORIZATION] &&
      PUBLIC_ROUTE.some((path) => route.includes(path))
    )
      return replace(`/merchant/${partner}`);
  }, [pathname, data?.data.partner, pathname]);

  return <>{children}</>;
};

export default MerchantGuard;
