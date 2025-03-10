import { createContext, useContext, useState, useEffect } from "react";

// Buat Context
const AuthContext = createContext();

// Provider untuk AuthContext
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fungsi untuk login dan menyimpan user
  const loginUser = (userData) => {
    setUser(userData);
  };

  // Fungsi logout
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook custom untuk menggunakan AuthContext
export const useAuth = () => useContext(AuthContext);
