import { Box, Container } from "@mui/material";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />

      <Box
        component="main"
        sx={{
          flex: 1,
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default HomeLayout;
