import React from 'react';
import { Grid, Typography } from '@mui/material';
import CustomBox from '../CustomBoxes/CustomBoxes';
import CustomTypography from '../Typography/CustomTypography';

const CustomListHeadingContent = ({ title }) => {
  return (
    <CustomBox variant="primary" >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <CustomTypography.heading>
            {title}
          </CustomTypography.heading>
        </Grid>
      </Grid>
    </CustomBox>
  );
};

export default CustomListHeadingContent
