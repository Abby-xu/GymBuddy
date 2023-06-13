import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MyImage from "./gymbuddy.png";
import { useAuth } from '../auth'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import LoginIcon from '@mui/icons-material/Login';
import { API_IP_ADDRESS } from "../../config";
const theme = createTheme();

export default function Login() {


  const [errorMessage, setErrorMessage] = useState('');

  const auth = useAuth()
  const navigate = useNavigate()
  
  const handleSignUpClick = () => {
    navigate('/signup');
  };


  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value;
    const password = form.password.value;

    //api call
    // Fetch the data from the API
    fetch(`${API_IP_ADDRESS}/user/${username}`)
      .then(response => response.json())
      .then(data => {
        const corrPwd = data.data[0].pwd
        const identity = data.data[0].identity

        if(password === corrPwd ){
          auth.login(username, identity)
          navigate('/')
        } else{
          setErrorMessage('The password you entered did not match our records. Please double-check and try again.');
        }
      })
      .catch(error => {
        setErrorMessage('The username you entered did not match our records. Please double-check and try again.');
      });   
  };


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '93vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={'auto'}
          md={7}
          sx={{
            backgroundImage: `url(${MyImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          style={{ width: '100%', height: '100%' }}
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
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                startIcon={<LoginIcon />}
              >
                Login
              </Button>
              <Grid container>
                <Grid item>
                  <Link variant="body2" onClick={handleSignUpClick}>
                    {"Don't have an account? Sign Up"}
                  </Link>          
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}