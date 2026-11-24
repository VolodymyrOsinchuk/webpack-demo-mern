import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { registerUser } from "../api/authApi";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.username.trim() || !form.email.trim() || !form.password) {
      setError("Please complete all fields.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      await registerUser(form);

      setSuccess("Account successfully created!");

      navigate("/login", {
        state: {
          message: "Registration successful. Please sign in.",
        },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 450,
        mx: "auto",
        mt: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h4" fontWeight={700}>
            Create account
          </Typography>

          <Typography color="text.secondary">
            Join us by creating your account.
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          {success && <Alert severity="success">{success}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                autoComplete="username"
                required
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />

              <TextField
                label="Password"
                name="password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          tabIndex={0}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                fullWidth
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Create account"
                )}
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <RouterLink to="/login">Sign in</RouterLink>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Register;
