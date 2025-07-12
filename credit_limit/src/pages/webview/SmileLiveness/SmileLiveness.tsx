import CameraNew from 'components/camera-new';
import { useCallback, useEffect } from 'react';
import {
  livenessStatusCheck,
  uploadLivenessImagePreActiveCheck,
  uploadLivenessImagePreCheck,
} from 'services/partner/common/partnership';
import utils from 'utils';
import { useQueryParams } from 'utils/RouteHelper';

const SmileLiveness = () => {
  const query: URLSearchParams = useQueryParams();
  const tokenParams = query.get('at') || undefined;
  const verifyTokenParam = query.get('verifyToken');

  const completedRedirect = (isSuccess: boolean, reason?: string) => {
    window.location.replace(
      `juloapp://callback/liveness-completed?result=${
        isSuccess ? 'success' : 'failed'
      }&verifyToken=${verifyTokenParam}${reason ? `&reason=${reason}` : ''}`,
    );
  };

  const checkLivenessStatus = useCallback(async () => {
    try {
      const livenessStatusResponse = await livenessStatusCheck(tokenParams);

      if (livenessStatusResponse.success) {
        const passiveData =
          livenessStatusResponse.data?.passive_liveness_detection;
        const activeData =
          livenessStatusResponse.data?.active_liveness_detection;

        if (
          passiveData === null &&
          (activeData === null || activeData?.status === 'initial')
        ) {
          //never submit liveness
          const preCheckResponse = await uploadLivenessImagePreCheck(
            false,
            true,
            true,
            tokenParams,
          );
          if (
            preCheckResponse.data?.active_liveness === false &&
            preCheckResponse.data?.passive_liveness === false
          ) {
            // skip liveness if feature is off
            completedRedirect(false, 'Smile liveness feature is off');

            return false;
          }
          await uploadLivenessImagePreActiveCheck(tokenParams);
          return null;
        } else {
          if (
            (passiveData !== null && passiveData.status === 'failed') ||
            passiveData?.attempt >= passiveData?.max_attempt
          ) {
            //failed passive
            completedRedirect(
              false,
              'Passive liveness reached maximum attempt',
            );
            return false;
          }

          if (
            (activeData !== null && activeData.status === 'failed') ||
            activeData?.attempt >= activeData?.max_attempt
          ) {
            completedRedirect(false, 'Active liveness reached maximum attempt');
            return false;
          }

          //all liveness passed
          return true;
        }
      } else {
        completedRedirect(false, 'Smile check endpoint success false');
        return false;
      }
    } catch (error) {
      completedRedirect(false);
      return false;
    }
  }, []);

  useEffect(() => {
    if (tokenParams) {
      utils.store.set('token', tokenParams);
      checkLivenessStatus();
    }
  }, [tokenParams]);

  const handleGetImage = () => {
    completedRedirect(true);
  };

  const handleOnLivenessError = (error: Error) => {
    if (error.message.includes('supported')) {
      window.location.replace(`juloapp://callback/liveness-not-supported`);
    }
  };

  return (
    <CameraNew
      onLivenessError={handleOnLivenessError}
      cameraPosition='front'
      getImage={handleGetImage}
      show={true}
      dialogData={{
        name: 'liveness',
        title: 'Liveness Check',
      }}
      liveness={true}
      hideHeader
      retryOnApplicationFailed
      checkLivenessStatus={checkLivenessStatus}
    />
  );
};

export default SmileLiveness;
