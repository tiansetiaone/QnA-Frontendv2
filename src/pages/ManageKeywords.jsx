import React, { useState, useEffect, useCallback } from "react";
import axios from "../services/axiosConfig";
import "../styles/ManageKeywords.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logos.png";
import icon9 from "../assets/logoff.png"; 

const ManageKeywords = () => {
  const storedGroupId = localStorage.getItem("group_id");
  const [keywords, setKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fungsi logout
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

  // Fungsi untuk mengambil data keyword berdasarkan group_id
  const fetchKeywords = useCallback(async () => {
    if (!storedGroupId) {
      setError("Group ID tidak ditemukan. Silakan login ulang.");
      return;
    }

    try {
      // Menyesuaikan endpoint dengan group_id yang ada di localStorage
      const response = await axios.get(`/group-keywords/${storedGroupId}`);
      setKeywords(response.data);
    } catch (error) {
      setError("Gagal mengambil data keywords.");
    }
  }, [storedGroupId]); // Tambahkan storedGroupId sebagai dependency

  // Mengambil data keywords saat storedGroupId berubah
  useEffect(() => {
    fetchKeywords();
  }, [fetchKeywords]); // fetchKeywords sudah cukup sebagai dependency


// Fungsi untuk menambah keyword
const addKeyword = async () => {
  if (!newKeyword) {
    setError("Keyword tidak boleh kosong.");
    return;
  }

  if (!storedGroupId) {
    setError("Group ID tidak ditemukan.");
    return;
  }

  try {
    // Mengirimkan group_id melalui body, bukan URL path
    await axios.post(`/group-keywords/add`, { keyword: newKeyword, group_id: storedGroupId });
    setNewKeyword(""); // Reset input
    fetchKeywords(); // Refresh data setelah menambah keyword
  } catch (error) {
    setError("Gagal menambahkan keyword.");
  }
};


  // Fungsi untuk menghapus keyword
  const deleteKeyword = async (id) => {
    if (!storedGroupId) {
      setError("Group ID tidak ditemukan.");
      return;
    }

    try {
      await axios.delete(`/group-keywords/${id}`, {
        data: { group_id: storedGroupId },
      });
      fetchKeywords(); // Refresh setelah penghapusan
    } catch (error) {
      setError("Gagal menghapus keyword.");
    }
  };

  return (
        <div className="keyword-container">
         <header className="header-keyword">
                  <div className="back-button" onClick={() => navigate("/admin")}>
                    &lt; Back
                  </div>
                  <div className="header-content">
                    <div className="logo-qna">
                      <img src={logo} alt="Q&A Logo" />
                    </div>
                    <h1 className="title-lookAsk">Atur Keywords</h1>
                  </div>
                  <div className="logout-btn-qna">
                    <img
                      src={icon9}
                      alt="icon logoff"
                      onClick={handleLogout}
                      style={{ cursor: "pointer", width: "30px", height: "30px" }}
                      title="Logout"
                    />
                  </div>
                </header>
                <div className="formkeyword-container">
                <h2>Manage Keywords for Group</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="keyword-main">
    <div className="list-keyword">
      <ul>
        {keywords.map((k , index) => (
          <li key={k.id}>
            {index + 1}.{k.keyword} <button className="delete-btn" onClick={() => deleteKeyword(k.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
    <div className="input-keyword">
    <input
        type="text"
        placeholder="Masukkan keyword"
        value={newKeyword}
        onChange={(e) => setNewKeyword(e.target.value)}
      />
      <button onClick={addKeyword}>Submit</button>
      </div>
    </div>
    </div>
  );
};

export default ManageKeywords;
