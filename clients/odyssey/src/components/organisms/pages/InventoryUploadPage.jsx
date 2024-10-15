import React from 'react';
import Grid from '@material-ui/core/Grid';
import { H1 } from '../../../library/atoms/H1';
import FormProductDetails from '../onboarding/FormProductDetails';

const OnboardingPage = () => (
  <>
    <H1>Inventory</H1>
    <Grid container spacing={3} justify='center'>
      <Grid item xs={3}>
        <FormProductDetails />
      </Grid>
    </Grid>
  </>
);

export default OnboardingPage;
