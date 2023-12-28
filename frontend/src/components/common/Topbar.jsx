import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import useAuth  from '../../services/auth';

const TopBar = () => {
  const { user } = useAuth();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Github Repo App
        </Typography>
        {user && (
          <div>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ ml: 1 }}>
              {user.name}
            </Typography>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
