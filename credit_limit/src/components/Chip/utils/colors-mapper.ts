import { ChipTypes } from "../types";

export const colorsMapper = (type: ChipTypes) => {
    const colors = {
      background: '#EDEDED',
      border: '#E0E0E0',
      color: '#404040',
    };
    switch (type) {
      case 'info':
        colors.background = '#EAF0FE';
        colors.border = '#83A7FA';
        colors.color = '#306CF7';
        break;
      case 'warning':
        colors.background = '#FDE5CE';
        colors.border = '#FABF88';
        colors.color = '#F69539';
        break;
      case 'success':
        colors.background = '#C8F1E8';
        colors.border = '#61A697';
        colors.color = '#1E7461';
        break;
        case 'error':
        colors.background = '#F7D8D4';
        colors.border = '#E9948B';
        colors.color = '#DB4D3D';
        break;
  
        case 'tertiary':
          colors.background = '#DDD6E8';
          colors.border = '#BEAFD1';
          colors.color = '#4C2F72';
          break;
  
      default:
        break;
    }
  
    return colors;
  };