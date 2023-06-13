import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import EquipmentMap from './EquipmentMap';
import Dashboard from './Dashboard'

const Home = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Dashboard />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '2rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
            <Box sx={{ width: '20px', height: '20px', bgcolor: '#6ec072', borderRadius: '50%', marginRight: '8px', marginLeft: '5px'}}></Box>
            <Typography variant="subtitle1" sx={{ lineHeight: '15px' }}>Available</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
            <Box sx={{ width: '20px', height: '20px', bgcolor: '#ff4500', borderRadius: '50%', marginRight: '8px' }}></Box>
            <Typography variant="subtitle1" sx={{ lineHeight: '15px' }}>In Use</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center'}}>
            <Box sx={{ width: '20px', height: '20px', bgcolor: '#f8d568', borderRadius: '50%', marginRight: '8px' }}></Box>
            <Typography variant="subtitle1" sx={{ lineHeight: '15px' }}>Maintenance</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{
          display: 'flex', justifyContent: 'center', width: '98%', margin: '0 auto', border: '1px solid',
          boxShadow: '0 0 8px rgba(44, 130, 201, 0.5)',
          padding: '0.8rem',
          backgroundColor: '#85c3ff'
        }}>
          <EquipmentMap />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
