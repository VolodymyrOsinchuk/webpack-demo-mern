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

import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const message = location.state?.message;

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

    try {
      setLoading(true);

      // 1. Authentification auprès du backend
      const data = await loginUser(form);

      console.log("Login response:", data);

      // 2. Enregistrement du token et récupération du profil
      await login(data);

      // 3. Redirection après authentification réussie
      const redirectTo = location.state?.from?.pathname || "/profile";

      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to login. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 450, mx: "auto", mt: 4, px: 2 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h4" fontWeight={700}>
            Welcome back
          </Typography>

          <Typography color="text.secondary">
            Sign in to your account.
          </Typography>

          {message && <Alert severity="success">{message}</Alert>}

          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
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
                fullWidth
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign in"
                )}
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <RouterLink to="/register">Create account</RouterLink>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
