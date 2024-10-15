import React from 'react'
import { formatPhone } from '../../../common/helperFunctions'
import { B1, S2 } from '../../../library/atoms'

const get = require('lodash/get');

const PhoneAddress = ({location, addressText}) => {
  return (
    <div style={{ margin: '16px 20px 16px 0' }}>
      <S2 style={{ marginBottom: 8 }} >{addressText}</S2>
      <B1>{get(location, 'name', 'Name Here')}</B1>
      <B1>{formatPhone(get(location, 'phone', '(415) 555-xxxx'))}</B1>
      <B1>{get(location, 'address', 'Where The Streets Have No Name')}</B1>
      <B1>{get(location, 'address2', '')}</B1>
      <B1>{get(location, 'city', 'San Francisco')}</B1>
      <B1>{get(location, 'state', 'XY')} {get(location, 'zipCode', '12345')}</B1>
    </div>
  )
}

export default PhoneAddress;