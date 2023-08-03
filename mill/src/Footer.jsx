import React, { useState } from 'react';
import { Grid } from '@mui/material';
import CustomTypography from './components/Typography/CustomTypography';
import CustomBox from './components/CustomBoxes/CustomBoxes';
import { useNavigate } from 'react-router-dom';
import PageContentContainer from './components/CustomBoxes/PageContentContainer';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import HomeIcon from '@mui/icons-material/Home';
import Tooltip from '@mui/material/Tooltip';

const Footer = () => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const handleButtonClick = (route) => {
        // Check if the route starts with "http://" or "https://" to determine if it's an external link
        if (route.startsWith('http://') || route.startsWith('https://')) {
            window.open(route, '_blank'); // Open the external link in a new tab
        } else {
            navigate(route); // Navigate within your application using the useNavigate hook
        }
    };

    const handleEmailClick = () => {
        const emailTo = 'andycargill01@aol.com'; // Replace with your actual email address
        window.location.href = `mailto:${emailTo}`;
    };

    const toggleFooter = () => {
        setExpanded(!expanded);
    };

    return (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
            <PageContentContainer
                onClick={toggleFooter}
              
                style={{
                    
                    height: expanded ? 'auto' : '20px',
                    transition: 'height 0.5s ease',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                }}
            >
                <div
                    id='div1'
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: expanded ? 'auto' : '25px',
                        backgroundColor: '#286140',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'height 0.5s ease',
                    }}
                    onClick={toggleFooter}
                >
                    <CustomTypography.paragraph>

                        &copy; 2023 SawmillGo
                        <ArrowDropUpIcon />
                    </CustomTypography.paragraph>
                </div>
                <div
                    style={{
                        transform: expanded ? 'translateY(0)' : 'translateY(100%)',
                        transition: 'transform 0.5s ease',
                        width: '100%'
                    }}
                >
                    {expanded ? (
                        <div>
                            <div
                                style={{

                                    height: expanded ? 'auto' : '20px',
                                    backgroundColor: '#286140',
                                    color: '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'height 0.5s ease',
                                }}

                            >
                                <CustomTypography.paragraph>
                                    &copy; 2023 SawmillGo
                                    <ArrowDropDownIcon />
                                </CustomTypography.paragraph>
                            </div>
                            <CustomBox id='expanded' variant="dark" width="100%">
                                <Grid container spacing={0} justifyContent="space-evenly">

                                <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Tooltip title="andycargill01.com" placement="top">
                                            <HomeIcon
                                                onClick={() => handleButtonClick("https://andycargill01.com/")}
                                            />
                                        </Tooltip>
                                    </Grid>
                                
                                    <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Tooltip title="Visit my Github " placement="top">
                                            <GitHubIcon
                                                onClick={() => handleButtonClick("https://github.com/andrewcargill/")}
                                            />
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Tooltip title="Linked In" placement="top">
                                            <LinkedInIcon
                                                onClick={() => handleButtonClick("https://www.linkedin.com/in/andycargill01/")}
                                            />
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Tooltip title="Send me an Email" placement="top">
                                            <EmailIcon
                                                onClick={handleEmailClick}
                                            />
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </CustomBox>
                        </div>
                    ) : null}
                </div>
            </PageContentContainer>
        </div>
    );
};

export default Footer;
