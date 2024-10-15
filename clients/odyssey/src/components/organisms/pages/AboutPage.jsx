import React from 'react';
import Grid from '@material-ui/core/Grid';
const mitch =
  'http://images.odysseycommerce.com/profilepics/mitchprofilepic.jpg';
const josh = 'http://images.odysseycommerce.com/profilepics/joshprofilepic.jpg';
const yue = 'http://images.odysseycommerce.com/profilepics/yueprofilepic.jpg';
const tony = 'http://images.odysseycommerce.com/profilepics/tonyprofilepic.jpg';

const AboutPage = () => {
  return (
    <>
      <h3>Our Story</h3>
      <h1>Our mission is to make selling and purchasing locally easier</h1>
      <p>
        Odyssey is a marketplace that connects local buyers to local sellers.
        We're driven to empower people to support local businesses and provide
        local businesses the resources to do business in any environment they
        choose to
      </p>
      <Grid container spacing={0}>
        <Grid xs={12} md={3}>
          <img
            src={mitch}
            alt='Mitch Gillogly'
            style={{ height: 300, width: 300 }}
          />
          <p>Mitch Gillogly</p>
        </Grid>
        <Grid xs={12} md={3}>
          <img
            src={josh}
            alt='Josh Jaquez'
            style={{ height: 300, width: 300 }}
          />
          <p>Josh Jaquez</p>
        </Grid>
        <Grid xs={12} md={3}>
          <img src={yue} alt='Yue Zhao' style={{ height: 300, width: 300 }} />
          <p>Yue Zhao</p>
        </Grid>
        <Grid xs={12} md={3}>
          <img src={tony} alt='Tony Yu' style={{ height: 300, width: 300 }} />
          <p>Tony Yu</p>
        </Grid>
      </Grid>
    </>
  );
};

export default AboutPage;
