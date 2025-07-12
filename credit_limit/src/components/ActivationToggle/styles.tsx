import { Switch } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import IcTick from 'assets/img/icon/ic-tick.svg';
import IcCancel from 'assets/img/icon/ic-cancel.svg';

export const MaterialUISwitch = withStyles({
  root: {
    width: 70,
    height: 34,
    padding: 7,
  },
  switchBase: {
    margin: 2.5,
    padding: 0,
    transform: 'translateX(4px)',

    '&.Mui-checked': {
      borderColor: '#4AD865',
      color: '#fff',
      transform: 'translateX(36px)',

      '& .MuiIconButton-label .MuiSwitch-thumb': {
        border: '3px solid #4AD865',

        '&:before': {
          content: "''",
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          backgroundImage: `url(${IcTick})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        },
      },

      '& + $track': {
        opacity: '1 !important',
        backgroundColor: '#4AD865 !important',
      },
    },
  },

  thumb: {
    backgroundColor: '#FFF',
    border: '3px solid #AAB4BE',
    width: 28,
    height: 28,

    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundImage: `url(${IcCancel})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  },

  track: {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
  },
})(Switch);
