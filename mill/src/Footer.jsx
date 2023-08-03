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
            <CustomBox variant="dark" width="100%">
              <Grid container spacing={0} justifyContent="space-evenly">
              
                 
                 <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                 <Tooltip title="Send me an Email" placement="top">
                    <EmailIcon />
                    </Tooltip>
                 </Grid>
                 <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                 <Tooltip title="Visit my Github " placement="top">
                    <GitHubIcon />
                    </Tooltip>
                 </Grid>
                 <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                 <Tooltip title="Linked In" placement="top">
                    <LinkedInIcon />
                    </Tooltip>
                 </Grid>
                
                 <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                 <Tooltip title="andycargill01.com" placement="top">
                    <HomeIcon />
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
