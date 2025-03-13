import React, { useState } from "react";
import "../styles/UserDashboard.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logos.png";
import icon6 from "../assets/history.png"; // Path menuju file logo
import icon11 from "../assets/edit-P.png"; // Path menuju file logo
import icon9 from "../assets/logoff.png"; // Path menuju file logo
import icon10 from "../assets/information.png"; // Path menuju file logo
import icon12 from "../assets/email.png"; // Path menuju file logo
// import icon14 from "../assets/qrcode.png"; // Path menuju file logo

const UserDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults] = useState([]);
  const [isLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("group_id");
      localStorage.removeItem("is_narasumber");
      localStorage.removeItem("user_id");
      localStorage.removeItem("adminGroup");
      localStorage.removeItem("adminId");
      localStorage.removeItem("user");
      navigate("/");
    }
  };
  

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError("Masukkan kata kunci untuk mencari pertanyaan.");
      return;
    }

    // Navigasi ke halaman QnAList dengan query pencarian
    navigate("/user/list", { state: { searchQuery } });
  };

  const backgroundColor1 = {
    backgroundColor: "#298B8B",
    color: "white",
  };
  const backgroundColor2 = {
    background: "linear-gradient(to right, #2C736D, #53D9CE)",
    color: "#2C736D",
  };

  return (
    <div className="user-dashboard">
      <div className="logout-btn">
        <img
          src={icon9}
          alt="icon logoff"
          onClick={handleLogout} // Fungsi logout dipanggil saat gambar diklik
          title="Logout"
        />
      </div>
      <div className="logo1-container">
        <img src={logo} alt="Q&A Logo" />
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari kata kunci pertanyaan..." />
        <button type="submit">Cari</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((question) => (
            <li key={question.id}>{question.question_text}</li>
          ))}
        </ul>
      )}

      <div className="input4-group">
        <div className="iconForm2">
          <img src={icon12} alt="icon-username" />
        </div>
        <div className="card" style={backgroundColor1} onClick={() => navigate("/user/question/add")}>
          Kirim Pertanyaan
        </div>
      </div>
      <div className="input1-group">
        <div className="iconForm2" style={backgroundColor2}>
          <img src={icon6} alt="icon-username" />
        </div>
        <div className="card" onClick={() => navigate("/user/list")}>
          Riwayat Pertanyaan
        </div>
      </div>
      <div className="input1-group">
        <div className="iconForm2">
          <img src={icon11} alt="icon-username" />
        </div>
        <div className="card" style={backgroundColor1} onClick={() => navigate("/user/edit")}>
          Edit Profil
        </div>
      </div>
      <div className="input1-group">
        <div className="iconForm2" style={backgroundColor2}>
          <img src={icon10} alt="icon-username" />
        </div>
        <div className="card" onClick={() => navigate("/user/bot")}>
          Cara Menggunakan Chat Bot
        </div>
      </div>
      {/* <div className="input3-group">
        <h2>Via Whatsapp</h2>
<div className="qr-img">
<img src={icon14} alt="icon-username" />
</div>
      </div> */}
    </div>
  );
};

export default UserDashboard;
