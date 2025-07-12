import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import useGlobalState from '../../../../actions';
import { useUserContext } from 'providers/UserProvider';

import { BANK_LIST, cardCase } from '../../../../constant';

import { imgChecklist } from '../styles';
import { Button, Card, Col, Row, Wrapper } from '../../../../assets/css/styled';
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
  textWhite,
  boxShadowThin,
  dNone,
  ml2,
  w100,
  borderNone,
  borderRadiusBottomNone,
  mb4,
  textLeft,
  my4,
  justifyCenter,
  cursorDefault,
} from '../../../../assets/css/stylesFix';
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
  opacity,
  padding,
  top,
  transition,
  widthHeight,
  zIndex,
} from '../../../../assets/css/stylesValue';

import iconChecked from '../../../assets/img/icon/ic-checked.svg';
import iconThumbsUp from '../../../assets/img/icon/ic-thumbs_up.svg';
import iconInformation from '../../../assets/img/icon/ic-information.svg';

import logoBPJS from '../../../assets/img/logo/BPJS.png';

import loading from '../../../assets/img/loading.gif';

import BackCameraUniversal from '../../../../components/BackCameraUniversal';
import FrontCameraUniversal from '../../../../components/FrontCameraUniversal';
import Dialog from '../../../../components/Dialog';
import Dropdown from '../../../../components/Dropdown';
import FormTakePhoto from '../../../../components/FormTakePhoto';
import DialogWebView from '../../../../components/Dialog/DialogWebView';

import {
  submitMandatoryForm,
  boostStatus,
  boostOption,
  uploadImage,
} from '../../../../services/form';
import utils from '../../../../utils';

