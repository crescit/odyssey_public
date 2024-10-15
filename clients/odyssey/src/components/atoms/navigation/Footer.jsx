import React, { useEffect, useState } from 'react';
import {
  FaTwitter,
  FaFacebookSquare,
  FaLinkedin,
  FaInstagram,
} from 'react-icons/fa';
import { CgCopyright } from 'react-icons/cg';
import { Link, useLocation } from 'react-router-dom';
import { useStyles, SocialIcons, Line } from './Footer.styled';
import { F1 } from '../../../library/atoms/F1';
import { S1 } from '../../../library/atoms/S1';
import { S3 } from '../../../library/atoms/S3';
import { S3U } from '../../../library/atoms/S3U';
import { unAuthPaths } from '../../../util/tools';

function Footer() {
  const classes = useStyles();
  const [path, setPath] = useState(null);
  let location = useLocation();
  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return !unAuthPaths.has(path) ? (
    <>
      <Line />
      <div className={classes.div}>
        <div className={classes.headings}>
          {/*<div className={classes.subdiv}>
            <F1 className={classes.title}>SHOP</F1>
            <Link className={classes.link} to='/blog'>
              <S1 className={classes.subtitle}>Blog</S1>
            </Link>
  </div>*/}
          <div
            //add marginLeft: 86 when adding additional columns
            style={{ flexDirection: 'column', marginRight: 0 }}
          >
            <F1 className={classes.title}>SELL</F1>
            <Link className={classes.link} to='/howitworks'>
              <S1 className={classes.subtitle}>How it works</S1>
            </Link>
            {/*<S1 className={classes.subtitle} style={{ marginTop: 6 }}>
              Seller FAQ
</S1>*/}
          </div>
          {/*<div style={{ flexDirection: 'column', marginLeft: 114 }}>
            <F1 className={classes.title}>ABOUT</F1>
            <Link className={classes.link} to='/about'>
              <S1 className={classes.subtitle}>About us</S1>
            </Link>
            <S1 className={classes.subtitle} style={{ marginTop: 6 }}>
              Press
            </S1>
</div>*/}
        </div>
        <div className={classes.social}>
          <a href='https://twitter.com/OdysseyCommerce'>
            <SocialIcons>
              <FaTwitter
                className={classes.icon}
                style={{ marginTop: 26.25, height: 19.5 }}
              />
            </SocialIcons>
          </a>
          <a href='https://www.facebook.com/OdysseyCommerce-583845865633352'>
            <SocialIcons>
              <FaFacebookSquare
                className={classes.icon}
                style={{
                  marginLeft: 16,
                  marginRight: 16,
                  marginTop: 24,
                  height: 23.85,
                }}
              />
            </SocialIcons>
          </a>
          <a href='https://www.linkedin.com/company/odysseycommerce'>
            <SocialIcons>
              <FaLinkedin
                className={classes.icon}
                style={{ marginTop: 24, height: 24 }}
              />
            </SocialIcons>
          </a>
          <a href='https://www.instagram.com/odysseycommerce/'>
            <SocialIcons>
              <FaInstagram
                className={classes.icon}
                style={{ marginTop: 24, height: 24 }}
              />
            </SocialIcons>
          </a>
        </div>
      </div>
      <div className={classes.bottom}>
        <S3>
          <CgCopyright
            style={{
              marginBottom: '-2px',
              fontWeight: 500,
              fontStyle: 'normal',
              fontSize: 14,
            }}
          />
          OdysseyCommerce, Inc.
        </S3>
        <div
          className='disp-flex m-l1'
          style={{ position: 'relative', flexDirection: 'row', top: '-3px' }}
        >
          <a
            href='https://images.odysseycommerce.com/terms-of-use_html.html'
            className='m-r1'
          >
            <S3U>Terms</S3U>
          </a>
          <a href='https://images.odysseycommerce.com/privacy-policy.html'>
            <S3U>Privacy</S3U>
          </a>
        </div>
      </div>
    </>
  ) : null;
}

export default Footer;
