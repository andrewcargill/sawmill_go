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


const About = () => {

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
            

            <FullWidthImageContainer imageUrl={forestTwo} />
            <CustomBox variant="secondary">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <CustomTypography.heading>
                            Project background
                        </CustomTypography.heading>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTypography.subheading>
                            I am a sawmill owner and software engineer. This is an ongoing personal project that I started in July 2023. 
                        </CustomTypography.subheading>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTypography.paragraph>
                           My goals for the project are detailed in the frontend README.MD and I welcome your feedback and enquires. 
                        </CustomTypography.paragraph>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTypography.paragraph>
                          
                           - Andrew Cargill 
                           
                        </CustomTypography.paragraph>
                    </Grid>
                    <Grid container xs={12} pt={2} spacing={1}>
                        <Grid item xs={4}>
                            <CustomButton
                            onClick={() => handleButtonClick("https://github.com/andrewcargill/sawmill_go/tree/main/mill")} 
                            variant="contained" 
                            fullWidth>
                                FrontEnd
                            </CustomButton>
                        </Grid>
                        <Grid item xs={4}>
                            <CustomButton
                            onClick={() => handleButtonClick("https://github.com/andrewcargill/sawmill_api")} 
                            variant="contained" 
                            fullWidth
                            >
                                Backend
                            </CustomButton>
                        </Grid>
                        <Grid item xs={4}>
                            <CustomButton
                            onClick={() => handleButtonClick("/newplank")} 
                            variant="contained" 
                            fullWidth
                            >
                                demo
                            </CustomButton>
                        </Grid>

                    </Grid>

                </Grid>
            </CustomBox>
        
         
        </PageContentContainer>

    );
};

export default About;
