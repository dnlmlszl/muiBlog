import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useGlobalContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4c6375', // például egy friss, modern zöld szín
    },
    secondary: {
      main: '#ff9800', // például egy friss, modern narancssárga szín
    },
  },
});

const BlogContainer = styled('section')(({ theme }) => ({
  padding: '3.5rem',
  marginBottom: '19.25rem',
  [theme.breakpoints.up('sm')]: {
    padding: '0 2.5rem',
  },
  [theme.breakpoints.up('md')]: {
    padding: '0 3rem',
  },
}));

const ResetPassword = () => {
  const { resetPassword } = useGlobalContext();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    // const password = data.get('password');
    resetPassword(email);
    navigate('/auth');
  };

  return (
    <ThemeProvider theme={theme}>
      <BlogContainer>
        <Container
          component="main"
          maxWidth="xs"
          sx={{ boxShadow: '0 0 10px rgba(0,0,0, 0.25)' }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1.375rem 0',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset password
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update password
              </Button>
            </Box>
          </Box>
        </Container>
      </BlogContainer>
    </ThemeProvider>
  );
};

export default ResetPassword;
