import React from 'react';
import { TextField, styled, useTheme } from '@mui/material';

const theme = useTheme();

const CustomTextFieldGreenLabel = styled(TextField)({
  '& label.Mui-focused': {
    color: theme.palette.primary.main,
  },
  '& .MuiInputLabel-root': { // Target labels
    color: theme.palette.primary.main,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.palette.primary.main,
  },
});

export default CustomTextFieldGreenLabel;
