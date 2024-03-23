// LandingPage.js
import React from 'react';
import { Grid, Button, Container, Card, Typography } from '@mui/material';
import CustomTypography from './components/Typography/CustomTypography';
import CustomBox from './components/CustomBoxes/CustomBoxes';
import forest from './media/images/treetops.png';
import andy from './media/images/andy.png';
import FullWidthImageContainer from './components/CustomBoxes/FullWidthImageContainer';
import CustomButton from './components/Buttons/CustomButtons';
import { useNavigate } from "react-router-dom";
import PageContentContainer from './components/CustomBoxes/PageContentContainer';
import Avatar from '@mui/material/Avatar';
import ExploreIcon from '@mui/icons-material/Explore';
import Alert from '@mui/material/Alert';
import ParkIcon from '@mui/icons-material/Park';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';



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
            {/* New Hopme */}
            <CustomBox variant="secondary">
                <Grid container spacing={1}>
                    <Grid item xs={12} paddingBottom={2}>
                        <CustomTypography.heading>
                            Welcome to Sawmill Go!
                        </CustomTypography.heading>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTypography.subheading>
                            The complete cloud-based stock management system for artisan foresters and sawmill owners.
                        </CustomTypography.subheading>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTypography.paragraph>
                          This system will not only manage your infentory. The system will create an end report that provides customers with honest and clear information 
                                about why the tree was removed from the forest, when it was milled, and the individuals involved in 
                                the process. This information will be accessible to end customers via a QR code on the end product.
                        </CustomTypography.paragraph>

                    </Grid>

                    <Grid container xs={12} m={2} pt={2}>
                        <Card >

                            <Grid item p={2}>
                                <Typography variant="h1" align="center">
                                    TREE > LOG > PLANK > PRODUCT
                                    </Typography>
                            </Grid>
                            <Grid item p={2}>

                            </Grid>
                        </Card>
                    </Grid>
                    

                    <CustomBox variant="dark">
                <Grid container spacing={1} paddingBottom={4}>
                    <Grid item xs={12}>
                        <CustomTypography.heading>
                            FEATURE GOALS
                        </CustomTypography.heading>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTypography.subheading>

                            The database structure consists of several main tables that form the foundation of the application's data management. Key tables include:
                        </CustomTypography.subheading>
                    </Grid>
                    <Grid item xs={12}>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ParkIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Tree: Stores information about individual trees, such as date of felling, species, and location."

                                />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <WorkspacesIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Log: Relates each tree to its corresponding log, including log length, diameter, and buck status."
                                  
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ClearAllIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Plank: Represents processed timber planks, containing details like width, depth, wood grade, images and usage type."

                                />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <WaterDropIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="MoistureCheck: Tracks moisture content checks for each plank to ensure quality control."

                                />
                            </ListItem>
                        </List>
                    </Grid>
                   
                </Grid>
            </CustomBox>

                    <Container>
                       

                        <Grid container xs={12} pt={2} spacing={1}>
                            <Grid item xs={4} paddingBottom={4}>
                                <CustomButton
                                    onClick={() => handleButtonClick("/about")}
                                    variant="contained"

                                    startIcon={<ExploreIcon />}
                                    fullWidth>
                                    explore
                                </CustomButton>
                            </Grid>


                        </Grid>
                    </Container>
                </Grid>
            </CustomBox>

            {/* end of home */}

        </PageContentContainer>

    );
};

export default LandingPage;
