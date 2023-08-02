// LandingPage.js
import React from 'react';
import { Grid, Button, Container } from '@mui/material';
import CustomTypography from './components/Typography/CustomTypography';
import CustomBox from './components/CustomBoxes/CustomBoxes';
import forest from './media/images/treetops.png';
import forestTwo from './media/images/forest_mountain.png';
import cloud from './media/images/database_structure.png';
import FullWidthImageContainer from './components/CustomBoxes/FullWidthImageContainer';
import CustomButton from './components/Buttons/CustomButtons';
import { useNavigate } from "react-router-dom";
import PageContentContainer from './components/CustomBoxes/PageContentContainer';


const LandingPage = () => {

    const navigate = useNavigate();

    const handleButtonClick = () => {
      navigate('/about');
    };

  return (
    <PageContentContainer>
      <FullWidthImageContainer imageUrl={forest} />

      <CustomBox variant="primary">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <CustomTypography.heading>
              Welcome to Sawmill go!
            </CustomTypography.heading>
          </Grid>
          <Grid item xs={12}>
            <CustomTypography.subheading>
              Empower Your Artisanal Sawmill with Sawmill Go - The Ultimate Database Solution!
            </CustomTypography.subheading>
          </Grid>
          <Grid item xs={12}>
            <CustomTypography.paragraph>
              Seamlessly manage your inventory operations with ease. From start to finish, experience smooth and hassle-free management, allowing artisans to effortlessly oversee their operations.
            </CustomTypography.paragraph>
          </Grid>
          <Grid item xs={12}>
            <CustomButton onClick={handleButtonClick} variant="contained">
              Read More
            </CustomButton>
          </Grid>
        </Grid>
      </CustomBox>
      <FullWidthImageContainer imageUrl={forestTwo} />
      <CustomBox variant="secondary">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <CustomTypography.heading>
              100% TRANSPARENT FORESTRY
            </CustomTypography.heading>
          </Grid>
          <Grid item xs={12}>
            <CustomTypography.subheading>

              Introducing "Transparent Forestry" - Revolutionizing the Industry!
            </CustomTypography.subheading>
          </Grid>
          <Grid item xs={12}>
            <CustomTypography.paragraph>
              Discover complete information about sourced trees, from felling date to responsible individuals and precise locations. Experience unparalleled transparency and traceability for a truly distinctive offering.
            </CustomTypography.paragraph>
          </Grid>
          <Grid item xs={12}>
          <CustomButton onClick={handleButtonClick} variant="contained">
              Read More
            </CustomButton>
          </Grid>
        </Grid>
      </CustomBox>
      <FullWidthImageContainer imageUrl={cloud} />
      <CustomBox variant="dark">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <CustomTypography.heading>
              UNLEASHING CLOUD COMPUTING'S POWER
            </CustomTypography.heading>
          </Grid>
          <Grid item xs={12}>
            <CustomTypography.subheading>
              Effortlessly search your inventory with custom-built filters for seamless organization.
            </CustomTypography.subheading>
          </Grid>
          <Grid item xs={12}>
            <CustomTypography.paragraph>
              Input tree details for precise calculations. Add GPS locations, images, notes, moisture checks, from any device.
            </CustomTypography.paragraph>
          </Grid>
          <Grid item xs={12}>
          <CustomButton onClick={handleButtonClick} variant="contained">
              Read More
            </CustomButton>
          </Grid>
        </Grid>
      </CustomBox>
    </PageContentContainer>

  );
};

export default LandingPage;
