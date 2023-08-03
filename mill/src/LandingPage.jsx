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

    const handleButtonClick = (route) => {
        // Check if the route starts with "http://" or "https://" to determine if it's an external link
        if (route.startsWith('http://') || route.startsWith('https://')) {
          window.open(route, '_blank'); // Open the external link in a new tab
        } else {
          navigate(route); // Navigate within your application using the useNavigate hook
        }
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
                            {/* Empower Your Artisanal Sawmill with Sawmill Go - The Ultimate Database Solution! */}
                            An inventory management system for Artisan Sawmill Owners
                        </CustomTypography.subheading>
                    </Grid>
                    
            
                </Grid>
            </CustomBox>

            <FullWidthImageContainer imageUrl={forestTwo} />
            <CustomBox variant="secondary">
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
                            The backend is built with MySQL Database with a Django (Python) API, hosted with Heroku. The Frontend is ReactJS using Matrial UI for styling, currently deployed via Github Pages.
                        </CustomTypography.paragraph>
                    </Grid>
                    <Grid container xs={12} pt={2} spacing={1}>
                        <Grid item xs={6}>
                            <CustomButton
                            onClick={() => handleButtonClick("https://github.com/andrewcargill/sawmill_go/tree/main/mill")} 
                            variant="contained" 
                            fullWidth>
                                FrontEnd
                            </CustomButton>
                        </Grid>
                        <Grid item xs={6}>
                            <CustomButton
                            onClick={() => handleButtonClick("https://github.com/andrewcargill/sawmill_api")} 
                            variant="contained" 
                            fullWidth
                            >
                                Backend
                            </CustomButton>
                        </Grid>

                    </Grid>

                </Grid>
            </CustomBox>
            <FullWidthImageContainer imageUrl={cloud} />
            <CustomBox variant="dark">
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
                    <Grid item xs={6}>
                            <CustomButton 
                            onClick={() => handleButtonClick("/newplank")} 
                            variant="contained" 
                            fullWidth
                            >
                                Demo
                            </CustomButton>
                        </Grid>
                </Grid>
            </CustomBox>
        </PageContentContainer>

    );
};

export default LandingPage;
