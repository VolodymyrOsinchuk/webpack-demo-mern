import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  CircularProgress,
} from "@mui/material";

import { Dashboard, Person, Logout, Home } from "@mui/icons-material";

import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const drawerWidth = 250;

const ProfileLayout = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const menuItems = [
    {
      text: "Dashboard",
      icon: <Dashboard />,
      path: "/profile",
    },
    {
      text: "My Profile",
      icon: <Person />,
      path: "/profile/account",
    },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fb" }}>
      {/* TOPBAR */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "#ffffff",
          color: "#172033",
          borderBottom: "1px solid #e5e7eb",
          zIndex: 1201,
        }}
      >
        <Toolbar>
          <Typography variant="h6" fontWeight={700}>
            My Dashboard
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Avatar sx={{ mr: 1 }}>
            {user?.username?.charAt(0).toUpperCase()}
          </Avatar>

          <Typography fontWeight={500}>{user?.username}</Typography>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#ffffff",
            borderRight: "1px solid #e5e7eb",
            mt: "64px",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="caption" color="text.secondary">
            MAIN MENU
          </Typography>
        </Box>

        <List sx={{ px: 2 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              end={item.path === "/profile"}
              sx={{
                borderRadius: 2,
                mb: 1,
                "&.active": {
                  bgcolor: "#e8edff",
                  color: "#3451d1",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>

              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <List sx={{ px: 2 }}>
          <ListItemButton component={NavLink} to="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Back to website" />
          </ListItemButton>

          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          mt: "64px",
          minWidth: 0,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default ProfileLayout;
