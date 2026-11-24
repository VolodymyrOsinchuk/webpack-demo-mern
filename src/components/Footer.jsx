import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        bgcolor: "#fff",
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          © {new Date().getFullYear()} React Webpack. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
