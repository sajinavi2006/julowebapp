import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import guidance from '../../assets/img/guidance_photo.png';

import { BottomSheetProps } from './type';

const PhotoUploadGuidance = (props: BottomSheetProps) => {
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={6}
      style={{
        padding: props.padding
          ? parseInt(props.padding) > 0
            ? props.padding
            : 16
          : 0,
        cursor: 'pointer',
      }}
    >
      <Drawer
        className='guidance'
        anchor='bottom'
        open={props.open}
        onClick={(e) => {
          props.onClose(e);
        }}
      >
        <div className='center-align-photo-div'>
          <div
            style={{
              marginLeft: 5,
              marginTop: 15,
              marginRight: 5,
              width: '96%',
              textAlign: 'center',
              cursor: 'pointer',
            }}
            className='photoUploadHeader'
          >
            Petunjuk upload foto KTP
          </div>
          <div style={{ width: '100%', paddingTop: '10px', cursor: 'pointer' }}>
            <Divider />
          </div>
          <div
            style={{
              marginTop: 5,
              width: '100%',
              textAlign: 'center',
              cursor: 'pointer',
              paddingTop: '10px',
            }}
          >
            <img src={guidance} alt='guidance' />
          </div>
          <div
            style={{
              marginTop: 15,
              width: '100%',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <div className='photoUploadLabel1'>Petunjuk upload foto KTP</div>
          </div>
          <div
            style={{
              paddingTop: '15px',
              width: '100%',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <div className='photoUploadLabel2'>
              1. Pastikan KTP yang diunggah jelas dan sesuai dengan identitas
              kamu.
            </div>
          </div>
          <div
            style={{
              paddingTop: '8px',
              width: '100%',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <div className='photoUploadLabel2'>
              2. Jangan sampai foto yang diunggah terpotong atau kurang jelas.
            </div>
          </div>
          <div
            style={{
              paddingTop: '8px',
              paddingBottom: '30px',
              width: '100%',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <div className='photoUploadLabel2'>
              3. Pastikan KTP yang kamu unggah masih berlaku
            </div>
          </div>
        </div>
      </Drawer>
    </Grid>
  );
};

export default PhotoUploadGuidance;
