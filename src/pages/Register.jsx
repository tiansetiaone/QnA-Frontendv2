import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '../styles/Register.css';
import logo from "../assets/logos.png";
import icon1 from "../assets/username.png";
import icon2 from "../assets/wa-icon.png";
import icon3 from "../assets/pass.png";
import icon4 from "../assets/cpass.png";

const Register = () => {
    const [formData, setFormData] = useState({
      username: '',
      whatsapp_number: '',
      password: '',
      confirmPassword: '',
      role: 'user', 
      token: '', 
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');
      if (token) {
        setFormData(prev => ({ ...prev, token }));
      } else {
        setError('Harap request pada admin grup untuk link registrasinya!');
      }
    }, [location]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handlePhoneChange = (value) => {
      setFormData({ ...formData, whatsapp_number: `${value}` }); // Pastikan format nomor menggunakan "+" untuk internasional
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (formData.password !== formData.confirmPassword) {
        setError("Password dan Konfirmasi Password tidak cocok.");
        return;
      }

      setLoading(true);

      try {
        // Validasi apakah nomor sudah diverifikasi sebelum mengirim form
        const verificationResponse = await axios.get(`/auth/check-verification?whatsapp_number=${formData.whatsapp_number}`);
        if (!verificationResponse.data.verified) {
          setError("Nomor Anda belum diverifikasi di grup WhatsApp!");
          setLoading(false);
          return;
        }

        const { username, whatsapp_number, password, role, token } = formData;

        const response = await axios.post("/auth/register", {
          username,
          whatsapp_number,
          password,
          role,
          token,
        });

        if (response.data.group_id) {
          localStorage.setItem("group_id", response.data.group_id);
        }

        navigate("/"); 
      } catch (err) {
        setError(err.response?.data?.message || "Registrasi gagal.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="register-container">
        <div className="register-left">
          <h1 className='signIn'>DAFTAR</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="iconForm">
                <img src={icon1} alt="icon-username" />
              </div>
              <input
                type="text"
                placeholder="Username.."
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <div className="iconForm">
                <img src={icon2} alt="icon-wa" />
              </div>
              <PhoneInput 
                country={'id'}
                value={formData.whatsapp_number}
                onChange={handlePhoneChange}
                inputProps={{
                  name: 'whatsapp_number',
                  required: true,
                }}
              />
            </div>
            <div className="input-group">
              <div className="iconForm">
                <img src={icon3} alt="icon-pass" />
              </div>
              <input
                type="password"
                placeholder="Isi Password.."
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <div className="iconForm">
                <img src={icon4} alt="icon-cpass" />
              </div>
              <input
                type="password"
                placeholder="Konfirmasi Password.."
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="btn-group">
              {error && <p className="error">{error}</p>}
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Mendaftar..." : "Submit"}
              </button>
              <p className="redirect-login">
                Sudah Punya Akun? <a href="/">Masuk disini</a>
              </p>
            </div>
          </form>
        </div>
        <div className="register-right">
          <div className="logo">
            <img src={logo} alt="logo" />
            <p>APP.</p>
          </div>
        </div>
      </div>
    );
};

export default Register;
