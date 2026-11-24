import { Box, Typography, Button, Paper, Stack } from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 6 },
        borderRadius: 4,
        background: "linear-gradient(135deg, #1976d2, #512da8)",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Stack spacing={3} sx={{ alignItems: "center" }}>
        <Typography variant="h3" fontWeight={700}>
          Welcome to React Webpack
        </Typography>

        <Typography variant="h6">
          A modern React application powered by Webpack, Express and MongoDB.
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            component={RouterLink}
            to="/register"
            variant="contained"
            color="inherit"
            sx={{ color: "#1976d2" }}
          >
            Get started
          </Button>

          <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: "#fff",
            }}
          >
            Login
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default Home;
