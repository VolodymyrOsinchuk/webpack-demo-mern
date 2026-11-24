import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";

import {
  Home as HomeIcon,
  Login as LoginIcon,
  PersonAdd as RegisterIcon,
  AccountCircle as ProfileIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AppBar position="sticky" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              color: "inherit",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            React Webpack
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              component={RouterLink}
              to="/"
              color="inherit"
              startIcon={<HomeIcon />}
            >
              Home
            </Button>

            {!user ? (
              <>
                <Button
                  component={RouterLink}
                  to="/login"
                  color="inherit"
                  startIcon={<LoginIcon />}
                >
                  Login
                </Button>

                <Button
                  component={RouterLink}
                  to="/register"
                  color="inherit"
                  startIcon={<RegisterIcon />}
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to="/profile"
                  color="inherit"
                  startIcon={<ProfileIcon />}
                >
                  Profile
                </Button>

                <Button
                  onClick={handleLogout}
                  color="inherit"
                  startIcon={<LogoutIcon />}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
