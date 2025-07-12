/**
 * @description: no documentation for the pattern, please no more disable no-explicit-any when rewrite!
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';

import useGlobalState from '../../../actions';
import { useUserContext } from 'providers/UserProvider';

import { cardCase, FORM_131 } from '../../../constant';
import axios from 'axios';
import { config } from '../../../configs';
import { Button, Card } from '../../../assets/css/styled';
import {
  alignCenter,
  cursorPointer,
  dFlex,
  justifyBetween,
  mb3,
  mt4,
  my3,
  overflowYAuto,
  positionAbsolute,
  positionRelative,
  translateCenter,
  textCenter,
  boxShadowThin,
  ml2,
  w100,
  borderNone,
  borderRadiusBottomNone,
  mb4,
  textLeft,
  justifyCenter,
} from '../../../assets/css/stylesFix';
import {
  background,
  border,
  borderBottom,
  borderRadiusAll,
  bottom,
  color,
  fontSize,
  fontWeight,
  height,
  minHeight,
  padding,
  top,
  transition,
  widthHeight,
  zIndex,
} from '../../../assets/css/stylesValue';

import iconThumbsUp from '../../../assets/img/icon/ic-thumbs_up.svg';

import loading from '../../../assets/img/loading.gif';

import {
  KtpSelfieUploadGuidance,
  KtpUploadGuidance,
} from 'components/Camera/DialogContent';
import BackCameraUniversal from '../../BackCameraUniversal';
import FrontCameraUniversal from '../../FrontCameraUniversal';
import Dialog from '..';
import FormTakePhoto from '../../FormTakePhoto';
import CropImage from '../../CropImage';

import {
  submitMandatoryForm as submitMandatoryFormJ1,
  getDataImages as getDataImagesJ1,
  uploadImage as uploadImageJ1,
} from 'services/form';
import {
  submitMandatoryForm as submitMandatoryFormPartnership,
  getDataImages as getDataImagesPartnership,
  uploadImage as uploadImagePartnership,
} from 'services/partner/common/partnership';
import utils from 'utils';
import services from 'services';
import { useParams } from 'react-router-dom';

interface Props {
  dialogData: any;
  handleShowDialogForm: (params: boolean) => void;
  handleSentDialogForm: (params: boolean) => void;
  setDialogData: (params: any) => void;
  setShowDialogInfo: (params: boolean) => void;
  showDialogForm: boolean;
}

const DialogForm: React.FC<Props> = ({
  dialogData,
  handleShowDialogForm,
  handleSentDialogForm,
  setDialogData,
  setShowDialogInfo,
  showDialogForm,
}) => {
  const {
    fetchHomeScreen,
    datas,
    setDatas,
    handleNotification,
    convertDataURLtoFile,
  } = useUserContext();
  const [, actions] = useGlobalState();
  const { partner }: { partner: string } = useParams();
  const [responseForm131, setResponseForm131] = useState<any>([]);
  const [isScrollFormDialog, setIsScrollFormDialog] = useState(false);
  const [cameraGuidance, setCameraGuidance] = useState<any>({});
  const [disableAllFormTakePhoto, setDisableAllFormTakePhoto] = useState(false);

  const [photoToCrop, setPhotoToCrop] = useState<any>('');

  const [camera, setCamera] = useState<{
    type?: string;
    name?: string;
    status?: number;
    [key: string]: any;
  }>({
    type: '',
    name: '',
    status: 1,
  });
  const [isShowToolTip, setIsShowToolTip] = useState(false);
  const [loadingPhotoIndex, setLoadingPhotoIndex] = useState<{
    index?: number;
    section?: string | null;
  }>({});
  const [loadingSentForm, setLoadingSentForm] = useState(false);
  const [selectedIndexPhoto, setSelectedIndexPhoto] = useState<number>();
  const contentElement = useRef<HTMLDivElement>(null);

  const fetchFormData = async () => {
    const tempCardCase = cardCase('131') || dialogData;
    setDialogData(tempCardCase);
    try {
      let response: { results?: any } = {};
      switch (partner) {
        case 'linkaja':
          response = await getDataImagesPartnership();
          break;
        default:
          response = await getDataImagesJ1();
          break;
      }
      const listImage = response?.results?.map((item: any) => {
        return {
          value: item.image_status ? null : item.image_url_api,
          name: item.image_type,
          status: item.image_status,
        };
      });
      const setForm131 = FORM_131.map((item) => {
        let itemIndexDropdown;
        const itemIndex = listImage
          .map((obj: any) => obj.name)
          .indexOf(item.name);

        if (item?.dropdown?.length) {
          const itemDropdown = item.dropdown;

          itemIndexDropdown = itemDropdown.map((value) => {
            const dropdownIndex = listImage
              .map((obj: any) => obj.name)
              .indexOf(value.name);
            return dropdownIndex !== -1
              ? {
                  ...value,
                  name: listImage[dropdownIndex]?.name,
                  value: listImage[dropdownIndex]?.value,
                  status: listImage[dropdownIndex]?.status,
                }
              : { ...value };
          });

          itemIndexDropdown.sort((a, b) => {
            return b.value?.length - a.value?.length;
          });
        }
        return {
          ...item,
          name: listImage[itemIndex]?.name || item.name,
          value: listImage[itemIndex]?.value || item.value,
          status: listImage[itemIndex]?.status,
          dropdown: itemIndexDropdown || [],
        };
      });

      setResponseForm131(setForm131);
      actions.closeLoadingOverlay();
    } catch (error: any) {
      if (error) {
        actions.closeLoadingOverlay();
        handleNotification({
          isOpen: true,
          message:
            error?.response?.data?.errors?.length > 0
              ? error?.response?.data?.errors[0]
              : error.message,
        });
      }
    }
  };

  const handlePhotoCrop = async (dataPhoto: any) => {
    const { image, index = selectedIndexPhoto, type, section } = dataPhoto;

    try {
      const response: any = [];
      const convertedFile = convertDataURLtoFile(image, `${Math.random()}.jpg`);
      setDisableAllFormTakePhoto(true);

      if (type === 'selfie' && partner != 'linkaja') {
        /*const selfieTypeConfig = [{
                    name: name,
                    image: convertedFile
                }, {
                    name: 'crop_selfie',
                    image: photoCrop
                }]

                for (const item of selfieTypeConfig) {
                    const formData = new FormData();
                    formData.append('upload', item.image);
                    formData.append('image_type', item.name);
                    formData.append('image_source', utils.store.get('applicationId'));

                    const res = await uploadImage(formData);
                    response.push(res);
                };*/
        const formData = new FormData();
        formData.append('file', convertedFile);
        formData.append('image_type', 'selfie');
        const res = await axios.post(
          config.apiUrl + '/partner/grab/common/upload',
          formData,
          {
            headers: {
              Authorization: 'Token ' + utils.store.get('token'),
            },
          },
        );
        if (res?.data && res?.data?.success) {
          response.push(res);
        }
      } else {
        const formData = new FormData();
        formData.append('upload', convertedFile);
        formData.append('image_type', type);
        formData.append('image_source', utils.store.get('applicationId') ?? '');

        let res = {};
        switch (partner) {
          case 'linkaja':
            res = await uploadImagePartnership(formData);
            break;
          default:
            res = await uploadImageJ1(formData);
            break;
        }
        response.push(res);
      }

      if (
        type === 'selfie'
          ? response?.length === 1
          : response?.[0]?.id || response?.[0]?.data?.image_id
      ) {
        if (section === 'Bukti Penghasilan') {
          const tempResponse131 = responseForm131;
          tempResponse131[tempResponse131?.length - 1].dropdown[index] = {
            ...tempResponse131[tempResponse131?.length - 1].dropdown[index],
            value: image,
            reSubmit: true,
          };
          setResponseForm131(tempResponse131);
        } else {
          const tempResponse131 = responseForm131;
          tempResponse131[index] = {
            ...tempResponse131[index],
            value: image,
            reSubmit: true,
          };
          setResponseForm131(tempResponse131);
        }
      } else {
        handleNotification({
          isOpen: true,
          message:
            type === 'selfie'
              ? 'Terjadi kesalahan pada unggahan selfie.'
              : response?.errors[0],
        });
      }

      setDisableAllFormTakePhoto(false);
      setLoadingPhotoIndex({});
      setPhotoToCrop({});
      setCameraGuidance({});
      setIsShowToolTip(true);
      fetchFormData();

      actions.closeLoadingOverlay();
    } catch (error: any) {
      if (error) {
        actions.closeLoadingOverlay();
        handleNotification({
          isOpen: true,
          message:
            error?.response?.data?.errors?.length > 0
              ? error?.response?.data?.errors[0]
              : error.message,
        });
        services.sentry.handleSentryApiError(
          error,
          {},
          utils.store.get('token') ?? '',
        );
      }
      actions.closeLoadingOverlay();
    }
  };

  const handleScrollFormDialog = (value: any) => {
    if (value?.target.scrollTop > 30) {
      if (!isScrollFormDialog) {
        setIsScrollFormDialog(true);
      }
    } else {
      if (isScrollFormDialog) {
        setIsScrollFormDialog(false);
      }
    }
  };

  const handleClickCloseFormDialog = () => {
    handleShowDialogForm(false);
  };

  const handleClickDynamicFormTakePhoto = ({
    index,
    status,
    position,
    section,
    data,
  }: {
    index: any;
    status: string;
    position: string;
    section: any;
    data: {
      title: string;
      name: string;
    };
  }) => {
    if (status === 'Take Picture') {
      if (!disableAllFormTakePhoto) {
        const tempCamera = {
          position: position,
          title: data.title,
          type: data.name,
          section: section,
        };
        setCamera(tempCamera);

        setLoadingPhotoIndex({
          index: index,
          section: section,
        });
        setSelectedIndexPhoto(index);

        localStorage.setItem('camera', JSON.stringify(tempCamera));
        localStorage.setItem('photoIndex', index);
        localStorage.setItem('photoTitle', section);
        if (position === 'BackCamera') {
          localStorage.setItem('bkcam', 'yes');
        } else {
          localStorage.setItem('fntcam', 'yes');
        }
        location.reload();
        actions.openLoadingOverlay();
      } else {
        handleNotification({
          isOpen: true,
          message: 'Mohon tunggu hingga proses upload foto selesai.',
        });
      }
    }
    actions.closeLoadingOverlay();
  };

  const handleSubmitPhoto = async (value: any) => {
    setPhotoToCrop(value.image);
    handlePhotoCrop(value);

    setCamera((prev) => ({ ...prev, position: '' }));
  };

  const handleSentForm = async ({
    status,
    action,
  }: {
    status: any;
    action: any;
  }) => {
    if (status) {
      try {
        setLoadingSentForm(true);
        let response: { data?: { success?: boolean } } = {};
        switch (partner) {
          case 'linkaja':
            response = await submitMandatoryFormPartnership();
            break;
          default:
            response = await submitMandatoryFormJ1();
            break;
        }
        const responseHomeScreen = await fetchHomeScreen();

        if (response.data?.success === true) {
          setDatas({
            ...datas,
            homeScreenInfo: responseHomeScreen,
            appStatus: responseHomeScreen.applications[0].status,
          });
          const tempCardCase = cardCase(action);
          setDialogData(tempCardCase);
          handleShowDialogForm(false);
          setShowDialogInfo(true);
          setLoadingSentForm(false);
          handleSentDialogForm(true);
          actions.closeLoadingOverlay();
        }
      } catch (error: any) {
        if (error) {
          actions.closeLoadingOverlay();
          handleNotification({
            isOpen: true,
            message:
              error?.response?.data?.errors?.length > 0
                ? error?.response?.data?.errors[0]
                : error.message,
          });
        }
      }
    }
  };

  const checkForm = () => {
    const status = responseForm131
      ?.filter((item: any) => item.isRequired)
      .filter((item: any) => !!item.value);

    return status?.length > 1;
  };

  const ToolTip = () => {
    return isShowToolTip ? (
      <div className={`${textCenter} ${positionAbsolute} ${top('-70%')}`}>
        <div
          className={`${fontSize(12)} ${color('#fff')} ${background(
            'rgba(94, 94, 94, 0.85)',
          )} ${borderRadiusAll('4px')} ${padding('10px 15px')}`}
        >
          Gambar berhasil terkirim
        </div>
      </div>
    ) : null;
  };

  const handleThumbsUp = (obj: any) => {
    if (obj.value && obj.status == 0) {
      return true;
    } else if (
      obj?.dropdown?.filter((item: any) => !!item.value && item.status == 0)
        ?.length
    ) {
      return true;
    } else {
      return false;
    }
  };

  const sliceCameraTitle = (str: any) => {
    const splitStr = camera.type?.split(' ');

    if (splitStr && splitStr[0] === 'Foto') {
      return splitStr.slice(1).join(' ');
    } else {
      return str;
    }
  };

  const handleCancelCamera = (state: any) => {
    switch (state) {
      case 'front':
        actions.setState('isSelfiePhotoDialogShown', false);
        break;
      case 'back':
        actions.setState('isPhotoDialogShown', false);
        break;
      default:
        break;
    }
    setCameraGuidance({});
    setLoadingPhotoIndex({});
  };

  useEffect(() => {
    if (isShowToolTip) {
      const toolTipTimeout = setTimeout(() => {
        setIsShowToolTip(false);
      }, 3000);
      return () => {
        clearTimeout(toolTipTimeout);
      };
    }
  }, [isShowToolTip]);

  useEffect(() => {
    if (showDialogForm) {
      fetchFormData();
      if (
        localStorage.getItem('fntcam') === 'yes' ||
        localStorage.getItem('bkcam') === 'yes'
      ) {
        const tempCamera = localStorage.getItem('camera');
        const tempPhotoIndex = parseInt(
          localStorage.getItem('photoIndex') ?? '',
        );
        const tempPhotoTitle = localStorage.getItem('photoTitle');
        const parsePhotoIndex = JSON.parse(tempCamera ?? '');

        if (parsePhotoIndex?.type === 'ktp_self') {
          setCameraGuidance({
            dialogData: {
              name: 'ktp',
              title: 'KTP',
              content: <KtpUploadGuidance />,
            },
          });
        } else if (parsePhotoIndex?.type === 'selfie') {
          setCameraGuidance({
            dialogData: {
              name: 'selfie',
              title: 'KTP Selfie',
              content: <KtpSelfieUploadGuidance />,
            },
          });
        }
        setLoadingPhotoIndex({
          index: tempPhotoIndex,
          section: tempPhotoTitle,
        });
        setCamera(parsePhotoIndex);
        setSelectedIndexPhoto(tempPhotoIndex);
        if (localStorage.getItem('fntcam') === 'yes') {
          localStorage.removeItem('fntcam');
        } else {
          localStorage.removeItem('bkcam');
        }
        localStorage.removeItem('camera');
        localStorage.removeItem('photoIndex');
        localStorage.removeItem('photoTitle');
      }
    }
  }, [showDialogForm]);

  return (
    <Dialog
      baseColor={`#000`}
      clickOutside={true}
      padding={`0px 0px 24px 0px`}
      position={'bottom'}
      getShow={handleShowDialogForm}
      show={showDialogForm}
      type={'form'}
    >
      <div
        ref={contentElement}
        className={`${textCenter} ${
          isScrollFormDialog && boxShadowThin
        } ${transition('box-shadow 0.3s')}`}
      >
        <div // Button escape dialog form
          className={`${height('30px')} ${positionRelative} ${cursorPointer}`}
          onClick={() => handleClickCloseFormDialog()}
        >
          <div
            className={`${positionAbsolute} ${translateCenter} ${widthHeight(
              '84px',
              '3px',
            )} ${background('#ddd')}`}
          />
        </div>
        <div
          className={`${color('#5e5e5e')} ${fontSize(18)} ${fontWeight(
            'bold',
          )}`}
        >
          {dialogData?.dialogForm?.title?.text}
        </div>
        <div
          className={`${mt4} ${textLeft} ${color('#00acf0')} ${fontSize(
            14,
          )} ${background('#f3fcff')} ${padding('15px 24px')}`}
        >
          {dialogData?.dialogForm?.message?.text}
        </div>
      </div>
      <div
        className={`${height(
          `calc(100% - ${contentElement?.current?.offsetHeight}px)`,
        )} ${padding('24px 24px 150px 24px')} ${overflowYAuto}`}
        onScroll={handleScrollFormDialog}
      >
        {responseForm131?.length
          ? responseForm131?.map((item: any, index: number, arr: []) => (
              <div
                key={index}
                className={`${positionRelative} ${mb4} ${
                  index + 1 !== arr?.length && borderBottom('1px solid #e0e0e0')
                }`}
              >
                <div
                  className={`${dFlex} ${justifyBetween} ${alignCenter} ${mb3} ${color(
                    '#5e5e5e',
                  )} ${fontSize(18)} ${fontWeight('bold')}`}
                >
                  <div>
                    <span className={`${fontSize(18)} ${color('#5e5e5e')}`}>
                      {item?.title}
                    </span>
                    <span
                      className={`${ml2} ${fontSize(12)} ${color(
                        'rgba(94, 94, 94, 0.5)',
                      )}`}
                    >
                      ({item.isRequired ? 'Wajib' : 'Tidak Wajib'})
                    </span>
                    {handleThumbsUp(item) && (
                      <img
                        className={`${ml2}`}
                        src={iconThumbsUp}
                        alt='Thumbs Up'
                      />
                    )}
                  </div>
                </div>
                {item?.dropdown?.length ? (
                  <div className={`${color('#5e5e5e')}`}>
                    {item.information && (
                      <Card
                        rounded
                        padding={'16px'}
                        backgroundColor={'#f3fcff'}
                        className={`${my3} ${fontWeight('bold')} ${border(
                          '1px solid #00acf0',
                        )} ${color('#00acf0')}`}
                      >
                        {item.information}
                      </Card>
                    )}
                    {item.textIsRequired && (
                      <div className={`${my3} ${fontWeight('bold')}`}>
                        {item.textIsRequired}
                      </div>
                    )}
                    {item.descriptionIsRequired && (
                      <div className={`${my3}`}>
                        {item.descriptionIsRequired}
                      </div>
                    )}
                    {item.dropdown.map((obj: any, idx: number) => (
                      <div key={idx}>
                        <span
                          className={`${fontWeight('bold')} ${color(
                            '#5e5e5e',
                          )}`}
                        >
                          {obj?.title}
                        </span>
                        <FormTakePhoto
                          isLoading={
                            loadingPhotoIndex.index === idx &&
                            loadingPhotoIndex.section === item.title
                          }
                          image={
                            obj.status == 0 || !!obj?.reSubmit ? obj?.value : ''
                          }
                          type={item.name === 'selfie' ? 'front' : 'back'}
                          onClick={() =>
                            handleClickDynamicFormTakePhoto({
                              section: item.title,
                              position: 'BackCamera',
                              index: idx,
                              data: obj,
                              status: 'Take Picture',
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <FormTakePhoto
                    isLoading={
                      loadingPhotoIndex.index === index &&
                      loadingPhotoIndex.section === item.title
                    }
                    image={
                      item.status == 0 || !!item?.reSubmit ? item.value : ''
                    }
                    type={item.name === 'selfie' ? 'front' : 'back'}
                    onClick={() =>
                      handleClickDynamicFormTakePhoto({
                        section: item.title,
                        position: `${
                          item.name === 'selfie' ? 'FrontCamera' : 'BackCamera'
                        }`,
                        index: index,
                        data: item,
                        status: 'Take Picture',
                      })
                    }
                  />
                )}
              </div>
            ))
          : null}
      </div>
      <div
        className={`${w100} ${positionAbsolute} ${dFlex} ${justifyCenter} ${padding(
          `0px 24px`,
        )} ${bottom('0px')} ${zIndex(2)}`}
      >
        <ToolTip />
        <Button
          fluid
          disabled={!checkForm()}
          className={`${borderRadiusBottomNone} ${borderNone} ${padding(
            '11px',
          )} ${minHeight(48)} ${fontSize(16)}`}
          onClick={() =>
            handleSentForm({
              status: checkForm(),
              action: dialogData?.dialogForm?.button?.action,
            })
          }
        >
          {loadingSentForm ? (
            <img src={loading} width='25px' height='25px' />
          ) : (
            dialogData?.dialogForm?.button?.text
          )}
        </Button>
      </div>

      {camera.position === 'BackCamera' && (
        <BackCameraUniversal
          name={camera.title}
          type={sliceCameraTitle(camera.type)}
          dialogData={cameraGuidance?.dialogData}
          onCancel={() => handleCancelCamera('back')}
          onImageSubmitted={(imageBase64) =>
            handleSubmitPhoto({
              image: imageBase64,
              section: camera.section,
              name: camera.title,
              type: camera.type,
              status: 'Take Picture',
            })
          }
        />
      )}
      {camera.position === 'FrontCamera' && (
        <FrontCameraUniversal
          name={camera.title}
          type={sliceCameraTitle(camera.type)}
          dialogData={cameraGuidance?.dialogData}
          onCancel={() => handleCancelCamera('front')}
          onImageSubmitted={(imageBase64) =>
            handleSubmitPhoto({
              image: imageBase64,
              section: camera.section,
              name: camera.title,
              type: camera.type,
              status: 'Take Picture',
            })
          }
        />
      )}
      <CropImage
        image={photoToCrop}
        setImage={(value) => handlePhotoCrop(value)}
      />
    </Dialog>
  );
};

DialogForm.defaultProps = {
  showDialogForm: false,
};

export default DialogForm;
