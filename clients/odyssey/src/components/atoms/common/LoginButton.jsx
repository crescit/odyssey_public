import React from 'react';
import { useAuth0 } from '../../../react-auth0-spa';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Loading from '../../atoms/common/Loading';
import ProfileDropDown from '../profile/ProfileDropDown'
import { BtnPrimaryMd } from '../../../library/atoms/buttons'

const styleLoginBtn = {
  borderRadius: '4px',
};

const MainPage = () => {
  const props = useAuth0();
  const {
    isAuthenticated = false,
    loginWithRedirect = () => {},
    loading,
    // logout,
  } = props;
  return loading ? (
    <Loading style={{width: 30, height: 0}}/>
  ) : (
    <div style={{ display: 'flex' }}>
      {isAuthenticated ? (
          <ProfileDropDown style={styleLoginBtn} />
      ) : (
      <>
        <Hidden xsDown>
          <BtnPrimaryMd 
            style={styleLoginBtn}
            variant='contained'
            color='primary'
            onClick={() => loginWithRedirect()}
          >
            Sign in
          </BtnPrimaryMd>
        </Hidden>
        <Hidden smUp>
          <div id="odyssey-menu-button" style={{ display: 'flex'}}>
            <IconButton  
              style={styleLoginBtn}
              size="small"
              onClick={loginWithRedirect}
            >
              <AccountCircleIcon style={{ color: 'var(--primary)'}} />
            </IconButton>
          </div>
        </Hidden>
      </>
      )}
    </div>
  )
};

export default MainPage;
