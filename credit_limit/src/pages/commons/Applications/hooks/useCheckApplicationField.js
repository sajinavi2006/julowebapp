import utils from 'utils';
import { listedLongformField } from 'constant';

const useCheckApplicationField = () => {
  const partner = utils.store.get('partner');

  const getFields = () => {
    const fields = {
      disabledFields: [],
      hiddenFields: [],
    };
    switch (partner) {
      case 'linkaja':
        fields.disabledFields = listedLongformField?.linkaja?.disable;
        fields.hiddenFields = listedLongformField?.linkaja?.hide;
        break;
      case 'rentee':
        fields.disabledFields = listedLongformField?.rentee?.disable;
        fields.hiddenFields = listedLongformField?.rentee?.hide;
        break;

      case 'paylater':
        fields.disabledFields = listedLongformField?.paylater?.disable;
        fields.hiddenFields = listedLongformField?.paylater?.hide;
        break;

      default:
        fields.disabledFields = listedLongformField?.j1?.disable;
        fields.hiddenFields = listedLongformField?.j1?.hide;
        break;
    }
    return fields;
  };

  const isFieldDisabled = (name) => {
    const isDisabled = getFields().disabledFields.includes(name);
    return isDisabled;
  };

  const isFieldHidden = (name) => {
    const ishided = getFields().hiddenFields.includes(name);
    
    return ishided;
  };

  return {
    isFieldDisabled,
    isFieldHidden,
  };
};

export default useCheckApplicationField;
