import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid } from '@mui/material';

const CustomDatePicker = (props) => {
    return (
        <Grid item xs={12}>
            <DatePicker fullWidth sx={{
                '@media (max-width: 600px)': {
                    width: '100%',
                },
            }}
            />
        </Grid>
    );
};

export default CustomDatePicker;
