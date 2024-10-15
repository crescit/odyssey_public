import React from 'react';
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
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid var(--title)',
    fontSize: 'var(--lgmid-size)',
    padding: '10px 26px 10px 12px',
    letterSpacing: 0.5,
    lineHeight: '22px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      'var(--font)',
      '-apple-system',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: 'var(--title)',
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

const CategoryDropdown = ({ pid, categories, categoryPicked, setCategoryPicked, product, setProduct }) => {
  const handleSelectChange = (e) => {
    setCategoryPicked(e.target.value)
    setProduct({...product, edited: true})
  }

  return (
    <FormControl 
      variant="outlined"
      style={{ width: '100%' }}
      >
      {/* <B1>Options</B1> */}
      <Select
        labelId="simple-select-category-label"
        id="simple-select-category"
        name="category"
        // className={'m-t1 m-b1'}
        style={{ width: '100%' }}
        value={categoryPicked || ''}
        onChange={handleSelectChange}
        displayEmpty
        input={<BootstrapInput />}
        inputProps={{ 'aria-label': 'Without label'}}
        MenuProps={ popOver }
        renderValue={selected => {
          if (selected.length === 0) {
            return <span style={{ color: 'var(--placeholder)', }}>Select a category</span>;
          }
          return categories[selected];
        }}
      >
        {categories.map((prodVar,i) => {
          return <MenuItem key={prodVar + pid} value={i}>{prodVar}</MenuItem>
        })}
      </Select>
    </FormControl>
  );
};

export default CategoryDropdown;