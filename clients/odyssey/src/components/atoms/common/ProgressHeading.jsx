import React from 'react';
import { Steps, Step, UpperLine, Circle, StepText, useStyles } from './ProgressHeading.styled';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const ProgressHeading = ({step, progressSteps }) => {
  // const step = 4; // 1,2,3,4 ; 4 = all completed 
  progressSteps = progressSteps ? progressSteps : [];
  const classes = useStyles();
  const lineStatusStyles = [classes.inProgressOrDone, classes.inProgressOrDone, classes.notComplete];
  const iconeStatusStyles = [classes.inProgressIcon, classes.doneIcon, classes.notCompleteIcon];
  // const progressSteps = ['Your business information', 'Set up your Stripe Account', 'Review your data'];

  return (
    <Steps>
      {progressSteps.map((progressText,i) => {
        let code = 2;
        if ( i+1 === step) code = 0;
        else if ( i+1 < step) code = 1;

        return (
          <Step key={'Step-' + i.toString()} >
            <UpperLine className={lineStatusStyles[code]}/>
            <div style={{ display: 'flex', width: '100%'}}>
              {code === 1 ? <CheckCircleIcon className={iconeStatusStyles[1]}/> : <Circle className={iconeStatusStyles[code]}></Circle>}
              <StepText>{progressText}</StepText>
            </div>
          </Step>
        )
      })}
    </Steps>
  );
};

export default ProgressHeading;