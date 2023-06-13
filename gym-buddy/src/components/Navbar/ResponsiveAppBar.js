import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../auth'


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const auth = useAuth()
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    auth.logout()
    navigate('/')
  }


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GymBuddy
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem
                onClick={() => navigate('/')}
                sx={{
                  color: 'primary.main',
                  fontWeight: 'bold',
                  py: 1,
                  fontSize: '0.9rem',
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'white',
                  },
                }}
              >
                DASHBOARD
              </MenuItem>
              <MenuItem
                onClick={() => navigate('/newreservation')}
                sx={{
                  color: 'primary.main',
                  fontWeight: 'bold',
                  py: 1,
                  fontSize: '0.9rem',
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'white',
                  },
                }}
              >
                NEW RESERVATION
              </MenuItem>
              <MenuItem
                onClick={() => navigate('/myreservation')}
                sx={{
                  color: 'primary.main',
                  fontWeight: 'bold',
                  py: 1,
                  fontSize: '0.9rem',
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'white',
                  },
                }}
              >
                MY RESERVATIONS
              </MenuItem>
              {
                auth.user && <MenuItem
                  onClick={() => navigate('/help')}
                  sx={{
                    color: 'primary.main',
                    fontWeight: 'bold',
                    py: 1,
                    fontSize: '0.9rem',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'white',
                    },
                  }}
                >
                  HELP/SURVEY
                </MenuItem>
              }

              {
                !auth.user && <MenuItem
                  onClick={() => navigate('/login')}
                  sx={{
                    color: 'primary.main',
                    fontWeight: 'bold',
                    py: 1,
                    fontSize: '0.9rem',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'white',
                    },
                  }}
                >
                  LOGIN
                </MenuItem>
              }

              {
                !auth.user && <MenuItem
                  onClick={() => navigate('/signup')}
                  sx={{
                    color: 'primary.main',
                    fontWeight: 'bold',
                    py: 1,
                    fontSize: '0.9rem',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'white',
                    },
                  }}
                >
                  SIGNUP
                </MenuItem>
              } 


              {
                auth.role === 'admin' && <MenuItem
                  onClick={() => navigate('/admin')}
                  sx={{
                    color: 'primary.main',
                    fontWeight: 'bold',
                    py: 1,
                    fontSize: '0.9rem',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'white',
                    },
                  }}
                >
                  ADMIN
                </MenuItem>
              }
            </Menu>



            
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GymBuddy
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key={0}
              sx={{ color: '#fff' }}
              onClick={() => navigate('/')}
            >
              {'Dashboard'}
            </Button>

            <Button
              key={2}
              sx={{ color: '#fff' }}
              onClick={() => navigate('/newreservation')}
            >
              {'New Reservation'}
            </Button>

            <Button
              key={3}
              sx={{ color: '#fff' }}
              onClick={() => navigate('/myreservation')}
            >
              {'My Reservations'}
            </Button>
            {
              auth.user && (<Button
                key={1}
                sx={{ color: '#fff' }}
                onClick={() => navigate('/help')}
              >
                {'Help / Survey'}
              </Button>)
            }
            {
              !auth.user && (<Button
                key={4}
                sx={{ color: '#fff' }}
                onClick={() => navigate('/login')}
              >
                {'Login'}
              </Button>)
            }

            {
              !auth.user && (<Button
                key={5}
                sx={{ color: '#fff' }}
                onClick={() => navigate('/signup')}
              >
                {'Signup'}
              </Button>)
            }

            {
              auth.role === 'admin' && (<Button
                key={6}
                sx={{ color: '#fff' }}
                onClick={() => navigate('/admin')}
              >
                {'Admin'}
              </Button>)
            }


          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="https://media.gq-magazine.co.uk/photos/5e34599a318f780008ca67c5/master/pass/20191210-dumbbell-02.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {auth.user ? (
                <MenuItem key={1} onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <Typography variant="inherit" noWrap>
                    Logout
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem key={1} onClick={() => navigate('/login')}>
                  <Typography variant="inherit" noWrap>
                    Please login
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;