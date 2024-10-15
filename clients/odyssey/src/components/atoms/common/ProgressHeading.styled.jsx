import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';

export  const Steps = styled.div`
  display: flex;
  flex-direction: row;
  // justify-content: space-between;
  align-items: center;
  // width: 742px;
  max-width:100%;
  height: 32px;
  margin-bottom: 30px;
  overflow-x: auto;
  flex-wrap: nowrap;
`;

export  const Step = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  min-width: 200px;
  width: 244px;
  padding: 2px;
`;

export  const UpperLine = styled.div`
  width: 100%;
  height: 4px;
  border-radius: 4px;
  `;

export  const Circle = styled.div`
  width: 16px;
  height: 16px;
  margin-top: 5px;
  border-radius: 110%;
`;

export  const StepText = styled.div`
  flex-wrap: nowrap;
  font-family: var(--font);
  font-size: var(--sml-size);
  font-color: var(--title);
  line-height: 20px;
  letter-spacing: 0.1px;
  margin-top: 3px;
  margin-left: 4px;
  border-bottom: 1px solid var(--title)
`;

export const useStyles = makeStyles(()=> ({
  inProgressOrDone: {
    backgroundColor: 'var(--primary)',
    border: 'solid 2px var(--primary)',
  },
  notComplete: {
    backgroundColor: '#BDB4AD',
    border: 'solid 2px #BDB4AD',
  },
  inProgressIcon: {
    border: 'solid 6px var(--primary)',
  },
  doneIcon: {
    marginTop: '2px',
    width: '20px',
    height: '20px',
    color: 'var(--primary)',
  },
  notCompleteIcon: {
    border: 'solid 2px #BDB4AD',
  },
}))
