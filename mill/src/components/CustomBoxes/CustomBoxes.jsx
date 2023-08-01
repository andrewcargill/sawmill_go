import React from 'react';
import { Box as MuiBox } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomBox = styled(MuiBox)(({ theme, variant }) => ({
  backgroundColor: variant === 'primary' ? theme.palette.primary.main : variant === 'secondary' ? theme.palette.secondary.main : variant === 'dark' ? theme.palette.dark.main : 'inherit',
  color: variant === 'primary' ? theme.palette.primary.contrastText : variant === 'secondary' ? theme.palette.secondary.contrastText : variant === 'dark' ? theme.palette.dark.contrastText : 'inherit',
  padding: theme.spacing(2),
  // Add more styles for different variants as needed
}));

export default CustomBox;