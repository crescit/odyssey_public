import React, { useState } from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Grid from '@material-ui/core/Grid';
import PaymentIcon from '@material-ui/icons/Payment';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

import BusinessSettingsInfo from '../../molecules/business/BusinessSettingsInfo';
import BusinessSettingsPayments from '../../molecules/business/BusinessSettingsPayments';
import { H5 } from '../../../library/atoms/H5';
import StoreSettingLink from '../../atoms/stores/StoreSettingLink';
import { StyledB1 } from '../../molecules/business/BusinessOrderDetails.styled';

const BusinessSettings = ({ company }) => {
  const [page, setPage] = useState(null);

  const settingLinks = [
    { icon: <SettingsApplicationsIcon />, header: 'General Information', info: 'View and update your business information' },
    { icon: <PaymentIcon />, header: 'Payments', info: 'Set up and update your Stripe account' },
  ];

  const pageMap = {
    [settingLinks[0].header]: <BusinessSettingsInfo company={company}/>,
    [settingLinks[1].header]: <BusinessSettingsPayments />
  };

  return(
    <div className="text-left p-l2">
      <Grid container>
        {
          !page ?
          (<><H5 className="p-b5" style={{ width: '100%' }}>Settings</H5>
          <>{(settingLinks.map((setting, idx) => {
            return (
              <Grid key={setting.header + idx} item md={6} lg={6} onClick={() => setPage(setting.header)}>
                <StoreSettingLink  icon={setting.icon} header={setting.header} info={setting.info}/>
              </Grid>
            )
          }))}</></>)
          : 
          ( 
            <>
              <StyledB1 className="text-left" onClick={() => setPage(null)} style={{ zIndex: '2' }}>
                <ChevronLeftIcon/>
                Settings
              </StyledB1>
              {pageMap[page]}
            </>
          )
        }
      </Grid>
    </div>
  );
}

export default BusinessSettings;