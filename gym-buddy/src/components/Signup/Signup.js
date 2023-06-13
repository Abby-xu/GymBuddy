import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MyImage from "./gymbuddy.png"; 
import { useState } from 'react';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { API_IP_ADDRESS } from "../../config";

const theme = createTheme();

export default function Signup() {

const [userType, setUserType] = useState('user');
const [errorMessage, setErrorMessage] = useState('');
const [successMessage, setSuccessMessage] = useState('');

const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
};

const handleSubmit = (event) => {
  event.preventDefault();

  const form = event.target;
  const username = form.username.value;
  const pwd = form.password.value;
 
  const admin_code = (userType === 'admin') ? form.admin_code.value : null;

  //if wrong admin code, redirect to error page
  if((userType === 'admin') && admin_code !== 'admin123'){
    setErrorMessage('The admin code you entered did not match our records. Please double-check and try again.');
  } else{
    const identity = ((userType === 'admin') && admin_code === "admin123") ? 'admin' : 'user'  

    // Make a POST request to the /signup endpoint
    fetch(`${API_IP_ADDRESS}/user`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          username,
          pwd,
          identity,
        }
      ),
    })
    .then((response) => response.json())
    .then((data) => {
      // Handle the successful response
      if(data.code === 404){
        setErrorMessage('This username is already in our records. Please try again.');
      }
      else{
        setSuccessMessage('User successfully created!');
      }
    })
    .catch((error) => {
      // Handle the error
      console.error(error)
    });
};
}

  

return (
  <ThemeProvider theme={theme}>
    <Grid container component="main" sx={{ height: '93vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${MyImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {errorMessage && (
                <Box
                  sx={{
                    mt: 2,
                    mb: 2,
                    p: 1,
                    bgcolor: '#FFC1C1', // Light red color
                    borderRadius: 1,
                    color: 'common.black',
                  }}
                >
                  <Typography align="center" variant="body2">
                    {errorMessage}
                  </Typography>
                </Box>
              )}
            {successMessage && (
                <Box
                  sx={{
                    mt: 2,
                    mb: 2,
                    p: 1,
                    bgcolor: 'lightgreen', // Light green color
                    borderRadius: 1,
                    color: 'common.black',
                  }}
                >
                  <Typography align="center" variant="body2">
                    {successMessage}
                  </Typography>
                </Box>
              )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              multiline
              sx={{ p: 0, m: 0 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControl component="fieldset" sx={{ mt: 1 }}>
            <FormLabel component="legend">
              <Typography variant="inherit" fontWeight="bold">Select user type</Typography> 
            </FormLabel>
              <RadioGroup row aria-label="user-type" name="user-type" value={userType} onChange={handleUserTypeChange} >
                <FormControlLabel value="user" control={<Radio />} label="User 🏃" /> 
                <FormControlLabel value="admin" control={<Radio />} label="Admin 🧑‍💼" />
              </RadioGroup>
            </FormControl>
            {userType === 'admin' && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="admin_code"
                label="Admin Code"
                type="password"
                id="admin_code"
                autoComplete="current-admin-code"
              />
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} startIcon={<AppRegistrationIcon />}>
              Sign up
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>
);
}