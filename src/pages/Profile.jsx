import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Avatar,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";

import { Save } from "@mui/icons-material";

import { getProfile, updateProfile } from "../api/userApi";

import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();

        setFormData({
          username: response.user.username || "",
          email: response.user.email || "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const response = await updateProfile(formData);

      updateUser(response.user);

      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={1}>
        My Profile
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Manage your personal information.
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 3,
          border: "1px solid #e5e7eb",
        }}
      >
        {/* PROFILE HEADER */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 4,
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "#3451d1",
              fontSize: 30,
            }}
          >
            {formData.username?.charAt(0).toUpperCase()}
          </Avatar>

          <Box>
            <Typography variant="h6" fontWeight={700}>
              {user?.username}
            </Typography>

            <Typography color="text.secondary">{user?.email}</Typography>

            <Typography variant="caption" color="success.main">
              Active account
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Typography variant="h6" fontWeight={600} mb={3}>
          Personal information
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid md={6} sx={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Save />}
                disabled={saving}
                sx={{
                  bgcolor: "#3451d1",
                  px: 4,
                  py: 1.3,
                  borderRadius: 2,
                }}
              >
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
