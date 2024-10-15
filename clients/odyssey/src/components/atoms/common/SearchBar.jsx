import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductConsumer, ProductContext } from '../../../context';
import { useDebounce } from '../../../common/helperFunctions'

import { SearchBarText, useStyles } from './SearchBar.styled';
//import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import { IconButton, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { 
  iconSize,
  clearIconWidth, clearIconHeight 
} from '../../../style_constants/icons'

const styleIconBtn = {
  width: '40px', 
  height: '47px',
};

const styleIcon = {
  color: 'var(--title)', 
  width: iconSize, 
  height: iconSize,
}

const styleClearIcon = {
  color: 'var(--placeholder)', 
  width: clearIconWidth, 
  height: clearIconHeight,
}

export const SearchBar = () => {
  const classes = useStyles();
  const context = useContext(ProductContext);
  const { updateProdStartIdx, updateStoreStartIdx,
          search, updateSearch, searchStores,
          searchProductsCategoriesStores
        } = context;
  const location = useLocation();
  const urlPath = location.pathname.split('/')[1]; // 'stores', '', 'businesscenter'
  const debounceSearchProdCatStores = useDebounce(searchProductsCategoriesStores, 500);
  const debounceSearchStores = useDebounce(searchStores, 500);

  const handleSearch = async(event) => {
    updateSearch(event);
    updateProdStartIdx(0);
    updateStoreStartIdx(0);
    if (urlPath === '') {
      debounceSearchProdCatStores(event.target.value);
    } else if (urlPath === 'stores'){
      debounceSearchStores(event.target.value);
    }
  };

  // useEffect(() => {
  //   if (urlPath === '' && search !== '') {
  //     searchProductsCategoriesStores(search);
  //   }
  // // eslint-disable-next-line
  // }, [urlPath])

  return (
    <SearchBarText className={classes.root}>
      <ProductConsumer>
      {(value = {}) => {
      const clearSearch = value.search !== '' ? '' : 'none';
      const clearLocSearch = value.location !== '' ? '' : 'none';
      const clear = { 'target': { 'value': ''}};
      return (
      <>
        {/*<TextField
          id='filled-basic'
          style={{ width: '49%', borderRight: 'solid 1px #BDB4AD'}}
          placeholder='Enter your location'
          value={value.location}
          disabled={urlPath === 'businesscenter'}
          onChange={(event) => {
            value.updateLocation(event)
            // value.updateLocation(event)
          }}
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <IconButton style={styleIconBtn}>
                <LocationOnOutlinedIcon style={styleIcon} />
              </IconButton>
            ),
            endAdornment: (
              <IconButton 
                style={{ display: clearLocSearch }} 
                onClick={() => {
                  value.updateLocation(clear)
                  value.searchLocation(clear)
                }}
              >
                <ClearIcon style={styleClearIcon} />
              </IconButton>
            )
          }}
        />*/}
        <TextField
          style={{ width: '100%'}}
          placeholder='Search'
          value={value.search}
          onChange={(event) => handleSearch(event)}
          disabled={urlPath === 'businesscenter'}
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <IconButton style={styleIconBtn}>
                <SearchIcon style={styleIcon} />
              </IconButton>
            ),
            endAdornment: (
              <IconButton 
                style={{ display: clearSearch }} 
                onClick={() => {
                  value.updateSearch(clear)
                  if (urlPath === '') {
                    value.searchProductsCategoriesStores(clear)
                  } else {
                    value.searchStores(clear)
                  }
                }} 
              >
                <ClearIcon style={styleClearIcon} />
              </IconButton>
            )
          }}
        />
      </>)}
      }
      </ProductConsumer>
    </SearchBarText>
  );
}
