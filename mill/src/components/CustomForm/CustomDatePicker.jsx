import React from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Grid } from "@mui/material";

const CustomDatePicker = ({ value, onChange }) => {
  const handleDateChange = (selectedDate) => {
    const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
    onChange(formattedDate); // Invoke the onChange callback with the formatted date
  };

  return (
    <Grid item xs={12}>
      <DatePicker
        value={value}
        onChange={handleDateChange}
        fullWidth
        required
        sx={{
          "@media (max-width: 600px)": {
            width: "100%",
          },
        }}
      />
    </Grid>
  );
};

export default CustomDatePicker;
