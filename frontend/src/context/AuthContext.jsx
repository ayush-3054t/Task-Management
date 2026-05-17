import { createContext, useContext, useMemo, useState } from "react";
import { loginRequest, registerRequest } from "../services/authService.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("taskManagerUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (credentials) => {
    const data = await loginRequest(credentials);
    localStorage.setItem("taskManagerUser", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const register = async (payload) => {
    const data = await registerRequest(payload);
    localStorage.setItem("taskManagerUser", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("taskManagerUser");
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, token: user?.token, login, register, logout }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
