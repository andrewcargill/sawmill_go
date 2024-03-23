// LandingPage.js
import React from 'react';
import { Grid, Button, Container, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import CustomTypography from './components/Typography/CustomTypography';
import CustomBox from './components/CustomBoxes/CustomBoxes';
import forestTwo from './media/images/forest_mountain.png';
import cloud from './media/images/database_structure.png';
import FullWidthImageContainer from './components/CustomBoxes/FullWidthImageContainer';
import CustomButton from './components/Buttons/CustomButtons';
import { useNavigate } from "react-router-dom";
import PageContentContainer from './components/CustomBoxes/PageContentContainer';
import ParkIcon from '@mui/icons-material/Park';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import WaterDropIcon from '@mui/icons-material/WaterDrop';


const About = () => {

    const navigate = useNavigate();

    const handleButtonClick = (route) => {
        
        if (route.startsWith('http://') || route.startsWith('https://')) {
            window.open(route, '_blank');
        } else {
            navigate(route); 
        }
    };

    return (
        <PageContentContainer>





            <FullWidthImageContainer imageUrl={forestTwo} />
            <CustomBox variant="secondary">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <CustomTypography.heading>
                            Code stack
                        </CustomTypography.heading>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTypography.subheading>
                            Effortlessly search your inventory with custom-built filters for seamless organization.
                        </CustomTypography.subheading>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTypography.paragraph>
                            The backend is built with MySQL Database with a Django (Python) API, currently hosted with Heroku. The Frontend is ReactJS using Matrial UI for styling, currently deployed via Github Pages.
                        </CustomTypography.paragraph>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTypography.paragraph>
                            See the code and ReadMe files via the links below.
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
           
        </PageContentContainer>

    );
};

export default About;
