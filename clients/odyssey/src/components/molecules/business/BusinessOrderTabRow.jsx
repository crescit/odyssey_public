import React from 'react';
import styled from 'styled-components';

const Tab = styled.div`
  &.active { 
    color: var(--label-active);
    border-bottom: 4px solid var(--primary);
  };

  &:hover {
    color: var(--label-active);
    border-bottom: 4px solid var(--placeholder);
  }
  display: inline;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.15px;
  color: var(--label);
  cursor: pointer;
`;

const BusinessOrderTabRow = ({ tabs, selected = 0, setSelected }) => {
  return(
    tabs && tabs.map((tab,idx) => {
      return(<Tab
        key={idx}
        className={`${selected === idx ? 'active m-l1 p-b2 p-l2 p-r2' : 'm-l1 p-b2 p-l2 p-r2' }`}
        onClick={() => setSelected(idx)}
        >
          {tab.name}
      </Tab>)
    })
  )
}

export default BusinessOrderTabRow;