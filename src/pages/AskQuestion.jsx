import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axiosConfig";
import "../styles/AskQuestion.css";
import logo from "../assets/logos.png";
import icon9 from "../assets/logoff.png";

const AskQuestion = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Perbaikan penggunaan setLoading

  // Ambil kategori dari server
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get("/categories", config); // Endpoint API untuk kategori
        setCategories(response.data); // Simpan data kategori di state
      } catch (err) {
        console.error("Failed to fetch categories:", err.response || err);
        setErrorMessage("Gagal memuat kategori. Silakan coba lagi."); // Tampilkan pesan error
      }
    };

    fetchCategories();
  }, []);

  // Fungsi submit pertanyaan
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input sebelum mengosongkan state
    if (!question) {
      alert("Semua kolom wajib diisi!");
      return;
    }

    setLoading(true); // Set loading saat proses dimulai
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.post(
        "/questions/add",
        { questionText: question, categoryId: category },
        config
      );

      // Reset state setelah berhasil
      setQuestion("");
      setCategory("");
      alert(response.data.message || "Pertanyaan berhasil ditambahkan!");
      navigate("/user/question/add"); // Arahkan ke halaman dashboard pengguna
    } catch (error) {
      console.error("Gagal menambahkan pertanyaan:", error);
      setErrorMessage(
        error.response?.data?.error || "Terjadi kesalahan, coba lagi nanti."
      );
    } finally {
      setLoading(false); // Matikan loading setelah selesai
    }
  };

  // Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="ask-question-container">
      <header className="ask-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          &lt; Back
        </button>
        <div className="header-content">
          <div className="logo-qna">
            <img src={logo} alt="Q&A Logo" />
          </div>
          <h1 className="title-lookAsk">Kirim Pertanyaan</h1>
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
      <div className="askquestion-container">
        <div className="formAskquestion">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form className="ask-form" onSubmit={handleSubmit}>
            <textarea
              className="question-input"
              placeholder="Isi Pertanyaan..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={loading} // Disable input saat loading
            ></textarea>
            <select
              className="category-selector"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading} // Disable select saat loading
            >
              <option value="">Pilih Kategori...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
            <button className="submit-button" type="submit" disabled={loading}>
              {loading ? "Mengirim..." : "Submit"} {/* Indikator loading */}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
