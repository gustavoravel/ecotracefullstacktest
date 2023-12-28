import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import authService from '../services/auth';

const theme = createTheme();

const SignUp = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const result = await authService.signup(userData);
      const { data } = await authService.getGithubUserData(result.token);
      login({ ...result, githubData: data });
      navigate('/dashboard');
    } catch (error) {
      // Tratar erros de cadastro aqui
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: theme.palette.secondary.main }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={userData.firstName}
                  onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={userData.lastName}
                  onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                />
              </Grid>
            </Grid>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: theme.palette.primary.main }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;