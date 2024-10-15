import styled from 'styled-components'

export const ReviewOrderSec = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: left;
`;

export const RowFlexSec = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
`;

export const ColFlexSec = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin: 18px 0 16px;
`;

export const TopSec = styled(ColFlexSec)`
  display: inline-flex;
  max-width: 1400px;
  min-width: 'var(--width-mobile)';
  margin-top: 24px;
`;

export const InfoBlock = styled.div`
  width: 50%;
  max-width: 230px;
  margin-right: auto;
`;

export const MerchantImg = styled.img`
  display: inline;
  width: 32px;
  height: 32px;
`;
