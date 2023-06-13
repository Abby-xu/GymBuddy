import React from 'react';
import {Grid} from '@mui/material';
import EquipChart from './Chart/EquipChart.js'
import AvailableChart from './Chart/AvailableChart.js';
import ReserveChart from './Chart/ReserveChart.js';

function DataVisualization(){
  return(
    <Grid container spacing={2}>
      <Grid item sx={{width: '80%'}}>
        <EquipChart width={200} height={200} />
      </Grid>
      <Grid item sx={{width: '80%'}}>
        <AvailableChart width={200} height={200} />
      </Grid>
      <Grid item sx={{width: '80%'}}>
        <ReserveChart width={200} height={200} />
      </Grid>
    </Grid>
  )
}

export default DataVisualization;
