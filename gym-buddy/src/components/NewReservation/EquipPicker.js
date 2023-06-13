import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Grid, Typography } from "@mui/material";

export default function EquipPicker({
  availEquip,
  location,
  handleLocationChange,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Select Your Equipment Location
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id="demo-controlled-open-select-label">
            Location
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={location}
            label="Location"
            onChange={handleLocationChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {availEquip &&
              availEquip.map((equipment) => (
                <MenuItem key={equipment.location} value={equipment.location}>
                  {equipment.location}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
