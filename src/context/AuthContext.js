import React, { createContext, useContext, useState, useEffect } from "react";

// Buat Context
const AuthContext = createContext();

// Provider untuk AuthContext
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Ambil data user dari localStorage saat aplikasi dimulai
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user dari localStorage
    }
  }, []);

  // Fungsi untuk login dan menyimpan user
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Simpan user ke localStorage
  };

  // Fungsi logout
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user"); // Hapus user dari localStorage
    localStorage.removeItem("token"); // Hapus token
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook custom untuk menggunakan AuthContext
export const useAuth = () => useContext(AuthContext);