const DialogForm = ({
  dialogData,
  handleShowDialogForm,
  handleSentDialogForm,
  setDialogData,
  setShowDialogInfo,
  showDialogForm,
}) => {
  const { datas, convertDataURLtoFile, handleNotification } = useUserContext();
  const [, actions] = useGlobalState();
  const { partner } = useParams();
  const [isFirstMount, setIsFirstMount] = useState(true);
  const [isScrollFormDialog, setIsScrollFormDialog] = useState(false);
  const [dropdownMenu, setDropdownMenu] = useState([]);
  const [boostInfo, setBoostInfo] = useState({});
  const [camera, setCamera] = useState({
    type: '',
    name: '',
  });
  const [isShowInformation, setIsShowInformation] = useState(false);
  const [isShowToolTip, setIsShowToolTip] = useState(false);
  const [loadingPhotoIndex, setLoadingPhotoIndex] = useState(null);
  const [loadingSentForm, setLoadingSentForm] = useState(false);
  const [showDialogWebView, setShowDialogWebView] = useState(false);
  const [selectedIndexPhoto, setSelectedIndexPhoto] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState([
    {
      id: '',
      title: '',
      type: '',
      value: '',
    },
  ]);
  const contentElement = useRef(null);

  const setNewField = (data) => {
    if (data?.length < 4) {
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
    } else {
      setSelectedDocument(data);
    }
  };

  const getFilledDocument = (data) => {
    let tempDropdownMenu = [];

    const filledDocument = data.filter(
      (item) =>
        (item.type === 'photo' && item.value) ||
        (item.type === 'selected' &&
          item.name === 'Informasi BPJS' &&
          item.status === 'Verified') ||
        (item.type === 'selected' &&
          item.name === 'Informasi Bank' &&
          item.status.filter((value) => value.status === 'Verified').length),
    );
    // if (filledDocument.length) {
    //     setNewField(filledDocument);
    // } else {
    // };
    setNewField(filledDocument);
    const tempData = filledDocument.map((item) => item.title);
    tempDropdownMenu = data.filter((item) => {
      return tempData.indexOf(item.title) === -1;
    });
    setDropdownMenu(tempDropdownMenu);
    setIsFirstMount(false);
  };

  const fetchDropdownMenu = async () => {
    const appStatus = utils.store.get('appStatus');
    try {
      if (appStatus == '106' || appStatus == '105') {
        const response = await boostOption();

        if (response?.errors?.length === 0) {
          let filteredResponse = [];
          let tempDropdownMenu = [];
          const tempSelectedDocumentTitle = selectedDocument.map(
            (item) => item.title,
          );
          for (const [key, value] of Object.entries(response.data)) {
            if (key !== 'credit_score' && value.enable) {
              let tempData;
              switch (key) {
                case 'bank_status':
                  tempData = {
                    title: 'Informasi Bank',
                    type: 'selected',
                    status: value.status.map((item) => ({
                      ...item,
                      image: BANK_LIST.filter(
                        (bank) => bank.name === item.bank_name,
                      ).map((obj) => obj.image)[0],
                    })),
                    name: 'Informasi Bank',
                  };
                  break;
                case 'bpjs_status':
                  tempData = {
                    title: 'Informasi BPJS',
                    type: 'selected',
                    status: value.status,
                    name: 'Informasi BPJS',
                  };
                  break;
                case 'bank_statement_status':
                  tempData = {
                    title: 'Mutasi Rekening',
                    type: 'photo',
                    name: 'bank_statement',
                    value: value.image.image_url_api,
                  };
                  break;
                case 'salary_status':
                  tempData = {
                    title: 'Slip Gaji',
                    type: 'photo',
                    name: 'paystub',
                    value: value.image.image_url_api,
                  };
                  break;
                default:
                  break;
              }

              filteredResponse = [
                ...filteredResponse,
                {
                  ...value,
                  ...tempData,
                },
              ];
            }
          }

          if (isFirstMount) {
            getFilledDocument(filteredResponse);
          } else {
            tempDropdownMenu = filteredResponse.filter((item) => {
              return tempSelectedDocumentTitle.indexOf(item.title) === -1;
            });
            setDropdownMenu(tempDropdownMenu);
          }
        } else {
          handleNotification({ isOpen: true, message: response?.errors[0] });
        }
      }
    } catch (error) {
      if (error) {
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

  const checkSelectedForm = (index) => {
    const formItem = selectedDocument[index];
    if (formItem.name === 'Informasi Bank') {
      const statBank = selectedDocument[index].status.filter(
        (item) => item?.status === 'Verified',
      );
      return statBank.length > 0 ? true : false;
    } else if (selectedDocument[index].name === 'Informasi BPJS') {
      return formItem.status === 'Verified' ? true : false;
    } else {
      return formItem.value ? true : false;
    }
  };

  const fetchBoostStatus = async () => {
    try {
      const response = await boostStatus();
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
            dropdownMenu.length > 0 &&
            selectedDocument.length < 4 &&
            ((responseData?.bpjs_status === 'Verified' &&
              document.name === 'Informasi BPJS') ||
              (typeof document?.status === 'object' &&
                responseData?.bank_status.filter(
                  (item) => item?.status === 'Verified',
                ).length > 0))
          ) {
            setNewField(tempSelectedDocument);
          } else {
            setSelectedDocument([...tempSelectedDocument]);
          }
        }
        setShowDialogWebView(false);
      } else {
        handleNotification({ isOpen: true, message: response?.errors[0] });
      }
      fetchDropdownMenu();
      actions.closeLoadingOverlay();
    } catch (error) {
      if (error) {
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

  const handleScrollFormDialog = (value) => {
    value?.target.scrollTop > 30
      ? setIsScrollFormDialog(true)
      : setIsScrollFormDialog(false);
  };

  const handleClickCloseFormDialog = () => {
    handleShowDialogForm(false);
  };

  const handleSelect = (object, index) => {
    let tempSelectedDocument = selectedDocument;

    if (object.type === 'photo') {
      tempSelectedDocument[index] = {};
    }

    tempSelectedDocument[index] = {
      ...selectedDocument[index],
      ...object,
    };

    if (
      object.type === 'selected' &&
      dropdownMenu.length > 0 &&
      selectedDocument.length < 4 &&
      ((boostInfo.bpjsStatus === 'Verified' &&
        object.name === 'Informasi BPJS') ||
        (typeof object?.status === 'object' &&
          boostInfo.bankStatus.filter((item) => item?.status === 'Verified')
            .length > 0))
    ) {
      setNewField(tempSelectedDocument);
    } else if (
      object.type === 'photo' &&
      dropdownMenu.length > 0 &&
      selectedDocument.length < 4 &&
      object.value
    ) {
      setNewField(tempSelectedDocument);
    } else {
      setSelectedDocument([...tempSelectedDocument]);
    }

    fetchDropdownMenu();
  };

  const handleSelectButton = (object, value) => {
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
  }) => {
    if (status === 'Take Picture') {
      setCamera({
        position: position,
        name: data.name,
        type: data.type,
      });
      setLoadingPhotoIndex(index);
      setSelectedIndexPhoto(index);

      if (position === 'BackCamera') {
        actions.setState('isPhotoDialogShown', true);
      } else {
        actions.setState('isPhotoDialogShown', true);
      }
      actions.openLoadingOverlay();
    }
    actions.closeLoadingOverlay();
    fetchDropdownMenu();
  };

  const handleSubmitPhoto = async (value) => {
    const { image, index = selectedIndexPhoto, type, name } = value;

    try {
      const tempSelectedDocument = selectedDocument;
      const convertedFile = convertDataURLtoFile(
        image,
        `${Math.random(10)}.jpg`,
      );
      const formData = new FormData();

      formData.append('upload', convertedFile);
      formData.append('image_type', name);
      formData.append('image_source', utils.store.get('applicationId'));

      const response = await uploadImage(formData);

      if (response?.id) {
        if (
          // if true then change data based on index and add new object
          dropdownMenu.length > 0 &&
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
        setLoadingPhotoIndex(null);
      } else {
        handleNotification({
          isOpen: true,
          message: response?.errors[0],
        });
      }

      actions.closeLoadingOverlay();
    } catch (error) {
      if (error) {
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

  const handleSentForm = async ({ status, action }) => {
    if (status) {
      try {
        setLoadingSentForm(true);
        const response = await submitMandatoryForm();

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
    const status = selectedDocument.map((item) => {
      if (item?.name === 'Informasi Bank') {
        const statBank = boostInfo.bankStatus.filter(
          (item) => item?.status === 'Verified',
        );
        return statBank.length === 0 ? '' : statBank;
      } else if (item?.name === 'Informasi BPJS') {
        return boostInfo.bpjsStatus === 'Verified' ? boostInfo.bpjsStatus : '';
      } else {
        return item?.value ? item?.value : '';
      }
    });

    return status.filter((item) => item !== '').length > 0 ? true : false;
  };

  const FormInput = ({ data, idx }) => {
    switch (data?.title) {
      case 'Informasi Bank':
        return (
          <Wrapper>
            <Row className={`${my3}`}>
              {data?.status.map((item, index) => (
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
                    backgroundColor={`linear-gradient(to top, #ffffff, #f5f5f5)`}
                    borderColor={'#e3e7ea'}
                    padding={`10px 20px`}
                    className={`${
                      boostInfo.bankStatus[index].status === 'Verified' &&
                      boostInfo.bankStatus[index].bank_name ===
                        item?.bank_name &&
                      opacity(0.5)
                    } ${
                      boostInfo?.bankStatus.filter(
                        (item) => item?.status === 'Verified',
                      )?.length && cursorDefault
                    } ${positionRelative}`}
                    onClick={() =>
                      handleSelectButton(data, item?.bank_name, idx)
                    }
                    disabled={
                      boostInfo?.bankStatus.filter(
                        (item) => item?.status === 'Verified',
                      )?.length
                    }
                  >
                    <img
                      src={iconChecked}
                      alt={`Selected ${item?.bank_name}`}
                      className={`${imgChecklist(
                        boostInfo.bankStatus[index].status === 'Verified' &&
                          boostInfo.bankStatus[index].bank_name ===
                            item?.bank_name,
                      )}`}
                    />
                    <img
                      src={item?.image}
                      alt={`Logo ${item?.bank_name}`}
                      width={`60px`}
                      height={'18px'}
                    />
                  </Button>
                </Col>
              ))}
              {!boostInfo.bankStatus.filter(
                (item) => item.status === 'Verified',
              ).length && (
                <Col className={`${my3}`}>
                  <Card
                    rounded
                    padding={'16px'}
                    backgroundColor={'#f3fcff'}
                    className={`${border('1px dashed #00acf0')}`}
                  >
                    <div
                      className={`${fontSize(14)} ${color(
                        '#00acf0',
                      )} ${fontWeight('bold')}`}
                    >
                      Info Penting
                    </div>
                    <div
                      className={`${mt2} ${fontSize(14)} ${color('#00acf0')}`}
                    >
                      Tolong masukkan data akun rekening bank yang terdaftar
                      sebagai sarana penyaluran gaji karyawan ataupun
                      penghasilan lainnya.
                    </div>
                  </Card>
                </Col>
              )}
            </Row>
          </Wrapper>
        );
      case 'Informasi BPJS':
        return (
          <div className={`${positionRelative} ${padding('8px 0px')}`}>
            <Button
              fluid
              backgroundColor={`linear-gradient(to top, #ffffff, #f5f5f5)`}
              borderColor={'#e3e7ea'}
              padding={`10px 20px`}
              className={`${
                boostInfo.bpjsStatus === 'Verified' && opacity(0.5)
              } ${positionRelative} ${mt3}`}
              onClick={() =>
                boostInfo.bpjsStatus !== 'Verified' &&
                handleSelectButton(data, 'bpjs', idx)
              }
            >
              <img
                src={iconChecked}
                alt={'Selected BPJS'}
                className={`${imgChecklist(
                  boostInfo.bpjsStatus === 'Verified',
                )}`}
              />
              <img
                src={logoBPJS}
                alt={'Logo BPJS'}
                width={`60px`}
                height={'18px'}
              />
            </Button>
            {boostInfo.bpjsStatus !== 'Verified' && (
              <Card
                rounded
                padding={'16px'}
                backgroundColor={'#f3fcff'}
                className={`${border('1px dashed #00acf0')} ${my4}`}
              >
                <div className={`${fontSize(14)} ${color('#00acf0')}`}>
                  Tolong masukkan data akun rekening bank yang terdaftar sebagai
                  sarana penyaluran gaji karyawan ataupun penghasilan lainnya.
                </div>
              </Card>
            )}
          </div>
        );
      case 'Slip Gaji':
        return (
          <FormTakePhoto
            isLoading={loadingPhotoIndex === idx}
            image={selectedDocument[idx].value}
            onClick={() =>
              handleClickDynamicFormTakePhoto({
                position: 'BackCamera',
                index: idx,
                data: data,
                status: 'Take Picture',
              })
            }
          />
        );
      case 'Mutasi Rekening':
        return (
          <FormTakePhoto
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

  const Information = () => {
    return isShowInformation ? (
      <div
        className={`${textCenter} ${positionAbsolute} ${bottom(
          '60%',
        )} ${padding('0px 24px')}`}
      >
        <div
          className={`${w100} ${padding('16px')} ${background(
            'rgba(94, 94, 94, 0.85)',
          )} ${borderRadiusAll('5px')} ${fontSize(14)} ${opacity(
            0.85,
          )} ${mb3} ${textWhite}`}
        >
          Dengan melengkapi lebih banyak Bukti Penghasilan, Anda bisa
          mendapatkan peluang pinjaman disetujui lebih besar
        </div>
      </div>
    ) : null;
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

  useEffect(() => {
    if (showDialogForm) {
      fetchBoostStatus();
    }
  }, [showDialogForm]);

  return (
    <Dialog
      baseColor={`#000`}
      clickOutside={true}
      padding={`0px 0px 24px 0px`}
      margin={'0px'}
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
        {dialogData?.dialogForm?.type === 'dropdown' &&
          selectedDocument.map((item, index) => (
            <div
              key={index}
              className={`${positionRelative} ${mb4} ${
                index + 1 < selectedDocument.length &&
                borderBottom('1px solid #e0e0e0')
              }`}
            >
              <div
                className={`${dFlex} ${justifyBetween} ${alignCenter} ${mb3} ${color(
                  '#5e5e5e',
                )} ${fontSize(18)} ${fontWeight('bold')}`}
              >
                <div>
                  <span className={`${fontSize(18)} ${color('#5e5e5e')}`}>
                    {index === 0
                      ? dialogData?.dialogForm?.titleMenuMandatory
                      : dialogData?.dialogForm?.titleMenuOptional}
                  </span>
                  <span
                    className={`${ml2} ${index === 0 && dNone} ${fontSize(
                      12,
                    )} ${color('rgba(94, 94, 94, 0.5)')}`}
                  >
                    (Tidak Wajib)
                  </span>
                  <img
                    className={`${ml2} ${!checkSelectedForm(index) && dNone}`}
                    src={iconThumbsUp}
                    alt='Thumbs Up'
                  />
                </div>
                {!!index && (
                  <div
                    className={`${cursorPointer}`}
                    onClick={() => handleClickInformation(item?.title)}
                  >
                    <img src={iconInformation} alt='information' />
                  </div>
                )}
              </div>
              <Dropdown
                key={index}
                disabled={
                  checkSelectedForm(index) || loadingPhotoIndex === index
                }
                options={dropdownMenu}
                onSelect={(e) => handleSelect(e, index)}
                placeholder={item?.title || 'Pilih Dokumen'}
              />
              <FormInput data={item} type={item?.type} idx={index} />
            </div>
          ))}
      </div>
      <div
        className={`${w100} ${positionAbsolute} ${dFlex} ${justifyCenter} ${padding(
          `0px 24px`,
        )} ${bottom('0px')} ${zIndex(2)}`}
      >
        <Information />
        <ToolTip />
        <Button
          fluid
          className={`
                        ${borderRadiusBottomNone} ${borderNone} ${padding(
            '11px',
          )} ${minHeight(48)} ${fontSize(16)}
                        ${
                          checkForm()
                            ? `${background('#00acf0')}`
                            : `${background('#e5e5e5')}`
                        }`}
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

      <DialogWebView
        url={datas?.webView?.url}
        handleShowDialogWebView={handleShowDialogWebView}
        showDialogWebView={showDialogWebView}
      />
      {camera.position === 'BackCamera' ? (
        <BackCameraUniversal
          name={`${camera.name}`}
          type={`${camera.type}`}
          onCancel={() => setLoadingPhotoIndex(null)}
          onImageSubmitted={(imageBase64) =>
            handleSubmitPhoto({
              image: imageBase64,
              name: camera.name,
              type: camera.type,
              status: 'Take Picture',
            })
          }
        />
      ) : (
        <FrontCameraUniversal
          name={`${camera.name}`}
          type={`${camera.type}`}
          onCancel={() => setLoadingPhotoIndex(null)}
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

DialogForm.propTypes = {
  dialogData: PropTypes.object,
  handleShowDialogForm: PropTypes.func,
  handleSentDialogForm: PropTypes.func,
  setDialogData: PropTypes.func,
  setShowDialogInfo: PropTypes.func,
  showDialogForm: PropTypes.bool,
};

export default DialogForm;
