import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from './user/hooks/useLogout';
import { useAuthContext } from './user/hooks/useAuthContext';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const UserWidget = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Typography variant="body1" style={{ fontWeight: 600 }}>
            Oi, {user.displayName}
          </Typography>
          <Button variant="outlined" onClick={handleMenuOpen} style={{ color: '#F3F3F3', borderColor: '#F3F3F3', width: '120px' }}>
            Menu
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            getContentAnchorEl={null}
          >
            <MenuItem
              component={Link}
              to="/"
              onClick={handleMenuClose}
              sx={{'&:hover': { backgroundColor: '#D11C44', color:'#F3F3F3'  } }} 
            >
              Pilotos
            </MenuItem>
            <MenuItem
              component={Link}
              to="/supplies"
              onClick={handleMenuClose}
              sx={{ '&:hover': { backgroundColor: '#D11C44', color:'#F3F3F3' } }} 
            >
              Materiais
            </MenuItem>
            <MenuItem
              component={Link}
              to="/settings"
              onClick={handleMenuClose}
              sx={{'&:hover': { backgroundColor: '#D11C44', color:'#F3F3F3'  } }} 
            >
              Configurações
            </MenuItem>
          </Menu>
          <Button variant="contained" onClick={logout} style={{ backgroundColor: '#E8C547' }}>
            Sair
          </Button>
        </div>
      )}
    </>
  );
};

export default UserWidget;
