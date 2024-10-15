import React from 'react';
import ProfilePic from '../../atoms/profile/ProfilePic';
import Grid from '@material-ui/core/Grid';
import { H1 } from '../../../library/atoms/H1';
//>>> for Onboarding Stripe account
// import NavigationButton from '../../atoms/navigation/NavigationButton';
// import { Box } from '@material-ui/core';
// import { useStyles } from './OnboardStripeAcctLinkPage.styled';

const ProfilePage = () => {
  // const classes = useStyles();
  return (
    <>
      <Grid container direction='column'>
          <H1>Mark Zuckerberg</H1>
        <ProfilePic />
        
{/* Temporary location for Onboard Stripe Account */}
        {/* <Box style={{marginLeft: '36vw', minWidth: '255px', borderRadius: '5px'}} 
        className={classes.button}>
          <NavigationButton 
            to={'/onboardstripeacctlink'}
            icon={''}
            open={true}
            text={<span style={{color: 'rgb(98, 91,255)', fontWeight: 'bold', border: 'blue solid 1px', borderRadius: '5px', padding: '5px', backgroundColor: 'white'}}>Onboard Stripe Account</span> }
            />
        </Box> */}
      </Grid>
    </>
    );
};

export default ProfilePage;