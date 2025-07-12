import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import FormTakePhoto from 'components/FormTakePhoto';
import Input from 'components/Input';
import {
  KtpSelfieUploadGuidance,
  KtpUploadGuidance,
} from 'components/Camera/DialogContent';

import { Button, Col, Div, Row } from 'assets/css/styled';
import { schemaPersonalIdentity } from '../validators';
import Camera from 'components/Camera';
import PhoneFormatCustom from 'components/forms/phone-format-custom';
import SelectOption from 'components/SelectOption';
import { useApplicationContext } from 'pages/commons/Applications/providers/ApplicationProvider';
import store from 'utils/Store';

import { ApplicationParam } from '../types';

interface ICameraState {
  show: boolean;
  position: 'front' | 'back';
  dialogData: {
    title: string;
    name: 'ktp' | 'selfie';
    content: React.ReactNode;
  };
}

const PersonalIdentity = () => {
  const {
    setLongFormData,
    longFormData,
  }: {
    setLongFormData: (data: ApplicationParam) => void;
    longFormData: Record<string, never>;
  } = useApplicationContext();

  const [dataPhoto, setDataPhoto] = useState<{ selfie: string; ktp: string }>({
    selfie: '',
    ktp: '',
  });

  const [cameraState, setCameraState] = useState<ICameraState>({
    show: false,
    position: 'front',
    dialogData: {
      name: 'ktp',
      title: 'KTP Selfie',
      content: <KtpSelfieUploadGuidance />,
    },
  });

  const history = useHistory();

  const {
    handleSubmit,
    setValue,
    reset,
    control,
    trigger,
    formState: { isValid, errors },
  } = useForm<ApplicationParam>({
    resolver: yupResolver(schemaPersonalIdentity),
    // context is using on yup schema object
    //mode 'all' to validate error onChange and onSubmit
    mode: 'all',
  });

  const storedEmail = store.get('email');

  const openCamera = (cameraPosition: 'front' | 'back') => {
    if (cameraPosition === 'front') {
      setCameraState({
        show: true,
        position: 'front',
        dialogData: {
          name: 'selfie',
          title: 'KTP Selfie',
          content: <KtpSelfieUploadGuidance />,
        },
      });
    } else if (cameraPosition === 'back') {
      setCameraState({
        show: true,
        position: 'back',
        dialogData: {
          name: 'ktp',
          title: 'KTP',
          content: <KtpUploadGuidance />,
        },
      });
    }
  };

  const handleGetImage = (img: string) => {
    setCameraState({ ...cameraState, show: false });

    if (cameraState.position === 'back') {
      setValue('ktp_image', img, { shouldValidate: true });
      setDataPhoto((prev) => ({
        ...prev,
        ktp: img,
      }));
    } else {
      setValue('selfie', img, { shouldValidate: true });
      setDataPhoto((prev) => ({
        ...prev,
        selfie: img,
      }));
    }
  };

  const onSubmit = (data: ApplicationParam) => {
    setLongFormData(data);
    history.push(`/ef-pilot/application/family_information`, {
      from: 'personal_identity',
    });
  };

  useEffect(() => {
    if (longFormData.nik) {
      reset({ ...longFormData });
      setDataPhoto((prev) => ({
        ...prev,
        ktp: longFormData.ktp_image,
        selfie: longFormData.selfie,
      }));
      trigger();
    }
    if (storedEmail) {
      setValue('email', storedEmail);
    }
  }, [longFormData]);

  return (
    <Div>
      <Div marginBottom='30px' data-testid='ktp-photo'>
        <label style={{ color: '#5e5e5e' }}>Foto KTP</label>

        <Row display='flex' justifyContent='center'>
          <Col xs='12' md='10'>
            <FormTakePhoto
              margin={'0px'}
              type='back'
              image={dataPhoto.ktp}
              onClick={() => openCamera('back')}
              style={{
                borderRadius: '10px',
              }}
              error={errors?.ktp_image?.message as string}
            />
          </Col>
        </Row>
      </Div>

      <Div marginBottom='30px' data-testid='selfie-photo'>
        <label style={{ color: '#5e5e5e' }}>Foto Selfie</label>

        <Row display='flex' justifyContent='center'>
          <Col xs='12' md='10'>
            <FormTakePhoto
              margin={'0px'}
              type='front'
              image={dataPhoto.selfie}
              onClick={() => openCamera('front')}
              style={{
                borderRadius: '10px',
              }}
              error={errors?.selfie?.message as string}
            />
          </Col>
        </Row>
      </Div>

      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, value, name } }) => (
          <Input
            name={name}
            label='Email'
            disabled
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name='nik'
        render={({
          field: { onChange, value, name },
          fieldState: { error },
        }) => (
          <Input
            name={name}
            errorMessage={error?.message}
            label='Nomor KTP'
            type='number'
            value={value}
            onChange={onChange}
            inputProps={{
              maxLength: 16,
            }}
          />
        )}
      />

      <Controller
        control={control}
        name='phone_number'
        render={({
          field: { onChange, value, name },
          fieldState: { error },
        }) => (
          <Input
            errorMessage={error?.message}
            name={name}
            placeholder='08xxxxxxxxx'
            label='Nomor HP aktif'
            value={value}
            onChange={onChange}
            inputPropsMui={{
              inputComponent: PhoneFormatCustom,
            }}
          />
        )}
      />

      <Controller
        control={control}
        name='place_of_birth'
        render={({
          field: { onChange, value, name },
          fieldState: { error },
        }) => (
          <Input
            name={name}
            errorMessage={error?.message}
            label='Tempat Lahir'
            value={value}
            onChange={onChange}
            inputProps={{
              maxLength: 50,
            }}
          />
        )}
      />

      <Controller
        control={control}
        name='gender'
        render={({
          field: { onChange, value, name },
          fieldState: { error },
        }) => (
          <SelectOption
            name={name}
            options={[
              { title: 'Laki-laki', value: 'male' },
              { title: 'Perempuan', value: 'female' },
            ]}
            renderOptions={(option) => option.title}
            label='Jenis Kelamin'
            value={value}
            onChange={onChange}
            errorMessage={error?.message}
          />
        )}
      />

      <Div textAlign='right'>
        <Button disabled={!isValid}>
          <Div width='100%' onClick={handleSubmit(onSubmit)}>
            Selanjutnya
          </Div>
        </Button>
      </Div>

      <Camera
        cameraPosition={cameraState.position}
        getImage={handleGetImage}
        getShow={() => setCameraState((prev) => ({ ...prev, show: false }))}
        show={cameraState.show}
        dialogData={cameraState?.dialogData}
      />
    </Div>
  );
};

export default PersonalIdentity;
