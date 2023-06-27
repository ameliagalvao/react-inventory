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
          <Button variant="outlined" onClick={handleMenuOpen}>
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
            <MenuItem component={Link} to="/" onClick={handleMenuClose}>
              Pilotos
            </MenuItem>
            <MenuItem component={Link} to="/supplies" onClick={handleMenuClose}>
              Materiais
            </MenuItem>
            <MenuItem component={Link} to="/settings" onClick={handleMenuClose}>
              Configurações
            </MenuItem>
          </Menu>
          <Button variant="contained" onClick={logout} color="secondary">
            Sair
          </Button>
        </div>
      )}
    </>
  );
};

export default UserWidget;
