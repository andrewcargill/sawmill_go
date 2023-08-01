import React from 'react';
import { Grid, TextField } from '@mui/material';

const CustomTextArea = (props) => {
  return (
    <Grid item xs={12} sx={{ mt: 2 }}>
      <TextField
        variant="outlined"
        fullWidth
        multiline
        {...props}
      />
    </Grid>
  );
};

export default CustomTextArea;
