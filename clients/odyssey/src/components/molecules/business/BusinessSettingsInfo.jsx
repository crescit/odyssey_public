import React from 'react';
import Grid from '@material-ui/core/Grid';

import { ActiveH6 } from './BusinessOrderDetails.styled';
import Loading from '../../atoms/common/Loading';
import OnboardingForm from '../../organisms/onboarding/OnboardingForm';

const BusinessSettingsInfo = ({ company }) => {
  return (
    <Grid container className="p-t3">
      <ActiveH6>General Information</ActiveH6>
      <Grid item md={8} lg={8}>
        {!company ? <Loading/> : <OnboardingForm company={company} companyID={company && company.id} isSettingsForm={true}/>}
      </Grid>
    </Grid>
  )
};

export default BusinessSettingsInfo;