import React from 'react';
import { H1 } from '../../../library/atoms/H1';
import Grid from '@material-ui/core/Grid';
import FormPersonalDetails from '../onboarding/FormPersonalDetails';
import FormBusinessDetails from '../onboarding/FormBusinessDetails';
import FormHoursDetails from '../onboarding/FormHoursDetails';
window.scrollTo(0,0);

const OnboardingPage = () => (
  <>
    <H1>Profile</H1>
    <Grid container spacing={3} justify='center'>
      <Grid item xs={3}>
        <FormPersonalDetails />
      </Grid>
      <Grid item xs={6}>
        <FormBusinessDetails />
      </Grid>
    </Grid>
    <Grid container spacing={3} justify='center'>
    <Grid item xs={9}>
      <FormHoursDetails />
    </Grid>
    </Grid>
  </>
);

export default OnboardingPage;
