import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Snackbar, useMediaQuery } from '@mui/material';
import { ToggleColorModeButton } from '@/shared/toggle-color-mode-button.component';
import { ColorModeContext } from '../../app';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import { LightMode } from '@mui/icons-material';
import Mascot from '../../assets/curb-companion-mascot-no-outline.png';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { DrawerContext } from '../drawer/drawer-context';

function ResponsiveNavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const { toggleColorMode, mode } = useContext(ColorModeContext);

  const handleToggleColorMode = () => {
    toggleColorMode();
  };

  const handleOpenUserMenu = (event: { currentTarget: any }) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const isMobile = useMediaQuery('(max-width: 899px)');
  const isSmallMobile = useMediaQuery('(max-width: 599px)');

  interface Routes {
    [key: string]: string;
  }
  const routes: Routes = {
    Landing: '/',
    Home: '/home',
    Map: '/map',
    "I'm a Vendor": '/create-vendor',
    Feedback: '/feedback',
  };

  const { toggleDrawer } = useContext(DrawerContext);
  return (
    <>
      <AppBar sx={{ backgroundImage: 'unset' }}>
        <Container className="nav" maxWidth="lg" sx={{ zIndex: 1200 }}>
          <Toolbar sx={{ justifyContent: 'space-between' }} disableGutters>
            <Box display="flex" flexDirection="row" alignItems="center">
              {isSmallMobile && window.location.pathname == '/map' ? (
                <Tooltip title="Open Drawer">
                  <IconButton onClick={toggleDrawer}>
                    <MenuOpenIcon sx={{ transform: 'scaleX(-1)', color: 'white' }} />
                  </IconButton>
                </Tooltip>
              ) : (
                <a href="/">
                  <img
                    src={Mascot}
                    alt="Mascot"
                    style={{ height: '40px', ...(window.innerWidth >= 900 && { marginRight: '10px' }) }}
                  />
                </a>
              )}

              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                CURB COMPANION
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              ></Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Curb Companion
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              {isMobile ? (
                <Tooltip title="Open pages">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                    <MenuIcon style={{ color: 'white' }} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Box>
                  {Object.keys(routes).map((routeKey: string) => {
                    if (routes[routeKey] === window.location.pathname) return;
                    return (
                      <Tooltip key={routeKey} title={routeKey} placement="bottom">
                        <Link
                          key={routeKey}
                          href={routes[routeKey]}
                          color="inherit"
                          sx={{ marginRight: '20px', textDecoration: 'none', fontWeight: '500' }}
                        >
                          {routeKey}
                        </Link>
                      </Tooltip>
                    );
                  })}
                  <Tooltip title="Download">
                    <Button
                      onClick={() => {
                        handleClick();
                      }}
                      sx={
                        {
                          color: '#fff',
                          backgroundColor: mode === 'dark' ? '#0ea47a' : '#0b8362',
                          fontSize: '15px',
                          borderRadius: '5px',
                          padding: '7px 15px',
                          textTransform: 'none',
                          marginRight: '5px',
                          '&:hover': {
                            backgroundColor: mode == 'light' && '#075741',
                          },
                        } as any
                      }
                    >
                      Download
                    </Button>
                  </Tooltip>
                  <ToggleColorModeButton color="white" />
                </Box>
              )}
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
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {Object.keys(routes).map((routeKey) => {
                    if (routes[routeKey] === window.location.pathname) return;
                    return (
                      <MenuItem
                        key={routeKey}
                        onClick={handleCloseUserMenu}
                        component="a"
                        href={routes[routeKey]}
                        color="inherit"
                        sx={{ textDecoration: 'none', width: '100%', textAlign: 'center', justifyContent: 'center' }} // styles for the clickable area
                      >
                        {routeKey}
                      </MenuItem>
                    );
                  })}
                  <Button
                    sx={{
                      color: '#fff',
                      backgroundColor: '#0ea47a',
                      borderRadius: '5px',
                      padding: '6px 10px',
                      margin: '10px auto',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#0c845f',
                      },
                    }}
                    onClick={handleClick}
                  >
                    Download
                  </Button>
                  <MenuItem
                    key="color-mode-button"
                    onClick={handleToggleColorMode}
                    component="a"
                    sx={{ textDecoration: 'none', width: '100%', textAlign: 'center', justifyContent: 'center' }}
                  >
                    {mode === 'light' ? <LightMode /> : <Brightness2Icon />}
                  </MenuItem>
                </Box>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Available soon on the App Store and Google Play"
      />
    </>
  );
}
export default ResponsiveNavBar;
