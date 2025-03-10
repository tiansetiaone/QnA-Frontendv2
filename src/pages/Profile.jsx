import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "../services/axiosConfig";
import "../styles/Register.css";
import logo from "../assets/logos.png";
import icon1 from "../assets/username.png";
import icon2 from "../assets/wa-icon.png";
import icon3 from "../assets/pass.png";
import icon4 from "../assets/cpass.png";
import "../styles/Profil.css";

const Profil = () => {
  const navigate = useNavigate();

  const [profil, setProfil] = useState({
    username: "",
    whatsapp: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token tidak ditemukan. Silakan login kembali.");
          return;
        }

        const response = await axios.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfil({
          username: response.data.username || "",
          whatsapp: response.data.whatsapp_number || "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Gagal memuat profil:", error.response || error.message);
        setError("Gagal memuat profil. Silakan coba lagi.");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfil({ ...profil, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setProfil({ ...profil, whatsapp: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (profil.password !== profil.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token tidak ditemukan. Silakan login kembali.");
        return;
      }

      await axios.put(
        "/users/profile",
        {
          username: profil.username,
          whatsappnumber: profil.whatsapp,
          password: profil.password ? profil.password : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Profil berhasil diperbarui.");
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Gagal memperbarui profil. Silakan coba lagi.");
    }
  };

  return (
    <div className="profil-container">
      <div className="back-button2" onClick={() => navigate("/user")}>
        &lt; Back
      </div>
      <div className="profil-container1">
        <div className="profil-form">
          <h1 className="edit-text">EDIT PROFIL</h1>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <form onSubmit={handleSave}>
            <div className="input2-group">
              <div className="iconForm">
                <img src={icon1} alt="icon-username" />
              </div>
              <input
                type="text"
                name="username"
                placeholder="Username.."
                value={profil.username}
                onChange={handleChange}
              />
            </div>
            <div className="input2-group">
              <div className="iconForm">
                <img src={icon2} alt="icon-wa" />
              </div>
              <PhoneInput
                country={"id"}
                value={profil.whatsapp}
                onChange={handlePhoneChange}
                inputStyle={{ width: "100%", height: "45px", fontSize: "16px" }}
                buttonStyle={{ background: "#f1f1f1", borderRadius: "5px 0 0 5px" }}
              />
            </div>
            <div className="input2-group">
              <div className="iconForm">
                <img src={icon3} alt="icon-pass" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Isi Password.."
                value={profil.password}
                onChange={handleChange}
              />
            </div>
            <div className="input2-group">
              <div className="iconForm">
                <img src={icon4} alt="icon-cpass" />
              </div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Konfirmasi Password.."
                value={profil.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="btn-group2">
              <button type="submit" className="btn-save">
                Simpan
              </button>
            </div>
          </form>
        </div>
        <div className="profil-logo">
          <div className="logox">
            <img src={logo} alt="logo" />
            <p>APP.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
