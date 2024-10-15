import React, { Fragment, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { isMobile } from 'react-device-detect';
import Grid from '@material-ui/core/Grid';

import { ApiUtil } from '../../../util/ApiUtil';
import { useAuth0 } from '../../../react-auth0-spa';
import Loading from '../../atoms/common/Loading';
import { StoreMapBrowse } from './StoresPage.styled';
import StorePopUp from '../../atoms/stores/StorePopUp';
import { apiURL } from '../../../common/constants';

const StoresMapPage = () => {
  const authContext = useAuth0();
  const [addrs, setAddrs] = useState([]);
  const [lat, setLat] = useState(-5000);
  const [long, setLong] = useState(-5000); 
  const [x, setX] = useState(-5000);
  const [y, setY] = useState(-5000);
  let zoom = 11;
  const {  getTokenSilently, getIdTokenClaims } = authContext;

  const callPostUserLocation = async (lat, long) => {
    const token = await getTokenSilently();
    const data = { latitude: lat, longitude: long};
    const claim = await getIdTokenClaims();
    if(claim){
      ApiUtil.post(apiURL + '/geolocation/user-address', data, token);
    }
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async function(position) {
      setLat(position.coords.latitude); 
      setLong(position.coords.longitude); 
      let newX = lon2tile(position.coords.longitude, zoom);
      let newY = lat2tile(position.coords.latitude, zoom);
      setX(newX);
      setY(newY);
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      await getAddrFromLocation(position.coords.latitude, position.coords.longitude);
      await callPostUserLocation(position.coords.latitude, position.coords.longitude);
    });
  }, []);

   const getAddrFromLocation = async (lat = 0, long = 0) => {
    const { data = [] } = await ApiUtil.get(apiURL + `/geolocation/companies?lat=${lat}&long=${long}`, true, null, null, 0, 0);
    data && setAddrs(data)
  };

  const lon2tile = (lon,zoom) => { 
    return (Math.floor((lon+180)/360*Math.pow(2,zoom))); 
  }

  const lat2tile = (lat,zoom) =>  { 
    return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); 
  }

  return(
    <Grid container id="stores-map">
      <Grid item xs={12} md={5} lg={5}>
        {
          addrs && addrs.length == 0 ? <Loading/> : addrs.map((company = { img: '', phone: '', category: ''}, idx) => {
            const store = {
              id: company.company_id || -1,
              name: company.name,
              // todo figure out double quotes bug that affects img, phone, and category
              img: company.img.replace(/['"]+/g, ''),
              phone: company.phone.replace(/['"]+/g, ''),
              category: company.category.replace(/['"]+/g, ''),
              state: company.addresses.state,
              zip: company.addresses.zip,
              address: company.addresses.street1,
              desc: company.desc,
              distance: company.distance
            }
            return <StoreMapBrowse store={store} key={company.company_id} isMap/>
          })
        }
      </Grid>
      <Grid item xs={12} md={7} lg={7}>
      {
        // only display map on retrieval of user's location
        x !== -5000 && y !== -5000 ? 
        (<Fragment>
          <MapContainer center={[lat, long]} zoom={11} scrollWheelZoom={false}
          className="m-rauto m-lauto m-t2 p-0"
          style={{ 
            display: 'flex',
            height: '55vh', 
            zIndex: '1', 
            position: !isMobile  ? 'fixed' : 'relative',
            width: !isMobile ? '55%' : '100vw',
            left: isMobile ? '35px' : null
          }}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
              addrs && addrs.map((address, idx) => {
                return (
                  <Marker key={idx} position={[address.addresses.latitude, address.addresses.longitude]}>
                    <StorePopUp address={address}/>
                  </Marker>
                )
              })
            }
          </MapContainer>
        </Fragment>) : <Loading/>
      }  
      </Grid>
    </Grid>
  )
}

export default StoresMapPage;