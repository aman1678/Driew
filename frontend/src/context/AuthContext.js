import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token    = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const user_id  = localStorage.getItem("user_id");
    return token ? { token, username, user_id: Number(user_id) } : null;
  });

  const login = ({ token, username, user_id }) => {
    localStorage.setItem("token",    token);
    localStorage.setItem("username", username);
    localStorage.setItem("user_id",  user_id);
    setUser({ token, username, user_id });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);