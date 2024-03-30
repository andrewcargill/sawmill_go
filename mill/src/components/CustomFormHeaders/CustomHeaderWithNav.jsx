import React from 'react';
import { Grid, Button, Typography, IconButton } from '@mui/material';
import CustomTypography from '../Typography/CustomTypography';
import { useNavigate } from 'react-router-dom';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';



const CustomHeaderWithNav = ({title, handleEditClick }) => {
  const navigate = useNavigate();

const handleGoBack = () => {
  navigate(-1);
};
  return (
    <Grid container item p={2} pt={2} bgcolor={"primary.main"}>
    <Grid item xs={6}>
        <CustomTypography.navHeading color='white' >
            {title}
        </CustomTypography.navHeading>
      </Grid>

        <Grid item container xs={6} justifyContent="flex-end">
      <Grid item>
        </Grid>
        <Grid item>
          <IconButton color="white" size="small" onClick={handleGoBack}>
            <ArrowBackIos />
          </IconButton>
        </Grid>
       
      </Grid>
    </Grid>
  );
};

export default CustomHeaderWithNav;
