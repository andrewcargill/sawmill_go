import React from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';

const CustomDropdown = ({ options, ...props }) => {
  return (
    <Grid item xs={12}>
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel>{props.label}</InputLabel>
        <Select label={props.label} {...props}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default CustomDropdown;
