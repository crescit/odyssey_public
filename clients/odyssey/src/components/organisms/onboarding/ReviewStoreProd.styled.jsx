import styled from 'styled-components';

export const ReviewSection = styled.div`
  font-family: var(--font);
  width: 100%;
  margin: 0 auto;
`;

export const Section = styled.section`
  display: flex;
  padding: 0px;
  position: static;
  width: 80%;
  max-width: 956px;
  flex-grow: 0;
  margin: 32px auto 73px;
`;

export const ProdReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  padding: 0px;
  width: 79%;
  flex: none;
  flex-grow: 0;
  margin: 0;
  border: solid 0.5px var(--border);
  border-radius: 4px;
`;

export const HorizontalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0px;
  margin: 0;
  border-bottom: solid 0.5px var(--border);
`;

export const TableBlock = styled.div`
  color: var(--title);
  font: var(--lgmid-size) normal var(--font);
  line-height: 24px;
  letter-spacing: 0.15px;
  height: 100%;
  vertical-align: middle;
  padding: 12px 16px;
`;

export const TableFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  padding: 0px;
  width: 88%;
  min-width: 355px;
  flex: none;
  flex-grow: 0;
  margin: 0;
`;

export const TblFooterText = styled.p`
  color: var(--title);
  font: var(--sml-size) normal 400 var(--font);
  line-height: 20px;
  letter-spacing: 0.25px;
  text-align: center;
`;

export const InputList = styled.select`
  cursor: pointer;
  color: var(--title);
  font: var(--lgmid-size) normal 400 var(--font);
  letter-spacing: 0.25px;
  background: #ffffff;
  border: none;
  width: 46px;
  margin: 0 10px;
`;

export const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 224px;
  flex-wrap: none;
`;