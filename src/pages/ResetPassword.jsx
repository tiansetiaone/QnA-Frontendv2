import React, { useState, useEffect } from "react";
import axios from "../services/axiosConfig";
import { useNavigate } from "react-router-dom";
import "../styles/ResetPass.css";
import logo from "../assets/logos.png";
import icon2 from "../assets/token.png"; // Icon untuk token
import icon3 from "../assets/pass.png"; // Icon untuk password

const ResetPassword = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Ambil nomor WhatsApp dari localStorage saat halaman dimuat
  useEffect(() => {
    const savedWhatsappNumber = localStorage.getItem("whatsapp_number");
    if (savedWhatsappNumber) {
      setWhatsappNumber(savedWhatsappNumber);
    } else {
      alert("Nomor WhatsApp tidak ditemukan. Silakan ulangi proses reset password.");
      navigate("/forgot-password"); // Redirect ke halaman Forgot Password jika tidak ada nomor
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !newPassword) {
      setMessage("Token dan password baru wajib diisi.");
      alert("Token dan password baru wajib diisi.");
      return;
    }

    try {
      const response = await axios.post("/auth/reset-password", { 
        whatsapp_number: whatsappNumber, 
        token, 
        new_password: newPassword 
      });

      // Hapus nomor WhatsApp dari localStorage setelah reset berhasil
      localStorage.removeItem("whatsapp_number");

      setMessage(response.data.message);
      alert("Password berhasil direset. Silakan login kembali.");
      navigate("/"); // Redirect ke halaman login
    } catch (error) {
      setMessage(error.response?.data?.message || "Terjadi kesalahan");
      alert(error.response?.data?.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="login-container-pass">
      <div className="reset-left">
        <h1 className="signIn">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group-reg">
            <div className="iconForm">
              <img src={icon2} alt="icon-token" />
            </div>
            <input
              type="text"
              placeholder="Masukkan Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>
          <div className="input-group-reg">
            <div className="iconForm">
              <img src={icon3} alt="icon-pass" />
            </div>
            <input
              type="password"
              placeholder="Masukkan Password Baru"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn-reset" type="submit">Reset Password</button>
        </form>
        {message && <p className="error-message">{message}</p>}
      </div>
      <div className="logo-container">
        <img src={logo} alt="Q&A Logo" />
        <h1>APP.</h1>
      </div>
    </div>
  );
};

export default ResetPassword;
