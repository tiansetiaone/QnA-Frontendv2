import React, { useState } from "react";
import axios from "../services/axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";
import logo from "../assets/logos.png";
import icon1 from "../assets/username.png";
import icon3 from "../assets/pass.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Username dan Password wajib diisi.");
      alert("Username dan Password wajib diisi.");
      return;
    }

    try {
      const { data } = await axios.post("/auth/login", { username, password });
      console.log("Respons server:", data);

      const userData = {
        id: data.user.id,
        username: data.user.username,
        role: data.user.role,
        token: data.token,
        is_narasumber: data.user.is_narasumber ? "1" : "0",
        group_id: data.user.group_id || null,
      };

      loginUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      if (data.user.role === "admin") {
        localStorage.setItem("adminId", data.user.id);
      } else {
        localStorage.removeItem("adminId");
      }

      if (data.user.role === "admin_group") {
        localStorage.setItem("adminGroup", data.user.id);
      } else {
        localStorage.removeItem("adminGroup");
      }
      if (data.user.is_narasumber) {
        localStorage.setItem("is_narasumber", data.user.is_narasumber);
      } else {
        localStorage.removeItem("is_narasumber");
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
      } else {
        localStorage.removeItem("token");
      }

      if (data.user.group_id) {
        localStorage.setItem("group_id", data.user.group_id);
      } else {
        localStorage.removeItem("group_id");
      }

      if (
        data.user.role === "admin" ||
        data.user.role === "admin_group" ||
        data.user.is_narasumber === 1
      ) {
        navigate("/Admin");
      } else if (data.user.role === "user") {
        navigate("/User");
      } else {
        console.error("Role tidak dikenali");
        alert("Role pengguna tidak dikenali.");
      }
    } catch (error) {
      console.error("Login gagal:", error.response?.data?.error || error.message);

      if (error.response?.data?.error) {
        const serverError = error.response.data.error;

        if (serverError.includes("Invalid password")) {
          setErrorMessage("Password yang Anda masukkan salah.");
          alert("Password yang Anda masukkan salah.");
        } else if (serverError.includes("Username tidak ditemukan")) {
          setErrorMessage("Username tidak ditemukan.");
          alert("Username tidak ditemukan.");
        } else {
          setErrorMessage("Login gagal. Periksa kembali username dan password Anda.");
          alert("Login gagal. Periksa kembali username dan password Anda.");
        }
      } else {
        setErrorMessage("Login gagal. Periksa kembali username dan password Anda.");
        alert("Terjadi kesalahan jaringan. Coba lagi nanti.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1 className="signIn">MASUK</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group-reg">
            <div className="iconForm">
              <img src={icon1} alt="icon-username" />
            </div>
            <input
              type="text"
              placeholder="Username / No.WA.."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group-reg">
            <div className="iconForm">
              <img src={icon3} alt="icon-pass" />
            </div>
            <input
              type="password"
              placeholder="Isi Password.."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
          <p>
            Belum Punya Akun? <a href="/Register">Daftar disini</a>
          </p>
          <div className="forgot-password-link">
            <Link to="/forgot-password">Lupa Password?</Link>
          </div>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div className="logo-container">
        <img src={logo} alt="Q&A Logo" />
        <h1>APP.</h1>
      </div>
    </div>
  );
};

export default Login;
