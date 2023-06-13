import React from "react";
import { Grid, Typography, Box, Paper } from "@mui/material";

const ScheduleView = ({blockedTime, selectedTimeBlock, handleTimeBlockChange}) => {
  // Initialize the selected time block as null.

  // Check if a time block is disabled.
  const isDisabled = (startTime, endTime) => {
    const block = `${startTime}-${endTime}`;
    return blockedTime.includes(block);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom style={{textAlign: 'center'}}>
          Schedule Your Time
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {[...Array(24)].map((_, index) => {
            const block = index + 12;
            const isOccupied = false; // Change this to check if the block is occupied.
            const backgroundColor = isOccupied ? "#ccc" : "#f5f5f5";
            const cursor = isOccupied ? "default" : "pointer";
            const startTime = `${Math.floor(block / 2)}:${(block % 2 === 0) ? "00" : "30"}`;
            const endTime = `${Math.floor((block + 1) / 2)}:${(block % 2 === 1) ? "00" : "30"}`;
            const isSelected = selectedTimeBlock === `${startTime}-${endTime}`;
            const disabled = isDisabled(startTime, endTime);
            return (
              <Paper
                key={block}
                sx={{
                  height: 24,
                  fontSize: 14,
                  textAlign: "center",
                  paddingTop: 1,
                  backgroundColor: isSelected ? "#2196f3" : backgroundColor,
                  color: isSelected ? "#fff" : "inherit",
                  cursor,
                  pointerEvents: disabled ? "none" : "auto",
                  opacity: disabled ? 0.5 : 1,
                  borderRadius: 16,
                  boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
                }}
                onClick={() => handleTimeBlockChange(startTime, endTime)}
              >
                {`${startTime.padStart(2, "0")}-${endTime.padStart(2, "0")}`}
              </Paper>
            );
          })}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ScheduleView;
