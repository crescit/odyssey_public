import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import SettingsIcon from '@material-ui/icons/Settings';
import StorefrontIcon from '@material-ui/icons/Storefront';
import PeopleIcon from '@material-ui/icons/People';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { makeStyles } from '@material-ui/core/styles';
import { apiURL } from '../../../common/constants';
import { ApiUtil } from '../../../util/ApiUtil';
import { testComp3 } from '../../../test_data/testCompanyData';
import ConsoleMenuLink from '../../atoms/stores/ConsoleMenuLink';
import { H5, H6 } from '../../../library/atoms';
import Loading from '../../atoms/common/Loading';
import { PG } from '../../../library/atoms/PG';
import { useAuth0 } from '../../../react-auth0-spa';
import BusinessOrders from './BusinessOrders';
import BusinessProducts from './BusinessProducts';
import BusinessSettings from './BusinessSettings';

const businessLogoSize = '52px';
const BusinessLogo = styled.img`
  cursor: pointer;
  width: ${businessLogoSize};
  height: ${businessLogoSize};
  object-fit: contain;
  display: flex;
  align-items: center;
  border: 1px solid var(--body);
`;

const ConsoleHeader = styled(H5)`
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 4px 0px;
  font-size: 24px;
`;

const useStyles = makeStyles({
  root: {
    height: '60vh',
    position: 'fixed',

    '@media (max-width: 600px)': {
      height: '100%',
      marginBottom: '5%',
    },
  },
});

const BusinessConsole = () => {
  const authContext = useAuth0();
  const { getIdTokenClaims, getTokenSilently } = authContext;
  const history = useHistory();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  // init to 212 first
  const [clientWidth, setClientWidth] = useState(212);
  const classes = useStyles();

  const options = [
    { label: 'Orders', icon: <ReceiptIcon />, route: 'orders' },
    { label: 'Products', icon: <LocalMallIcon />, route: 'products' },
    { label: 'Settings', icon: <SettingsIcon />, route: 'settings' },
    // { label: 'Your Store', icon: <StorefrontIcon/>, route: 'store'}
  ];

  /*
    businesscenter/orders -> Merchant Console Orders Component
    businesscenter/products -> Merchant Console Products Component
    businesscenter/settings -> Merchant Console Store Preview
    businesscenter/store -> Merchant Console Store Preview
  */
  const { page } = useParams();
  const pageMap = {
    orders: <BusinessOrders company={company} />,
    products: (
      <BusinessProducts
        compID={company && company.id}
        merchant={company && company.name}
      />
    ),
    settings: <BusinessSettings company={company} />,
    // 'store': (<h2>Store Preview Component</h2>),
  };

  const handleMenuClick = (route) => {
    history.push(`/businesscenter/${route}`);
  };

  const handleRedirectToStore = () => {
    history.push(`/store/${company.id}/${company.name}`);
  };

  const getToken = async () => {
    try {
      const token = await getTokenSilently();
      const claim = await getIdTokenClaims();
      return { token, claim };
    } catch (err) {
      console.error('error with auth');
    }
  };

  const getCompany = async () => {
    //  setCompany(testComp3)
    //  setLoading(false);
    // !!! uncomment below after test
    const { token, claim } = await getToken();
    if (claim) {
      const res = await ApiUtil.get(apiURL + '/company', false, null, token);
      setCompany(res.data.stores);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCompany();
    // eslint-disable-next-line
  }, []);

  const consoleNav = useRef(null);
  useEffect(() => {
    const w =
      consoleNav && consoleNav.current && consoleNav.current.clientWidth;
    if (w > 0) {
      setClientWidth(w);
    }
    setClientWidth(w);
  }, [loading, consoleNav]);

  return (
    <Grid
      id='business-console'
      container
      justify='flex-start'
      style={{ marginTop: '-60px' }}
    >
      <Grid
        item
        xs={12}
        sm={2}
        md={2}
        lg={2}
        classes={{ root: classes.root }}
        style={{ minWidth: `${clientWidth}px` }}
      >
        {loading ? (
          <Loading position={false} />
        ) : (
          <>
            <Grid container ref={consoleNav}>
              <Grid item xs={4} sm={4} md={3} lg={3}>
                <BusinessLogo
                  src={company && company.img}
                  alt={company && company.name + 'logo'}
                  onClick={handleRedirectToStore}
                ></BusinessLogo>
              </Grid>

              <Grid item xs={8} sm={8} md={9} lg={9} className='p-x2'>
                <ConsoleHeader className='text-left'>Console</ConsoleHeader>
                <PG
                  className='text-left'
                  style={{ cursor: 'pointer' }}
                  onClick={handleRedirectToStore}
                >
                  {company && company.name}
                </PG>
              </Grid>
            </Grid>

            <Grid container className='m-t4'>
              {options &&
                options.map((option = {}, idx) => (
                  <ConsoleMenuLink
                    key={option.label + idx}
                    onClick={() => handleMenuClick(option.route)}
                    label={option.label}
                    icon={option.icon}
                    route={option.route}
                    page={page}
                  />
                ))}
              <a
                href='https://discord.com/invite/MM7U8gBSNY'
                target='_blank'
                rel='noopener noreferrer'
                style={{
                  textDecoration: 'none',
                  padding: 0,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: 12,
                  marginBottom: 12,
                }}
              >
                <PeopleIcon />
                <H6 style={{ marginRight: 'auto', marginLeft: 16 }}>
                  Community
                </H6>
              </a>
            </Grid>
          </>
        )}
      </Grid>

      <Grid
        style={{
          marginLeft: `${clientWidth}px`,
          borderLeft: '1px solid var(--border)',
        }}
        item
        xs={12}
        sm={8}
        md={9}
        lg={10}
      >
        {page ? pageMap[page] : null}
      </Grid>
    </Grid>
  );
};
export default BusinessConsole;
