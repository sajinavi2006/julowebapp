/**
 * reasons: Disable any because this old code doesn't have the docs for the interface
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState, UIEvent } from 'react';
import { cx } from '@emotion/css';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import useGlobalState from '../../../actions';
import { useUserContext } from 'providers/UserProvider';
import { BANK_LIST, cardCase } from '../../../constant';

import { imgChecklist } from './styles';
import {
  Button,
  Card,
  Col,
  Div,
  Img,
  Row,
  Wrapper,
} from '../../../assets/css/styled';
import {
  alignCenter,
  cursorPointer,
  dFlex,
  justifyBetween,
  mb3,
  mt2,
  mt3,
  mt4,
  my3,
  overflowYAuto,
  positionAbsolute,
  positionRelative,
  translateCenter,
  textCenter,
  boxShadowThin,
  dNone,
  ml2,
  w100,
  borderNone,
  borderRadiusBottomNone,
  mb4,
  my4,
  justifyCenter,
  cursorDefault,
} from '../../../assets/css/stylesFix';
import {
  background,
  border,
  borderBottom,
  borderRadiusAll,
  bottom,
  height,
  minHeight,
  opacity,
  padding,
  top,
  text,
  transition,
  widthHeight,
  zIndex,
} from '../../../assets/css/stylesValue';

import iconChecked from '../../../assets/img/icon/ic-checked.svg';
import iconThumbsUp from '../../../assets/img/icon/ic-thumbs_up.svg';
import iconInformation from '../../../assets/img/icon/ic-information.svg';

import logoBPJS from '../../../assets/img/logo/BPJS.png';

import loading from '../../../assets/img/loading.gif';

import BackCameraUniversal from '../../BackCameraUniversal';
import Dialog from '..';
import Dropdown from '../../Dropdown';
import FormTakePhoto from '../../FormTakePhoto';
import DialogWebView from '../DialogWebView';

import {
  submitMandatoryForm as submitMandatoryFormJ1,
  boostStatus as boostStatusJ1,
  boostOption as boostOptionJ1,
  uploadImage as uploadImageJ1,
} from 'services/form';
import {
  submitMandatoryForm as submitMandatoryFormPartnership,
  boostStatus as boostStatusPartnership,
  boostOption as boostOptionPartnership,
  uploadImage as uploadImagePartnership,
} from 'services/partner/common/partnership';
import utils from 'utils';

import {
  CardCaseType,
  IHandleClickDynamicFormTakePhoto,
  IHandleSelect,
  IHandleSelectButton,
  IResponse,
  Props,
} from './type';

interface IBoostInfo {
  bankStatus?: { [key: string]: string }[];
  bpjsStatus?: string;
}

interface ICamera {
  title: string;
  position: string;
  type: string;
  name: string;
}

const DialogForm: React.FC<Props> = ({
  dialogData,
  handleShowDialogForm,
  handleSentDialogForm,
  setDialogData,
  setShowDialogInfo,
  showDialogForm,
}) => {
  const { datas, handleNotification, convertDataURLtoFile } = useUserContext();
  const { partner } = useParams<{ partner: string }>();
  const [, actions] = useGlobalState();
  const [isFirstMount, setIsFirstMount] = useState(true);
  const [isScrollFormDialog, setIsScrollFormDialog] = useState(false);
  const [dropdownMenu, setDropdownMenu] = useState<Record<string, string>[]>(
    [],
  );
  const [isLoadingDropdown, setIsLoadingDropdown] = useState(true);
  const [boostInfo, setBoostInfo] = useState<IBoostInfo>();
  const [camera, setCamera] = useState<ICamera>({
    title: '',
    position: '',
    type: '',
    name: '',
  });
  const [disableAllFormTakePhoto, setDisableAllFormTakePhoto] = useState(false);
  const [isShowInformation, setIsShowInformation] = useState(false);
  const [isShowToolTip, setIsShowToolTip] = useState(false);
  const [loadingPhotoIndex, setLoadingPhotoIndex] = useState<number | null>(
    null,
  );
  const [loadingSentForm, setLoadingSentForm] = useState(false);
  const [showDialogWebView, setShowDialogWebView] = useState(false);
  const [selectedIndexPhoto, setSelectedIndexPhoto] = useState<number | null>(
    null,
  );
  const [selectedDocument, setSelectedDocument] = useState<
    Record<string, string | boolean | unknown | []>[]
  >([
    {
      enable: false,
      image: {},
      name: '',
      title: '',
      status: [],
      type: '',
    },
  ]);
  const backCameraState = localStorage.getItem('bkcam');
  const frontCameraState = localStorage.getItem('fntcam');
  const contentElement = useRef<HTMLDivElement>(null);

  // any type but with static declaration
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  const isErrorWithMessage = (
    error: any,
  ): error is {
    message: string;
    response: {
      data: {
        errors: string[];
      };
    };
  } => {
    return (
      typeof error === 'object' &&
      error !== null &&
      typeof error.response.data === 'object'
    );
  };

  const checkSelectedForm = (index: number) => {
    const formItem = selectedDocument[index];

    if (formItem.name === 'Informasi Bank') {
      const statBank = (selectedDocument[index].status as [])?.filter(
        (item: { status: string }) => item?.status === 'Verified',
      );
      return statBank?.length > 0 ? true : false;
    } else if (selectedDocument[index].name === 'Informasi BPJS') {
      return formItem.status === 'Verified' ? true : false;
    } else {
      return formItem.value ? true : false;
    }
  };

  const setNewField = (data: any) => {
    setSelectedDocument([
      ...data,
      {
        id: '',
        title: '',
        status: '',
        type: '',
        value: '',
      },
    ]);
  };

  const getFilledDocument = (data: Array<any>) => {
    const filledDocument = data?.filter(
      (item: {
        type: string;
        value: string;
        name: string;
        /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
        // item status use as string and array
        status: any;
      }) =>
        (item.type === 'photo' && item.value) ||
        (item.type === 'selected' &&
          item.name === 'Informasi BPJS' &&
          item.status === 'Verified') ||
        (item.type === 'selected' &&
          item.name === 'Informasi Bank' &&
          item.status?.filter(
            (value: { status: string }) => value.status === 'Verified',
          )?.length),
    );

    const tempSelectedDocument =
      selectedDocument?.length > filledDocument?.length
        ? [...filledDocument, selectedDocument[selectedDocument?.length - 1]]
        : [...filledDocument];

    const tempDropdownMenu = data?.filter((item) => {
      return !tempSelectedDocument.find((obj) => obj.title === item.title);
    });

    if (filledDocument?.length) {
      if (selectedDocument?.length) {
        setDropdownMenu(tempDropdownMenu);
        setSelectedDocument(tempSelectedDocument);
      } else {
        const tempFilterDropdownMenu = data?.filter(
          (item: { title: string }) => {
            return (
              filledDocument
                .map((item: { title: string }) => item.title)
                ?.indexOf(item.title) === -1
            );
          },
        );

        setDropdownMenu(tempFilterDropdownMenu);
        setNewField([...filledDocument]);
      }
    } else {
      setDropdownMenu(tempDropdownMenu);
      setSelectedDocument(selectedDocument);
    }

    if (!filledDocument?.length && !selectedDocument?.length) {
      setNewField([]);
    }

    setIsFirstMount(false);
  };

  const fetchDropdownMenu = async () => {
    const appStatus = utils.store.get('appStatus');
    setIsLoadingDropdown(true);
    try {
      if (
        appStatus == '105' ||
        appStatus == '106' ||
        appStatus == '120' ||
        appStatus == '136' ||
        appStatus == '147'
      ) {
        let response: IResponse = {};
        switch (partner) {
          case 'linkaja':
            response = await boostOptionPartnership();
            break;
          default:
            response = await boostOptionJ1();
            break;
        }

        if (response?.errors?.length === 0) {
          let filteredResponse: Record<string, unknown>[] = [];
          let tempDropdownMenu: Record<string, unknown | string>[] = [];
          const tempSelectedDocumentTitle = selectedDocument?.map(
            (item: { title: string }) => item.title,
          );

          const data = response.data;

          for (const [key] of Object.entries(data || [])) {
            if (key !== 'credit_score' && data && data[key].enable) {
              let tempData;
              switch (key) {
                case 'bank_status':
                  tempData = {
                    title: 'Informasi Bank',
                    type: 'selected',
                    status: data[key].status?.map((item: any) => ({
                      ...item,
                      image: BANK_LIST?.filter(
                        (bank) => bank.name === item.bank_name,
                      )?.map((obj) => obj.image)[0],
                    })),
                    name: 'Informasi Bank',
                  };
                  break;
                case 'bpjs_status':
                  tempData = {
                    title: 'Informasi BPJS',
                    type: 'selected',
                    status: data[key].status,
                    name: 'Informasi BPJS',
                  };
                  break;
                case 'bank_statement_status':
                  tempData = {
                    title: 'Mutasi Rekening',
                    type: 'photo',
                    name: 'bank_statement',
                    value: data && data[key].image.image_url_api,
                  };
                  break;
                case 'salary_status':
                  tempData = {
                    title: 'Slip Gaji',
                    type: 'photo',
                    name: 'paystub',
                    value: data[key].image.image_url_api,
                  };
                  break;
                default:
                  break;
              }

              filteredResponse = [
                ...filteredResponse,
                {
                  ...data[key],
                  ...tempData,
                },
              ];
            }
          }

          if (isFirstMount) {
            getFilledDocument(filteredResponse);
          } else {
            tempDropdownMenu = filteredResponse?.filter((item) => {
              return tempSelectedDocumentTitle?.indexOf(item.title) === -1;
            });
            setDropdownMenu(tempDropdownMenu);
          }
        } else {
          handleNotification({
            isOpen: true,
            message: response?.errors[0],
          });
        }
        setIsLoadingDropdown(false);
      }
    } catch (error) {
      if (isErrorWithMessage(error)) {
        actions.closeLoadingOverlay();
        handleNotification({
          isOpen: true,
          message:
            error?.response?.data &&
            error?.response?.data?.errors &&
            error?.response?.data?.errors?.length > 0
              ? error?.response?.data?.errors[0]
              : error.message,
        });
      }
    }
  };

  const fetchBoostStatus = async () => {
    try {
      let response: {
        data?: {
          bank_status: { status: string }[];
          bpjs_status: string;
        };
        errors?: string[];
      } = {};

      switch (partner) {
        case 'linkaja':
          response = await boostStatusPartnership();
          break;
        default:
          response = await boostStatusJ1();
          break;
      }

      const responseData = response?.data;

      if (response?.errors?.length === 0) {
        setBoostInfo({
          bankStatus: responseData?.bank_status,
          bpjsStatus: responseData?.bpjs_status,
        });

        if (datas?.webView?.indexForm !== undefined) {
          const tempSelectedDocument = selectedDocument;
          const document = selectedDocument[datas?.webView?.indexForm];
          const status =
            document.title === 'Informasi Bank'
              ? responseData?.bank_status
              : responseData?.bpjs_status;

          tempSelectedDocument[datas?.webView?.indexForm] = {
            ...selectedDocument[datas?.webView?.indexForm],
            status: status,
          };

          checkSelectedForm(datas.webView.indexForm);

          if (
            document.type === 'selected' &&
            dropdownMenu?.length > 0 &&
            selectedDocument?.length < 4 &&
            ((responseData?.bpjs_status === 'Verified' &&
              document.name === 'Informasi BPJS') ||
              (typeof document?.status === 'object' &&
                (responseData?.bank_status || []).filter(
                  (item) => item.status === 'Verified',
                )?.length > 0))
          ) {
            setNewField(tempSelectedDocument);
          } else {
            setSelectedDocument([...tempSelectedDocument]);
          }
        }
        setShowDialogWebView(false);
      } else {
        handleNotification({
          isOpen: true,
          message: response.errors && response.errors[0],
        });
      }

      fetchDropdownMenu();
      actions.closeLoadingOverlay();
    } catch (error) {
      if (isErrorWithMessage(error)) {
        actions.closeLoadingOverlay();
        handleNotification({
          isOpen: true,
          message:
            error?.response?.data &&
            error?.response?.data?.errors &&
            error?.response?.data?.errors?.length > 0
              ? error?.response?.data?.errors[0]
              : error.message,
        });
      }
    }
  };

  const handleShowDialogWebView = async () => {
    await fetchBoostStatus();
  };

  const handleScrollFormDialog = (value: UIEvent<HTMLDivElement>) => {
    if ((value?.target as HTMLElement).scrollTop > 30) {
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

  const handleSelect = (object: IHandleSelect, index: number) => {
    const tempSelectedDocument: any = selectedDocument;

    if (object.type === 'photo') {
      tempSelectedDocument[index] = {};
    }

    tempSelectedDocument[index] = {
      ...selectedDocument[index],
      ...object,
    };

    if (
      object.type === 'selected' &&
      dropdownMenu?.length > 0 &&
      selectedDocument?.length < 4 &&
      ((boostInfo?.bpjsStatus === 'Verified' &&
        object.name === 'Informasi BPJS') ||
        (typeof object?.status === 'object' &&
          boostInfo &&
          boostInfo.bankStatus &&
          boostInfo?.bankStatus?.filter(
            (item: Record<string, string>) => item?.status === 'Verified',
          )?.length > 0))
    ) {
      setNewField(tempSelectedDocument);
    } else if (
      object.type === 'photo' &&
      dropdownMenu?.length > 0 &&
      selectedDocument?.length < 4 &&
      object.value
    ) {
      setNewField(tempSelectedDocument);
    } else {
      setSelectedDocument([...tempSelectedDocument]);
    }

    localStorage.setItem(
      'selectedDocument',
      JSON.stringify(tempSelectedDocument),
    );
    fetchDropdownMenu();
  };

  const handleSelectButton = (object: IHandleSelectButton, value: string) => {
    const data = datas?.homeScreenInfo;
    const dataAppId = data?.applications[0]?.id;
    const dataCustomerId = data?.customers[0]?.id;
    const urlBank = `${process.env.REACT_APP_BANK_SCRAPE_URL}${datas?.token}/${dataAppId}?bank=${value}&type=${partner}_home`;
    const urlBPJS = `${process.env.REACT_APP_BPJS_URL}web_${partner}_home/${dataCustomerId}/${dataAppId}/`;
    handleShowDialogForm(false);
    setShowDialogInfo(false);
    if (object.name === 'Informasi Bank') {
      window.location.assign(urlBank);
    } else if (object.name === 'Informasi BPJS') {
      window.location.assign(urlBPJS);
    }
    fetchDropdownMenu();
  };

  const handleClickDynamicFormTakePhoto = ({
    index,
    status,
    position,
    data,
  }: IHandleClickDynamicFormTakePhoto) => {
    if (status === 'Take Picture') {
      if (!disableAllFormTakePhoto) {
        const tempCamera = {
          position: position,
          name: data.name,
          title: data.title,
          type: data.type,
        };
        setSelectedIndexPhoto(index);
        setLoadingPhotoIndex(index);
        setCamera(tempCamera);

        localStorage.setItem('camera', JSON.stringify(tempCamera));
        localStorage.setItem('photoIndex', String(index));

        if (position === 'BackCamera') {
          actions.setState('isPhotoDialogShown', true);
        } else {
          actions.setState('isSelfiePhotoDialogShown', true);
        }
        actions.openLoadingOverlay();
      } else {
        handleNotification({
          isOpen: true,
          message: 'Mohon tunggu hingga proses upload foto selesai.',
        });
      }
    }
  };

  const handleSubmitPhoto = async (value: any) => {
    const { image, index = selectedIndexPhoto, type, name } = value;

    try {
      const tempSelectedDocument: any = selectedDocument;
      const convertedFile = convertDataURLtoFile(image, `${Math.random()}.jpg`);
      const formData = new FormData();

      setDisableAllFormTakePhoto(true);
      formData.append('upload', convertedFile);
      formData.append('image_type', name);
      formData.append('image_source', utils.store.get('applicationId') || '');

      let response: IResponse = {};
      switch (partner) {
        case 'linkaja':
          response = await uploadImagePartnership(formData);
          break;
        default:
          response = await uploadImageJ1(formData);
          break;
      }

      if (response?.id || response?.data?.image_id) {
        if (
          // if true then change data based on index and add new object
          dropdownMenu?.length > 0 &&
          !selectedDocument[index + 1]
        ) {
          if (convertedFile === '') {
            actions.closeLoadingOverlay();
            alert(datas.cameraAllowError);
          } else {
            tempSelectedDocument[index] = {
              ...selectedDocument[index],
              value: image,
              type: type,
            };

            localStorage.removeItem('selectedDocument');
            setNewField(tempSelectedDocument);
            setLoadingPhotoIndex(null);
            actions.closeLoadingOverlay();

            setIsShowToolTip(true);
          }
        } else {
          // if false then change data based on index
          if (convertedFile === '') {
            actions.closeLoadingOverlay();
            alert(datas.cameraAllowError);
          } else {
            tempSelectedDocument[index] = {
              ...selectedDocument[index],
              value: image,
              type: type,
            };
            setSelectedDocument([...tempSelectedDocument]);
            actions.closeLoadingOverlay();
          }
        }

        fetchDropdownMenu();
        setDisableAllFormTakePhoto(false);
        setLoadingPhotoIndex(null);
      } else {
        handleNotification({
          isOpen: true,
          message: response?.errors[0],
        });
      }

      actions.closeLoadingOverlay();
    } catch (error) {
      if (isErrorWithMessage(error)) {
        actions.closeLoadingOverlay();
        handleNotification({
          isOpen: true,
          message:
            error?.response?.data &&
            error?.response?.data?.errors &&
            error?.response?.data?.errors?.length > 0
              ? error?.response?.data?.errors[0]
              : error.message,
        });
      }
    }

    setCamera((prev) => ({ ...prev, position: '' }));
  };

  const handleSentForm = async ({
    disabled,
    action,
  }: {
    disabled: boolean;
    action: CardCaseType;
  }) => {
    if (!disabled) {
      try {
        setLoadingSentForm(true);
        let response: any = {};
        switch (partner) {
          case 'linkaja':
            response = await submitMandatoryFormPartnership();
            break;
          default:
            response = await submitMandatoryFormJ1();
            break;
        }

        if (response.data.success === true) {
          const tempCardCase = cardCase(action);
          setDialogData(tempCardCase);
          handleShowDialogForm(false);
          setShowDialogInfo(true);
          setLoadingSentForm(false);
          handleSentDialogForm(true);
          actions.closeLoadingOverlay();
        }
      } catch (error) {
        if (isErrorWithMessage(error)) {
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
    const status = selectedDocument?.map((item: Record<string, string>) => {
      if (item?.name === 'Informasi Bank') {
        const statBank =
          boostInfo &&
          boostInfo.bankStatus &&
          boostInfo.bankStatus?.filter((item) => item?.status === 'Verified');
        return statBank?.length === 0 ? '' : statBank;
      } else if (item?.name === 'Informasi BPJS') {
        return boostInfo?.bpjsStatus === 'Verified'
          ? boostInfo?.bpjsStatus
          : '';
      } else {
        return item?.value ? item?.value : '';
      }
    });

    return status?.filter((item: string) => item !== '')?.length > 0
      ? false
      : true;
  };

  const FormInput = ({
    data,
    idx,
  }: {
    data: { name?: string; title?: string; status?: Record<string, string>[] };
    idx: number;
  }) => {
    switch (data?.title) {
      case 'Informasi Bank':
        return (
          <Wrapper>
            <Row className={cx(my3)}>
              {data?.status?.map(
                (item: Record<string, string>, index: number) => (
                  <Col
                    xs='6'
                    sm='6'
                    key={index}
                    padding={`8px ${index % 2 === 0 ? '8px' : '0px'} 8px ${
                      index % 2 === 1 ? '8px' : '0px'
                    }`}
                  >
                    <Button
                      fluid
                      backgroundColor={
                        'linear-gradient(to top, #ffffff, #f5f5f5)'
                      }
                      borderColor={'#e3e7ea'}
                      padding={'10px 20px'}
                      className={`${
                        boostInfo &&
                        boostInfo.bankStatus &&
                        boostInfo.bankStatus[index]?.status === 'Verified' &&
                        boostInfo?.bankStatus[index]?.bank_name ===
                          item?.bank_name &&
                        opacity(0.5)
                      } ${
                        boostInfo?.bankStatus?.filter(
                          (item: Record<string, string>) =>
                            item?.status === 'Verified',
                        )?.length && cursorDefault
                      } ${positionRelative}`}
                      onClick={() => handleSelectButton(data, item?.bank_name)}
                      disabled={item?.status === 'Verified'}
                    >
                      <Img
                        src={iconChecked}
                        alt={`Selected ${item?.bank_name}`}
                        className={`${imgChecklist(
                          (boostInfo &&
                            boostInfo?.bankStatus &&
                            boostInfo?.bankStatus[index]?.status ===
                              'Verified' &&
                            boostInfo?.bankStatus[index]?.bank_name ===
                              item?.bank_name) ||
                            false,
                        )}`}
                      />
                      <Img
                        src={item?.image}
                        alt={`Logo ${item?.bank_name}`}
                        width={'60px'}
                        height={'18px'}
                      />
                    </Button>
                  </Col>
                ),
              )}
              {!boostInfo?.bankStatus?.filter(
                (item: Record<string, string>) => item.status === 'Verified',
              )?.length && (
                <Col className={cx(my3)}>
                  <Card
                    rounded
                    padding={'16px'}
                    backgroundColor={'#f3fcff'}
                    className={cx(border('1px dashed #00acf0'))}
                  >
                    <Div
                      className={cx(
                        text({ size: 14, color: '#00acf0', weight: 'bold' }),
                      )}
                    >
                      Info Penting
                    </Div>
                    <Div
                      className={cx(text({ size: 14, color: '#00acf0' }), mt2)}
                    >
                      Tolong masukkan data akun rekening bank yang terdaftar
                      sebagai sarana penyaluran gaji karyawan ataupun
                      penghasilan lainnya.
                    </Div>
                  </Card>
                </Col>
              )}
            </Row>
          </Wrapper>
        );
      case 'Informasi BPJS':
        return (
          <Div className={cx(padding('8px 0px'), positionRelative)}>
            <Button
              fluid
              backgroundColor={'linear-gradient(to top, #ffffff, #f5f5f5)'}
              borderColor={'#e3e7ea'}
              padding={'10px 20px'}
              className={cx(
                { [opacity(0.5)]: boostInfo?.bpjsStatus === 'Verified' },
                positionRelative,
                mt3,
              )}
              onClick={() =>
                boostInfo?.bpjsStatus !== 'Verified' &&
                handleSelectButton(data, 'bpjs')
              }
            >
              <Img
                src={iconChecked}
                alt={'Selected BPJS'}
                className={cx({
                  [imgChecklist(true)]: boostInfo?.bpjsStatus === 'Verified',
                  [imgChecklist(false)]: boostInfo?.bpjsStatus !== 'Verified',
                })}
              />
              <Img
                src={logoBPJS}
                alt={'Logo BPJS'}
                width={'60px'}
                height={'18px'}
              />
            </Button>
            {boostInfo?.bpjsStatus !== 'Verified' && (
              <Card
                rounded
                padding={'16px'}
                backgroundColor={'#f3fcff'}
                className={cx(border('1px dashed #00acf0'), my4)}
              >
                <Div className={cx(text({ size: 14, color: '#00acf0' }))}>
                  Tolong masukkan data akun rekening bank yang terdaftar sebagai
                  sarana penyaluran gaji karyawan ataupun penghasilan lainnya.
                </Div>
              </Card>
            )}
          </Div>
        );
      case 'Slip Gaji':
        return (
          <FormTakePhoto
            type='back'
            isLoading={loadingPhotoIndex === idx}
            image={selectedDocument[idx].value}
            onClick={() =>
              handleClickDynamicFormTakePhoto({
                position: 'BackCamera',
                index: idx,
                data: data,
                name: data.name,
                status: 'Take Picture',
              })
            }
          />
        );
      case 'Mutasi Rekening':
        return (
          <FormTakePhoto
            type='back'
            isLoading={loadingPhotoIndex === idx}
            image={selectedDocument[idx].value}
            onClick={() =>
              handleClickDynamicFormTakePhoto({
                position: 'BackCamera',
                index: idx,
                data: data,
                name: data.name,
                status: 'Take Picture',
              })
            }
          />
        );
      case 'salary_status':
        return (
          <FormTakePhoto
            type='back'
            isLoading={loadingPhotoIndex === idx}
            image={selectedDocument[idx].value}
            onClick={() =>
              handleClickDynamicFormTakePhoto({
                position: 'BackCamera',
                index: idx,
                data: data,
                name: data.name,
                status: 'Take Picture',
              })
            }
          />
        );
      case 'ktp':
        return (
          <FormTakePhoto
            type='back'
            isLoading={loadingPhotoIndex === idx}
            image={selectedDocument[idx].value}
            onClick={() =>
              handleClickDynamicFormTakePhoto({
                position: 'BackCamera',
                index: idx,
                data: data,
                name: data.name,
                status: 'Take Picture',
              })
            }
          />
        );
      case 'selfie':
        return (
          <FormTakePhoto
            type='front'
            isLoading={loadingPhotoIndex === idx}
            image={selectedDocument[idx].value}
            onClick={() =>
              handleClickDynamicFormTakePhoto({
                position: 'FrontCamera',
                index: idx,
                data: data,
                name: data.name,
                status: 'Take Picture',
              })
            }
          />
        );
      case 'ktp_self':
        return (
          <FormTakePhoto
            type='back'
            isLoading={loadingPhotoIndex === idx}
            image={selectedDocument[idx].value}
            onClick={() =>
              handleClickDynamicFormTakePhoto({
                position: 'BackCamera',
                index: idx,
                data: data,
                nawme: data.name,
                status: 'Take Picture',
              })
            }
          />
        );
      default:
        return null;
    }
  };

  FormInput.propTypes = {
    data: PropTypes.object,
    idx: PropTypes.number,
  };

  const handleClickInformation = () => {
    setIsShowInformation(true);
  };

  useEffect(() => {
    if (isShowInformation) {
      const informationTimeout = setTimeout(() => {
        setIsShowInformation(false);
      }, 3000);
      return () => {
        clearTimeout(informationTimeout);
      };
    }

    if (isShowToolTip) {
      const toolTipTimeout = setTimeout(() => {
        setIsShowToolTip(false);
      }, 3000);
      return () => {
        clearTimeout(toolTipTimeout);
      };
    }
  }, [isShowInformation, isShowToolTip]);

  useEffect(() => {
    if (showDialogForm) {
      setIsLoadingDropdown(true);
      fetchBoostStatus();
      if (backCameraState === 'yes' || frontCameraState === 'yes') {
        setShowDialogInfo(false);
        setLoadingPhotoIndex(null);
        setSelectedIndexPhoto(null);

        if (localStorage.getItem('fntcam') === 'yes') {
          localStorage.removeItem('fntcam');
        } else {
          localStorage.removeItem('bkcam');
        }
        localStorage.removeItem('camera');
        localStorage.removeItem('photoIndex');
      }
    }
  }, [showDialogForm]);

  const Information = () => {
    return isShowInformation ? (
      <Div
        className={cx(
          bottom('60%'),
          padding('0px 24px'),
          positionAbsolute,
          textCenter,
        )}
      >
        <Div
          className={cx(
            background('rgba(94, 94, 94, 0.85)'),
            borderRadiusAll('5px'),
            mb3,
            opacity(0.85),
            padding('16px'),
            text({ size: 14, color: 'white' }),
            w100,
          )}
        >
          Dengan melengkapi lebih banyak Bukti Penghasilan, Anda bisa
          mendapatkan peluang pinjaman disetujui lebih besar
        </Div>
      </Div>
    ) : null;
  };

  const ToolTip = () => {
    return isShowToolTip ? (
      <Div className={cx(positionAbsolute, textCenter, top('-70%'))}>
        <Div
          className={cx(
            background('rgba(94, 94, 94, 0.85)'),
            borderRadiusAll('4px'),
            padding('10px 15px'),
            text({ size: 12, color: 'white' }),
          )}
        >
          Gambar berhasil terkirim
        </Div>
      </Div>
    ) : null;
  };

  return (
    <Dialog
      baseColor={`#000`}
      clickOutside={true}
      padding={'0px 0px 24px 0px'}
      margin={'0px'}
      position={'bottom'}
      getShow={handleShowDialogForm}
      show={showDialogForm}
      type={'form'}
    >
      <Div
        ref={contentElement}
        className={cx(
          { [boxShadowThin]: isScrollFormDialog },
          textCenter,
          transition('box-shadow 0.3s'),
        )}
      >
        <Div // Button escape dialog form
          className={cx(cursorPointer, height('30px'), positionRelative)}
          onClick={() => handleClickCloseFormDialog()}
        >
          <Div
            className={cx(
              background('#ddd'),
              positionAbsolute,
              translateCenter,
              widthHeight('84px', '3px'),
            )}
          />
        </Div>
        <Div
          className={cx(text({ size: 18, color: '#5e5e5e', weight: 'bold' }))}
        >
          {dialogData?.dialogForm?.title?.text}
        </Div>
        <Div
          className={cx(
            background('#f3fcff'),
            mt4,
            padding('15px 24px'),
            text({ size: 14, color: '#00acf0', align: 'left' }),
          )}
        >
          {dialogData?.dialogForm?.message?.text}
        </Div>
      </Div>
      <Div
        className={cx(
          height(`calc(100% - ${contentElement?.current?.offsetHeight}px)`),
          padding('24px 24px 150px 24px'),
          overflowYAuto,
        )}
        onScroll={handleScrollFormDialog}
      >
        {dialogData?.dialogForm?.type === 'dropdown' &&
          selectedDocument?.map(
            (item: Record<string, string>, index: number) => (
              <Div
                key={index}
                className={cx(
                  {
                    [borderBottom('1px solid #e0e0e0')]:
                      index + 1 < selectedDocument?.length,
                  },
                  mb4,
                  positionRelative,
                )}
              >
                <Div
                  className={cx(
                    alignCenter,
                    dFlex,
                    justifyBetween,
                    mb3,
                    text({ size: 18, color: '#5e5e5e', weight: 'bold' }),
                  )}
                >
                  <Div>
                    <span className={cx(text({ size: 18, color: '#5e5e5e' }))}>
                      {index === 0
                        ? dialogData?.dialogForm?.titleMenuMandatory
                        : dialogData?.dialogForm?.titleMenuOptional}
                    </span>
                    <span
                      className={cx(
                        { [dNone]: index === 0 },
                        ml2,
                        text({ size: 12, color: 'rgba(94, 94, 94, 0.5)' }),
                      )}
                    >
                      (Tidak Wajib)
                    </span>
                    <Img
                      className={cx(
                        { [dNone]: !checkSelectedForm(index) },
                        ml2,
                      )}
                      src={iconThumbsUp}
                      alt='Thumbs Up'
                    />
                  </Div>
                  {!!index && (
                    <Div
                      className={cx(cursorPointer)}
                      onClick={() => handleClickInformation()}
                    >
                      <Img src={iconInformation} alt='information' />
                    </Div>
                  )}
                </Div>
                <Dropdown
                  key={index}
                  isLoading={isLoadingDropdown}
                  disabled={
                    checkSelectedForm(index) || loadingPhotoIndex === index
                  }
                  options={dropdownMenu}
                  onSelect={(e) => handleSelect(e, index)}
                  placeholder={item?.title || 'Pilih Dokumen'}
                />
                <FormInput data={item} idx={index} />
              </Div>
            ),
          )}
      </Div>
      <Div
        className={cx(
          bottom('0px'),
          dFlex,
          justifyCenter,
          padding('0px 24px'),
          positionAbsolute,
          w100,
          zIndex(2),
        )}
      >
        <Information />
        <ToolTip />
        <Button
          fluid
          className={cx(
            borderRadiusBottomNone,
            borderNone,
            minHeight(48),
            padding('11px'),
            text({ size: 16 }),
          )}
          disabled={checkForm()}
          onClick={() =>
            handleSentForm({
              disabled: checkForm(),
              action: dialogData?.dialogForm?.button?.action || 'webpage',
            })
          }
        >
          {loadingSentForm ? (
            <Img src={loading} width='25px' height='25px' />
          ) : (
            dialogData?.dialogForm?.button?.text
          )}
        </Button>
      </Div>

      <DialogWebView
        url={datas?.webView?.url}
        handleShowDialogWebView={handleShowDialogWebView}
        showDialogWebView={showDialogWebView}
      />

      {camera.position === 'BackCamera' && (
        <BackCameraUniversal
          name={`${camera.title}`}
          type={`${camera.type}`}
          onCancel={() => {
            setLoadingPhotoIndex(null),
              localStorage.removeItem('selectedDocument'),
              actions.setState('isPhotoDialogShown', false);
          }}
          onImageSubmitted={(imageBase64) =>
            handleSubmitPhoto({
              image: imageBase64,
              name: camera.name,
              type: camera.type,
              status: 'Take Picture',
            })
          }
        />
      )}
    </Dialog>
  );
};

export default DialogForm;
