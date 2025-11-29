import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Home', 'Cambodian Knowledge Portal' ];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#F18C6A", boxShadow: "none" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "#FFF" }}
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
              sx={{ display: 'block' }}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: "12px",
                  boxShadow: "0px 6px 20px rgba(0,0,0,0.15)", 
                  minWidth: "160px",
                  overflow: "hidden",
                  gap: "4px"
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={ () => {
                        page == "Home" ? navigate("/") : navigate("/cambodia");
                        handleCloseNavMenu();
                    }}>
                    <Typography
                        sx={{
                        position: "relative",
                        px: "12px",
                        py: "4px",
                        fontSize: 14,
                        lineHeight: 1,
                        fontFamily: "Lato",
                        whiteSpace: "nowrap",
                        }}
                    >
                        {page}
                    </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}