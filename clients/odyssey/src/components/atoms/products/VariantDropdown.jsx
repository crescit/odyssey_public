import React from 'react';
import { B1 } from '../../../library/atoms';

import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(2),
    },
  },
  input: {
    borderRadius: 8,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid var(--border)',
    fontSize: 'var(--lgmid-size)',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      'var(--font)',
      '-apple-system',
    ].join(','),
    '&:focus': {
      borderRadius: 8,
      borderColor: 'var(--border)',
    },
  },
}))(InputBase);

const popOver = { 
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
  getContentAnchorEl: null
};

const VariantDropdown = ({vids, variantPicked, setVariantPicked, variantTitles}) => {
  const handleSelectChange = (e) => {
    setVariantPicked(e.target.value)
  }

  return (
    <FormControl variant="outlined"
      style={{ width: '100%' }}
      >
      <B1>Options</B1>
      <Select
        labelId="simple-select-variant-label"
        id="simple-select-variant"
        className={'m-t1 m-b1'}
        value={variantPicked}
        onChange={handleSelectChange}
        displayEmpty
        input={<BootstrapInput />}
        inputProps={{ 'aria-label': 'Without label'}}
        MenuProps={ popOver }
        renderValue={selected => {
          if (selected.length === 0) {
            return <span style={{ color: 'var(--placeholder)', }}>Select an option</span>;
          }
          return variantTitles[selected];
        }}
      >
        {variantTitles.map((prodVar,i) => {
          return <MenuItem key={prodVar + i.toString()} value={i}>{prodVar}</MenuItem>
        })}
      </Select>
    </FormControl>
  );
};

export default VariantDropdown;