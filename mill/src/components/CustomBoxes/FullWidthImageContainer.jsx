import React from 'react';
import { Box } from '@mui/material';

const FullWidthImageContainer = ({ imageUrl }) => {
  return (
    <Box sx={{ width: '100%', height: 'auto', maxHeight: '350px', overflow: 'hidden' }}>
      <img src={imageUrl} alt="Full-width" style={{ width: '100%', height: 'auto' }} />
    </Box>
  );
};

export default FullWidthImageContainer;
