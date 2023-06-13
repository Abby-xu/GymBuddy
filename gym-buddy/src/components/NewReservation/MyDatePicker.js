import React from 'react';
import { useEffect} from 'react'
import { Grid, TextField, Typography } from '@mui/material';

function MyDatePicker({selectedDate, setSelectedDate,handleDateChange}) {
  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // add 1 to month since it's 0-indexed
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
  const today = new Date().toISOString().split('T')[0];
  useEffect(() => {
    const storedDate = JSON.parse(localStorage.getItem("selectedDate"));
    if (!storedDate) {
      // If selectedDate is not set, use today's date as default
      const today = new Date();
      const formattedDate = formatDate(today);
      setSelectedDate(formattedDate)
    } else {
      setSelectedDate(storedDate);
    }
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Select Your Date
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="date"
          label="Choose your date"
          type="date"
          value={selectedDate} 
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: today,
          }}
          onChange={handleDateChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}

export default MyDatePicker;

