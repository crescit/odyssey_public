import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../../context';
import { ApplicationFee } from '../../../common/constants';
import { formatCurrency } from '../../../common/helperFunctions';
import { H5, H6, H7, S2 } from '../../../library/atoms';
import {
  Wrapper,
  Container,
  LineItem,
  Total,
  BtnProceedToNext,
} from './OrderSummary.styled';

// !!!! NEED to calc/find tax; need to display tax  !!!!
const taxRate = 0.0925;

const OrderSummary = ({
  addCSS,
  classes,
  merchantId,
  merchantName,
  step,
  setStep,
}) => {
  const context = useContext(ProductContext);
  let items = Array.isArray(context.cart) ? context.cart : [];
  if (step === 4) {
    items = Array.isArray(context.order) ? context.order : [];
  }
  const subtotal = items.reduce((acc, cur) => {
    return acc + cur.total * (cur.company_id === merchantId) * 1;
  }, 0);
  let tax = subtotal * taxRate;
  tax = parseFloat(tax.toFixed(2));
  let fee = subtotal * ApplicationFee * 0.01;
  fee = parseFloat(fee.toFixed(2));
  const total = subtotal + tax + fee;
  // console.log('subtotal type >', typeof subtotal, subtotal, 'tax type >', typeof tax, tax, 'fee type >', typeof fee, fee, 'total type >', typeof total, total)
  return (
    <Wrapper addCSS={addCSS}>
      <Container>
        <H7 className={'txt-left'}>Order Summary</H7>
        <H6 className={'m-b3 txt-left'}>{merchantName}</H6>

        <LineItem className={'m-t3'}>
          <S2>Subtotal</S2>
          <S2>{formatCurrency(subtotal)}</S2>
        </LineItem>
        <LineItem>
          <S2>Tax</S2>
          <S2>{formatCurrency(tax)}</S2>
        </LineItem>
        <LineItem>
          <S2>Fee</S2>
          <S2>{formatCurrency(fee)}</S2>
        </LineItem>

        <Total>
          <H5>Order Total</H5>
          <H5>{formatCurrency(total)}</H5>
        </Total>

        {step === 0 ? (
          <Link to='/checkout'>
            <BtnProceedToNext>Proceed to checkout</BtnProceedToNext>
          </Link>
        ) : (
          step !== 4 && (
            <BtnProceedToNext onClick={() => setStep(3)}>
              Proceed to Payment
            </BtnProceedToNext>
          )
        )}
      </Container>
    </Wrapper>
  );
};

export default OrderSummary;
