import React from 'react';

import DateFnsUtils from '@date-io/date-fns';
import { 
  MuiPickersUtilsProvider, 
  KeyboardDatePicker, 
  KeyboardTimePicker 
} from '@material-ui/pickers';
import ScheduleIcon from '@material-ui/icons/Schedule';
import './DateTimePicker_mui.css';

const DateTimePicker = ({ dateTime, setDateTime }) => {

  return (
    <div className={'DateTime-wrapper'}>
      <div className={'Field-wrapper'}>
        <label className={'Label-style'} htmlFor='pickup-date'>Available Date</label>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker 
            name='pickup-date' id='pickup-date'
            autoOk
            disablePast
            variant='inline'
            inputVariant='outlined'
            format='MM/dd/yyyy'
            value={dateTime}
            InputAdornmentProps={{ position: 'end' }}
            onChange={(dateVal) => setDateTime(dateVal)}
            required
          ></KeyboardDatePicker>
        </MuiPickersUtilsProvider>
      </div>
      <div className={'Field-wrapper'}>
        <label className={'Label-style'} htmlFor='pickup-time'>Available Time</label>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker 
            name='pickup-time' id='pickup-time'
            autoOk
            ampm
            disablePast
            minutesStep='15'
            variant='inline'
            inputVariant='outlined'
            value={dateTime}
            keyboardIcon={<ScheduleIcon/>}
            onChange={(timeVal) => {
              setDateTime(timeVal)
            }}
            required
          ></KeyboardTimePicker>
        </MuiPickersUtilsProvider>
      </div>
    </div>
  );
};

export default DateTimePicker;
