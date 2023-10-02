import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/UserContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const pages = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
  { path: `/detail/:id`, name: 'Detail' },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { user, logout } = useGlobalContext();
  const [navPages, setNavPages] = useState(pages);

  // const theme = createTheme({
  //   components: {
  //     MuiPaper: {
  //       styleOverrides: {
  //         root: {
  //           backgroundColor: 'rgba(83, 109, 254, 0.5)!important', // Teljesen átlátszó
  //           backdropFilter: 'blur(10px)!important', // Elmosódott háttér
  //           border: '1px solid rgba(255, 255, 255, 0.2)!important', // Alacsony kontrasztú szegély
  //         },
  //       },
  //     },
  //   },
  // });

  const theme = createTheme({
    palette: {
      primary: {
        main: 'rgba(83, 109, 254)', // például egy friss, modern zöld szín
      },
      secondary: {
        main: '#ff9800', // például egy friss, modern narancssárga szín
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

  // useEffect(() => {
  //   if (user) {
  //     setNavPages([
  //       ...navPages,
  //       { path: '/create', name: 'Create a Blog' },
  //       { path: `/create/update/:id`, name: 'Update a Blog' },
  //     ]);
  //   } else {
  //     setNavPages([...pages]);
  //   }
  // }, [user]);

  useEffect(() => {
    let newNavPages = [...pages];
    if (user) {
      newNavPages.push({ path: '/create', name: 'Create a Blog' });
      newNavPages.push({ path: `/create/update/:id`, name: 'Update a Blog' });
    }
    setNavPages(newNavPages);
  }, [user]);

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
              MUI<span className="navSpan">Blogs</span>
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
              MUI<span className="navSpan">Blogs</span>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {navPages.map((page) => (
                <Link to={page.path} key={page.name}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {user ? (
                <>
                  {user.displayName && (
                    <IconButton sx={{ p: 0 }}>
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
                    </IconButton>
                  )}
                  <IconButton
                    onClick={() => {
                      navigate('/auth');
                      logout();
                    }}
                    sx={{ p: 0, color: '#fff' }}
                  >
                    <LogoutIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton sx={{ p: 0 }}>
                    <Link to="auth/">
                      <Typography
                        textAlign="center"
                        sx={{
                          color: '#fff',
                          padding: '0.625rem',
                          fontWeight: 700,
                        }}
                      >
                        Login
                      </Typography>
                    </Link>
                  </IconButton>
                  <IconButton sx={{ p: 0 }}>
                    <Link to="auth/signup">
                      <Typography
                        textAlign="center"
                        sx={{
                          color: '#fff',
                          padding: '0.625rem',
                          fontWeight: 700,
                        }}
                      >
                        Sign Up
                      </Typography>
                    </Link>
                  </IconButton>
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
