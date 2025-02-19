import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext.js';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Assignment System
        </Typography>

        {user && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {user.role === 'admin' && (
              <Button 
                color="inherit" 
                component={Link} 
                to="/admin"
              >
                Admin Dashboard
              </Button>
            )}
            <Button 
              color="inherit" 
              component={Link} 
              to="/dashboard"
            >
              My Dashboard
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}