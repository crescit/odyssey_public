import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { get } from 'lodash';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import { ProductConsumer, ProductContext } from '../../../context';
import { ViewListOnlyButton, ViewListAndMapButton } from './StoresPage.styled';
import useWindowDimensions from '../../../util/useWindowDimensions';
import StoresMapPage from './StoresMapPage';
import ToggleSwitch from '../../atoms/common/ToggleSwitch';
import StoreBrowse from '../../atoms/stores/StoreBrowse';
import Loading from '../../atoms/common/Loading';
import { H5 } from '../../../library/atoms/H5';
import { BT14 } from '../../../library/atoms/BT14';

const StoresPage = (props) => {
  const { match } = props;
  const context = useContext(ProductContext);
  const { loadingStore, setStores, updateSearch } = context;
  const [mapViewSelected, setMapViewSelected] = useState(false);
  const { width } = useWindowDimensions();
  const history = useHistory()

  const awaitStore = async(search) => {
    await setStores(search)
  }

  const handleToggle = (event) => {
    setMapViewSelected(event.target.checked)
  }
  
  useEffect(() => {
    updateSearch('');
    awaitStore('getall');
  // eslint-disable-next-line
  }, [])

  return (
    <>
      <Grid container spacing={3} className="p-b2">
        <Grid item xs={12} md={8} lg={8}>
          <H5 className="disp-flex m-rauto">{mapViewSelected? 'Stores near you' : "Stores"}</H5>
        </Grid>
        <Grid item xs={12} md={4} lg={4} className={isMobile || width < 1100 ? null : 'disp-flex p-l6 p-r0 m-lauto just-end'}>
          <FormGroup>
            <FormControlLabel
              control={<ToggleSwitch checked={mapViewSelected} onChange={handleToggle} name="toggle" />}
              labelPlacement="start"
              label={<span style={{fontFamily: 'var(--font)'}}>Show stores near me</span>}
            />
          </FormGroup>
        </Grid>
      </Grid>

      {!mapViewSelected  ? <Grid container spacing={1}>
        <ProductConsumer>
          {(value = {}) => {
            if (loadingStore) {
              return <Loading className="m-3"/>
            } else if (!value.stores.length) {
              return (<H5 className="m-l3" style={{ marginTop: 12, marginBottom: 8, fontStyle: 'italic' }}>
                      No stores were found
                      </H5>)
            } else {
              let filteredStores = value.stores.filter((store) => {
                return (
                  store.name.toLowerCase()
                );
              });
              return filteredStores.map((store, idx) => {
                return (
                  <Grid
                    item
                    xs={12}
                    md={4}
                    lg={3}
                    key={`${store.name}-${store.idx}`}
                  >
                    <StoreBrowse store={store} key={store.id} />
                  </Grid>
                );
              });
            }
          }}
        </ProductConsumer>
      </Grid> : <StoresMapPage/>}
    </>
  );
};

export default StoresPage;
