import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axiosConfig";
import { searchQuestions } from "../services/api"; // Fungsi API pencarian;
import { useLocation } from "react-router-dom";
import "../styles/QnalistUser.css";
import logo from "../assets/logos.png";
import icon9 from "../assets/logoff.png"; // Path menuju file logo

const QnAListUser = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [questions, setQuestions] = useState([]);
  const [setCategories] = useState([]);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [selectedCategory] = useState(""); // Filter kategori
  const [selectedStatus, setSelectedStatus] = useState(""); // Filter status
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const questionsPerPage = 5; // Jumlah pertanyaan per halaman
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id"); // Ambil user_id dari localStorage
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [filterByUser, setFilterByUser] = useState("my"); // State untuk filter user

  const location = useLocation();
  const initialSearchQuery = location.state?.searchQuery || "";

  useEffect(() => {
    const searchAutomatically = async () => {
      if (initialSearchQuery) {
        setSearchQuery(initialSearchQuery);
        try {
          setIsLoading(true);
          const results = await searchQuestions(initialSearchQuery);
          setSearchResults(results);
          if (results.length === 0) {
            setError(`Tidak ada pertanyaan yang cocok dengan "${initialSearchQuery}".`);
          }
        } catch (err) {
          console.error("Error searching questions:", err);
          setError("Gagal mencari pertanyaan. Silakan coba lagi.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    searchAutomatically();
  }, [initialSearchQuery]);

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

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
    setSearchResults([]); // Reset hasil pencarian

    if (!searchQuery.trim()) {
      setError("Masukkan kata kunci untuk mencari pertanyaan.");
      return;
    }

    try {
      setIsLoading(true); // Tampilkan indikator loading
      console.log(`Searching for: ${searchQuery}`);
      const results = await searchQuestions(searchQuery); // Memanggil fungsi API
      console.log("Search Results:", results);
      setSearchResults(results); // Simpan hasil pencarian
      if (results.length === 0) {
        setError(`Tidak ada pertanyaan yang cocok dengan "${searchQuery}".`);
      }
    } catch (err) {
      console.error("Error searching questions:", err);
      setError("Gagal mencari pertanyaan. Silakan coba lagi.");
    } finally {
      setIsLoading(false); // Sembunyikan indikator loading
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const questionsResponse = await axios.get("/questions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setQuestions(questionsResponse.data);

      const categoriesResponse = await axios.get("/categories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, [setQuestions, setCategories]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // fetchData sudah didefinisikan sebelumnya

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Jika input kosong, reset hasil pencarian
    if (value.trim() === "") {
      setSearchResults([]); // Kosongkan hasil pencarian
      setError(""); // Kosongkan pesan error
    }
  };

  // Fungsi untuk mengatur pertanyaan yang diperluas
  const toggleAnswer = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  // Fungsi untuk memfilter pertanyaan
  const filteredQuestions = questions.filter((q) => {
    const inMyGroup = Number(q.group_id) === Number(userId); // Filter berdasarkan group_id

    return (
      (selectedCategory === "" || q.category_id === Number(selectedCategory)) && (selectedStatus === "" || q.status === selectedStatus) && (filterByUser === "all" || q.user_id === parseInt(userId) || (filterByUser === "group" && inMyGroup))
    );
  });

  // Hitung data untuk paginasi
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  // Fungsi untuk navigasi halaman
  const paginate = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < Math.ceil(filteredQuestions.length / questionsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Fungsi untuk menyamarkan nomor telepon
  const maskPhoneNumber = (phoneNumber) => {
    // Periksa apakah phoneNumber valid
    if (!phoneNumber || typeof phoneNumber !== "string") {
      return "Invalid phone number";
    }

    const length = phoneNumber.length;

    // Hitung setengah panjang nomor telepon (dibulatkan ke bawah)
    const halfLength = Math.floor(length / 2);

    // Pisahkan bagian awal dan bagian akhir yang akan disamarkan
    const visiblePart = phoneNumber.slice(0, length - halfLength);
    const maskedPart = "x".repeat(halfLength);

    return visiblePart + maskedPart;
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pertanyaan ini?")) {
      try {
        await axios.delete(`/questions/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setQuestions(questions.filter((q) => q.id !== id));
      } catch (error) {
        console.error("Gagal menghapus pertanyaan:", error);
      }
    }
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditedText(text);
  };

  const handleSave = async (id) => {
    try {
      await axios.put(
        `/questions/${id}/edit`,
        { text: editedText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  return (
    <div className="list-container">
      <header>
        <div className="back-button" onClick={() => navigate("/user")}>
          &lt; Back
        </div>
        <div className="header-content">
          <div className="logo-qna">
            <img src={logo} alt="Q&A Logo" />
          </div>
          <h1 className="title-lookAsk">Riwayat Pertanyaan</h1>
        </div>
        <div className="logout-btn-qna">
          <img src={icon9} alt="icon logoff" onClick={handleLogout} style={{ cursor: "pointer", width: "30px", height: "30px" }} title="Logout" />
        </div>
      </header>

      {/* Filter Dropdown */}
      <div className="filter-container">
        <div className="cari-container">
          <form className="search-form" onSubmit={handleSearch}>
            <input type="text" value={searchQuery} onChange={handleInputChange} placeholder="Cari kata kunci pertanyaan..." />
            <button type="submit">Cari</button>
          </form>
        </div>
        <div className="filter-container2">
        <div className="filter">
          <label htmlFor="status">Pilih Status:</label>
          <select id="status" value={filterByUser} onChange={(e) => setFilterByUser(e.target.value)}>
            <option value="all">Semua Pertanyaan</option>
            <option value="my">Pertanyaan Saya</option>
          </select>
        </div>
        <div className="filter">
          <label htmlFor="status">Pilih Status:</label>
          <select id="status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="">Semua</option>
            <option value="answered">Sudah Dijawab</option>
            <option value="pending">Belum Dijawab</option>
          </select>
        </div>
        </div>
      </div>

      {/* Daftar Pertanyaan */}
      <div className="question-list">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <ul className="numbered-list">
            {(searchQuery.trim() === "" || searchResults.length === 0 ? currentQuestions : searchResults).map((q) => (
              <li className="listask" style={{ listStyle: "none" }} key={q.id}>
                <div className="question-card-qna">
                  <p className="details">
                    {q.username} - (+{maskPhoneNumber(q.whatsapp_number || "")}) - {new Date(q.created_at).toLocaleDateString()} - {new Date(q.created_at).toLocaleTimeString()} (Kategori: {q.category_name})
                  </p>
                  <p className="question">
                    {editingId === q.id ? (
                      <input type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} />
                    ) : (
                      <>
                        <strong>Pertanyaan:</strong> {q.question_text}
                      </>
                    )}
                  </p>
                  <div className="status-link">
                    <button
                      className="answer-link"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleAnswer(q.id);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      {expandedQuestion === q.id ? "Tutup Jawaban" : "Lihat Jawaban"}
                    </button>
                    <p>
                      <strong>Status:</strong> {q.status === "answered" ? "Sudah Dijawab" : "Belum Dijawab"}
                    </p>
                  </div>
                  {expandedQuestion === q.id && (
                    <div className="answer-section">
                      <p>
                        <strong>Jawaban:</strong> {q.answer_text || "Belum ada jawaban"}
                      </p>
                    </div>
                  )}
                  <div className="button-container">
                  {q.status === "pending" && (
                    <button onClick={() => handleDelete(q.id)} className={`delete-btn2 ${q.user_id !== parseInt(userId) ? "btn-disabled" : ""}`} disabled={q.user_id !== parseInt(userId)}>
                      Hapus
                    </button>
                  )}
                  {q.status === "pending" && editingId === q.id ? (
                    <button onClick={() => handleSave(q.id)}>Simpan</button>
                  ) : (
                    q.status === "pending" &&
                    q.user_id === parseInt(userId) && (
                      <button onClick={() => handleEdit(q.id, q.question_text)} className="edit-btn">
                        Edit
                      </button>
                    )
                  )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pagination Controls */}
      {searchResults.length === 0 && (
        <div className="pagination">
          <button onClick={() => paginate("prev")} disabled={currentPage === 1} style={{ marginRight: "10px" }}>
            &lt; Prev
          </button>
          <span>
            Halaman {currentPage} dari {Math.ceil(filteredQuestions.length / questionsPerPage)}
          </span>
          <button onClick={() => paginate("next")} disabled={currentPage === Math.ceil(filteredQuestions.length / questionsPerPage)} style={{ marginLeft: "10px" }}>
            Next &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default QnAListUser;
