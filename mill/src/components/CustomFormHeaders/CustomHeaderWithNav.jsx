import React from 'react';
import { Grid, Button, Typography } from '@mui/material';
import CustomTypography from '../Typography/CustomTypography';

const CustomHeaderWithNav = ({title, handleGoBack, handleEditClick }) => {
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
        </Grid>
        <Grid item xs={3}>
          <Button variant='contained' color='white' onClick={handleGoBack}>BACK</Button>
        </Grid>
       
      </Grid>
    </Grid>
  );
};

export default CustomHeaderWithNav;
