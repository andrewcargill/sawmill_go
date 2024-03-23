import React from 'react';
import { Grid, Button, Typography } from '@mui/material';
import CustomTypography from '../Typography/CustomTypography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from '@mui/icons-material/Edit';

const CustomHeaderWithNavEdit = ({title, handleGoBack, handleEditClick }) => {
  return (
    <Grid container item p={2} pt={2} bgcolor={'primary.main'}>
      <Grid item xs={6}>
        {/* <Typography variant="h4">Tree {id} Info</Typography> */}
        <CustomTypography.navHeading color='white' >
            {title}
        </CustomTypography.navHeading>
      </Grid>
    
      <Grid item container xs={6} justifyContent="flex-end">
      <Grid item xs={3}>
          <Button variant='contained' color='dark' onClick={handleEditClick} startIcon={< EditIcon />}>Edit</Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant='contained' color='dark' onClick={handleGoBack} startIcon={< ArrowBackIosIcon />} >BACK</Button>
        </Grid>
    
      </Grid>
    </Grid>
  );
};

export default CustomHeaderWithNavEdit;
