import { createContext, useContext, useEffect, useState } from "react";

import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifier la session au démarrage
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/users/profile");
        setUser(response.data.user);
      } catch (error) {
        console.error("Session validation failed:", error);

        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Connexion
  const login = async (data) => {
    if (!data?.token) {
      throw new Error("Authentication token is missing");
    }

    localStorage.setItem("token", data.token);

    try {
      const response = await api.get("/users/profile");

      const authenticatedUser = response.data.user;

      if (!authenticatedUser) {
        throw new Error("User profile not found");
      }

      setUser(authenticatedUser);

      return authenticatedUser;
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);

      throw error;
    }
  };

  // Déconnexion
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Mise à jour du profil
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
