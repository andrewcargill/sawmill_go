// LandingPage.js
import React from 'react';
import { Grid, Button, Container, Card } from '@mui/material';
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
            <CustomBox>
              <Alert severity="success">Latest Update: Demo database is live. Loading spinners added to images. Basic report view is live.</Alert>
              
              </CustomBox>
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
                            A cloud-based stock management system for artisan foresters and sawmill owners.
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
                                <CustomTypography.subheading>
                                    About the project
                                </CustomTypography.subheading>
                                <CustomTypography.paragraph>
                               This is an ongoing project that we started in July 2023. I am a programmer and work alongside local sawmill owners, carpenters and forest owners in the developing of the system. 
                               The current site is for testing, feedback and development.
                                </CustomTypography.paragraph>
                            </Grid>
                            <Grid item p={2}>

                                <CustomTypography.paragraph>
                                If you would like to be involved please drop me a message.
                                </CustomTypography.paragraph>
                            </Grid>
                        </Card>
                    </Grid>

                    <Container>
                        <Grid container>
                            <Grid item >
                                <Grid item xs={12} paddingTop={4} paddingBottom={1}>
                                    <Avatar
                                        alt="Andy Cargill"
                                        src={andy}
                                        sx={{ width: 90, height: 90 }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomTypography.paragraph>
                                        Andrew Cargill
                                    </CustomTypography.paragraph>

                                </Grid>
                            </Grid>
                        </Grid>

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
