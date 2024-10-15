import styled from 'styled-components'

export const PickupSection = styled.div`
  width: 100%;
  max-width: 732px;
  margin: 0 auto;
  text-align: left;
`;

export const SectionWrapper = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const MerchantImg = styled.img`
  display: inline;
  width: 32px;
  height: 32px;
  object-fit: contain;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  padding: 0px;
  position: static;
  flex: none;
  flex-grow: 0;
  margin: 12px 0;
`;

export const FieldInput = styled.input`
  font-family: var(--font);
  font-size: var(--lgmid-size);
  color: var(--title);
  height: 32px;
  border: 1px solid var(--border);
  border-radius: 0px;
  background: #ffffff;
  width: 153px;
`;