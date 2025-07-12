import { useState, useEffect } from 'react';

import DayJsUtils from '@date-io/dayjs';
import InputAdornment from '@material-ui/core/InputAdornment';
import Event from '@material-ui/icons/Event';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import {
  MuiPickersUtilsProvider,
  DatePicker as DatePickerUI,
} from '@material-ui/pickers';

import localeEN from 'dayjs/locale/en';

import { DatePickerContainer, Error, useStyles } from './styles';
import { DatePickerProps } from './type';

const DatePicker = ({
  date = '01-01-1990',
  onChange,
  config,
  className,
  errorMessage,
  errorClassName,
  disabled,
}: DatePickerProps) => {
  const classes = useStyles();
  const [currentDate, setCurrentDate] = useState<string>(date);

  useEffect(() => {
    setCurrentDate(date);
  }, [date]);

  const handleOnChange = (newDate: MaterialUiPickersDate) => {
    if (onChange) {
      const convertedDate = newDate && newDate.format('YYYY-MM-DD');
      onChange(convertedDate || date);
    }
  };

  return (
    <DatePickerContainer className={`date-picker-component ${className}`}>
      <MuiPickersUtilsProvider utils={DayJsUtils} locale={localeEN}>
        <DatePickerUI
          className={classes.root}
          value={currentDate}
          onChange={handleOnChange}
          disabled={disabled}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Event />
              </InputAdornment>
            ),
          }}
          format='DD-MM-YYYY'
          {...config}
        />
      </MuiPickersUtilsProvider>
      {errorMessage && (
        <Error className={`${errorClassName}`}>{errorMessage}</Error>
      )}
    </DatePickerContainer>
  );
};

export default DatePicker;
