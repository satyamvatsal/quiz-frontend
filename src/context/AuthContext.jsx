import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const login = async (username, password) => {
    try {
      console.log(BACKEND_URL);
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok || !data.token) {
        throw new Error(data.error || "Login failed");
      }
      setUsername(username);
      localStorage.setItem("username", username);
      localStorage.setItem("authToken", data.token);
      setAuthToken(data.token);
    } catch (error) {
      setAuthToken(null);
      setError(error.message | "Login error");
      console.error("Login Error:", error.message);
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (!response.ok) setError(data.message || "Registration failed");

      setUsername(username);
      localStorage.setItem("username", username);
      localStorage.setItem("authToken", data.token);
      setAuthToken(data.token);
    } catch (error) {
      alert(JSON.stringify(error));
      setError(error.message || "Signup error");
      console.error("Registration Error:", error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setUsername(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ authToken, login, register, logout, error, username }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
