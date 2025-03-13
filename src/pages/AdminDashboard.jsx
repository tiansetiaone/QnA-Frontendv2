import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";
import logo from "../assets/logos.png";
import icon6 from "../assets/history.png"; // Path menuju file logo
import icon7 from "../assets/list.png"; // Path menuju file logo
import icon9 from "../assets/logoff.png"; // Path menuju file logo
import icon10 from "../assets/information.png"; // Path menuju file logo
import icon14 from "../assets/keyword.png"; // Path menuju file logo
import icon15 from "../assets/koneksi.png"; // Path menuju file logo

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const groupId = localStorage.getItem("group_id");

  useEffect(() => {
    if (!groupId) {
      setError("Group ID tidak ditemukan. Silakan login ulang atau hubungi administrator.");
    }
  }, [groupId]);

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

  const handleManageKeywords = () => {
    if (groupId) {
      navigate(`/admin/${groupId}/manage-keywords`);
    } else {
      setError("Group ID tidak ditemukan. Silakan login ulang.");
    }
  };

  if (!groupId) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  const backgroundColor1 = {
    backgroundColor: "#298B8B",
    color: "white",
  };
  const backgroundColor2 = {
    background: "linear-gradient(to right, #2C736D, #53D9CE)",
    color: "#2C736D",
  };


  return (
    <div className="admin-dashboard">
      <div className="logout-btn">
        <img src={icon9} alt="Logout" onClick={handleLogout} title="Logout" />
      </div>
      <div className="logo1-container">
        <img src={logo} alt="Q&A Logo" />
      </div>

      <form className="search-form" onSubmit={(e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
          setError("Masukkan kata kunci untuk mencari pertanyaan.");
          return;
        }
        navigate("/admin/list", { state: { searchQuery } });
      }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari kata kunci pertanyaan..."
        />
        <button type="submit">Cari</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="group-form-admin">
        <div className="input1-group">
          <div className="iconForm2">
            <img src={icon6} alt="Riwayat Pertanyaan" />
          </div>
          <div className="card" style={backgroundColor1} onClick={() => navigate("/admin/list")}>Riwayat Pertanyaan</div>
        </div>
        <div className="input1-group">
          <div className="iconForm2" style={backgroundColor2}>
            <img src={icon7} alt="icon-username" />
          </div>
          <div className="card" onClick={() => navigate("/admin/category")}>
            Atur Kategori
          </div>
        </div>
        <div className="input1-group">
          <div className="iconForm2">
            <img src={icon14} alt="icon-username" />
          </div>
          <div
            className="card"
            style={backgroundColor1}
            onClick={handleManageKeywords}
            title="Klik untuk mengelola keyword grup"
          >
            Atur Keywords Group
          </div>
        </div>
        <div className="input1-group">
          <div className="iconForm2" style={backgroundColor2}>
            <img src={icon10} alt="icon-username" />
          </div>
          <div className="card" onClick={() => navigate("/admin/bot")}>
            Cara Menggunakan Bot Chat
          </div>
        </div>
        <div className="input1-group">
          <div className="iconForm2">
            <img src={icon15} alt="icon-username" />
          </div>
          <div
            className="card"
            style={backgroundColor1}
            onClick={() => navigate("/admin/qr")}
            title="Klik untuk mengelola keyword grup"
          >
            Hubungkan Perangkat Bot
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
