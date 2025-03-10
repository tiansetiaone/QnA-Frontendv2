import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axiosConfig";
import "../styles/ForgotPass.css";
import logo from "../assets/logos.png"; // Path menuju file logo
import icon1 from "../assets/wa-icon.png"; // Path menuju file username icon



const ForgotPassword = () => {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Nomor WhatsApp yang dikirim:", whatsappNumber); // Debugging
  
    if (!whatsappNumber) {
      alert("Nomor WhatsApp wajib diisi.");
      return;
    }
  
    try {
      await axios.post("/auth/forgot-password", { whatsapp_number: whatsappNumber });
  
      localStorage.setItem("whatsapp_number", whatsappNumber);
  
      alert("Token reset telah dikirim ke WhatsApp Anda.");
      navigate("/reset-password");
    } catch (error) {
      alert(error.response?.data?.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="login-container">
            <div className="back-button2" onClick={() => navigate(-1)}>
        &lt; Back
      </div>
      <div className="login-left3">
      <h1 className="forGot">Lupa Password</h1>
      <form onSubmit={handleSubmit}>
               <div className="input-group-reg">
                    <div className="iconForm">
                      <img src={icon1} alt="icon-username" />
                    </div>
      <input
  type="text"
  placeholder="Masukkan nomor WhatsApp"
  value={whatsappNumber}
  onChange={(e) => setWhatsappNumber(e.target.value)} 
/>
</div>
        <button className="btn-token" type="submit">Kirim Token</button>
      </form>
      </div>
            <div className="logo-container2">
              <img src={logo} alt="Q&A Logo" />
              <h1>APP.</h1>
            </div>
    </div>
  );
};

export default ForgotPassword;
