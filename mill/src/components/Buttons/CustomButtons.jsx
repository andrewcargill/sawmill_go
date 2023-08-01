import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomButton = styled(MuiButton)(({ theme, variant }) => ({
  backgroundColor: variant === 'contained' ? theme.palette.white.main : 'transparent',
  color: variant === 'contained' ? theme.palette.white.contrastText : theme.palette.primary.main,
  fontWeight: 600,
  '&:hover': {
    backgroundColor: variant === 'contained' ? theme.palette.white.dark : 'transparent',
    // color: variant === 'contained' ? theme.palette.white.main : theme.palette.primary.main,
  },
}));

// Set default props for the CustomButton component
CustomButton.defaultProps = {
  size: 'medium',
};

export default CustomButton;
