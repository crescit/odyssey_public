import styled from 'styled-components';

export const IconStyling = { display: 'flex', marginLeft: 'auto', marginRight: 'auto', marginBottom: 'var(--spc-1)', width: '100%', color: 'var(--primary)'};

// TODO REFACTOR THESE GUYS OUT
export const PaperCenterer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DialogAlignment = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 40px;
`;

export const Cursor = styled.div`
  cursor: pointer;
`;

export const OnboardingCompanyLogo = styled.img`
  width: 64px;
  height: 64px;
  object-fit: fill;
  border-radius: 50%;
  display: flex;
  flex: 1;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
`;
