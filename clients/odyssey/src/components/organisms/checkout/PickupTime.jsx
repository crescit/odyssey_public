import React from 'react'
import DateTimeModal from './DateTimeModal'
import { B1, S2 } from '../../../library/atoms'

const dateOption = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
const timeOption = { timeZoneName: 'short' };

const PickupTime = ({step, dateTime, setDateTime}) => {
  const validDateTime = Object.prototype.toString.call(dateTime) === '[object Date]';
  const dateString = validDateTime ? dateTime.toLocaleDateString('en-US', dateOption) : 'Please pick a date';
  const timeString = validDateTime ? dateTime.toLocaleTimeString('en-US', timeOption).replace(/:\d+ /, ' ') : 'and time again.';

  return (
    <div style={{ margin: '16px 0' }}>
      <S2 style={{ marginBottom: 8 }} >Pickup on</S2>
      {step !== 4 && 
        <DateTimeModal dateTime={dateTime} setDateTime={setDateTime} />
      }
      <B1>{dateString}</B1>
      <B1>{timeString}</B1>
    </div>
  )
}

export default PickupTime;