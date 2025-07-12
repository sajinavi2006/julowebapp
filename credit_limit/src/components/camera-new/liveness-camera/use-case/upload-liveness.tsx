import { AxiosError } from 'axios';

import { uploadLivenessImage } from 'services/partner/common/partnership';

import { UploadProps } from '../types';

//this need to return if the user need to retry or not
const uploadLiveness = async (props: UploadProps) => {
  const { data, retryOnApplicationFailed } = props;
  const imgNeutral = data[0].image;
  const imgSmile = data[1].image;
  try {
    await uploadLivenessImage(imgNeutral, imgSmile);

    return false;
  } catch (error) {
    const response = (error as AxiosError).response;
    const statusCode = response?.status;
    const errors = response?.data?.errors[0];

    switch (statusCode) {
      case 400: //application failed
      if (retryOnApplicationFailed) {
        if (errors?.retry_count >= errors?.max_retry) return false;
        else return true;
      }
      
        //check if got error_code NO_FACT_DETECTED
        if (
          errors?.error_code.active_liveness_detection === null ||
          errors?.error_code.passive_liveness_detection === null
        ) {
          return false;
        } else {
          if (errors?.retry_count >= errors?.max_retry) {
            return false;
          } else {
            return true;
          }
        }
      case 404: //application not found
        return false;
      case 520: //dot digital identity internal server error
        return false;
      case 429: //exceed limit
        return false;
      default:
        return true;
    }
  }
};

export default uploadLiveness;
