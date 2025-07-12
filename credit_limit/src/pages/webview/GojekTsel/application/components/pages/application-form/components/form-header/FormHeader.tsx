import { formHeaderCx } from './styles';

const FormHeader = () => {
  return (
    <div css={formHeaderCx} className='form-header'>
      <p className='form-header-title'>
        Daftar Program Cicilan Paket HP Telkomsel
      </p>
      <p className='form-header-sub-title'>
        Yuk, isi form dibawah untuk daftar program ini!
      </p>
    </div>
  );
};

export default FormHeader;
