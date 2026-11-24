import { Box, Typography, Button } from "@mui/material";

import { Link as RouterLink, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h1" fontWeight={700}>
        404
      </Typography>

      <Typography variant="h5">Oops! Something went wrong.</Typography>

      <Typography color="text.secondary">
        {error?.statusText || error?.message || "Page not found"}
      </Typography>

      <Button component={RouterLink} to="/" variant="contained">
        Back to home
      </Button>
    </Box>
  );
};

export default ErrorPage;
