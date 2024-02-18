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
import MenuItem from '@mui/material/MenuItem';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/UserContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const pages = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { user, logout, loading } = useGlobalContext();
  const [navPages, setNavPages] = useState(pages);

  const theme = createTheme({
    palette: {
      primary: {
        // main: 'rgba(83, 109, 254)',
        main: '#4c6375;',
      },
      secondary: {
        main: '#ff9800',
      },
    },
  });

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    let newNavPages = [...pages];
    if (user) {
      newNavPages.push({ path: '/create', name: 'Create a Blog' });
    }
    setNavPages(newNavPages);
  }, [user]);

  if (loading) {
    return <div className="loading"></div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
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
              BEST<span className="navSpan">Blogs</span>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{
                  mr: 2,
                  color: '#fff',
                  display: { xs: 'flex', md: 'none' },
                }}
                onClick={handleOpenNavMenu}
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
                {navPages.map((page) => (
                  <Link to={page.path} key={page.name}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
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
              BEST<span className="navSpan">Blogs</span>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {navPages.map((page) => (
                <NavLink
                  to={page.path}
                  key={page.name}
                  className={({ isActive }) => (isActive ? 'nav-links' : '')}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: 'white',
                      display: 'block',
                      ':hover': { color: '#a8aab3' },
                    }}
                  >
                    {page.name}
                  </Button>
                </NavLink>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
              {user ? (
                <>
                  <Box sx={{ p: 0, display: 'flex', alignItems: 'center' }}>
                    {user?.photoURL ? (
                      <Avatar src={user.photoURL} alt={user.displayName} />
                    ) : (
                      <Typography
                        textAlign="center"
                        sx={{
                          color: '#fff',
                          padding: '0.625rem',
                          fontWeight: 700,
                        }}
                      >
                        {user.displayName}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ p: 0, ml: 2 }}>
                    <IconButton
                      onClick={() => {
                        navigate('/auth');
                        logout();
                      }}
                      sx={{ color: '#fff' }}
                    >
                      <LogoutIcon />
                    </IconButton>
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ p: 0 }}>
                    <Link to="auth/">
                      <Button sx={{ color: '#fff', fontWeight: 700 }}>
                        Login
                      </Button>
                    </Link>
                  </Box>
                  <Box sx={{ p: 0, ml: 2 }}>
                    <Link to="auth/signup">
                      <Button sx={{ color: '#fff', fontWeight: 700 }}>
                        Sign Up
                      </Button>
                    </Link>
                  </Box>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default Navbar;
