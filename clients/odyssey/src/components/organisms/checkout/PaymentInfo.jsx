import React from 'react'
import { B1, S2 } from '../../../library/atoms'

const PaymentInfo = ({paymentInfo}) => {

  return (
    <div style={{ margin: '16px 0' }}>
      <S2 style={{ marginBottom: 8 }} >Payment Method</S2>
      <B1>{paymentInfo.type} **{paymentInfo.last4}</B1>
    </div>
  )
}

export default PaymentInfo;