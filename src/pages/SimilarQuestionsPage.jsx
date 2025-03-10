import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchQuestions } from "../services/api"; // Pastikan fungsi API ini ada
import "../styles/Qnalist.css";
import logo from "../assets/logos.png";
import icon9 from "../assets/logoff.png"; // Path menuju file logo

const SimilarQuestionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
    const [expandedQuestion, setExpandedQuestion] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(""); // Filter status
    const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
    const questionsPerPage = 5; // Jumlah pertanyaan per halaman


  useEffect(() => {
    const fetchSimilarQuestions = async () => {
      if (query) {
        setIsLoading(true);
        try {
          const results = await searchQuestions(query);
          setSearchResults(results);
          if (results.length === 0) {
            setError(`Tidak ada pertanyaan yang cocok dengan "${query}".`);
          }
        } catch (err) {
          console.error("Error fetching similar questions:", err);
          setError("Gagal mengambil pertanyaan serupa.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchSimilarQuestions();
  }, [query]);

    // Fungsi logout
    const handleLogout = () => {
      if (window.confirm("Apakah Anda yakin ingin keluar?")) {
        localStorage.removeItem("token");
        localStorage.removeItem("group_id");
        localStorage.removeItem("is_narasumber");
        localStorage.removeItem("user_id");
        localStorage.removeItem("adminGroup");
        navigate("/");
      }
    };


  // Fungsi untuk mengatur pertanyaan yang diperluas
  const toggleAnswer = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  // Fungsi untuk memfilter pertanyaan
  const filteredQuestions = searchResults.filter((q) => {
    return (selectedStatus === "" || q.status === selectedStatus);
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


  
  return (
    <div className="list-container">
      <header>
        <div className="header-content">
          <div className="logo-qna">
            <img src={logo} alt="Q&A Logo" />
          </div>
          <h1 className="title-lookAsk">Pertanyaan Serupa</h1>
        </div>
        <div className="logout-btn-qna">
          <img src={icon9} alt="icon logoff" onClick={handleLogout} style={{ cursor: "pointer", width: "30px", height: "30px" }} title="Logout" />
        </div>
      </header>

 {/* Filter Dropdown */}
 <div className="filter-container">
        <div className="filter">
          <label htmlFor="status">Pilih Status:</label>
          <select id="status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="">Semua</option>
            <option value="answered">Sudah Dijawab</option>
            <option value="pending">Belum Dijawab</option>
          </select>
        </div>
      </div>

      <p>Menampilkan pertanyaan serupa untuk: <strong>{query}</strong></p>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <div className="question-list">
        <ul className="numbered-list">
        {currentQuestions.map((q) => (
            <li style={{ listStyle: "none" }} key={q.id}>
              <div className="question-card-qna">
                <p className="question">
                <p className="details">
                  {q.username} - (+{maskPhoneNumber(q.whatsapp_number || "")}) - {new Date(q.created_at).toLocaleDateString()} - {new Date(q.created_at).toLocaleTimeString()} (Kategori: {q.category_name})
                  </p>
                  <strong>Pertanyaan:</strong> {q.question_text}
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
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="pagination">
  <button
    onClick={() => paginate("prev")}
    disabled={currentPage === 1}
    style={{ marginRight: "10px" }}
  >
    &lt; Prev
  </button>
  <span>
    Halaman {currentPage} dari {Math.ceil(searchResults.length / questionsPerPage)}
  </span>
  <button
    onClick={() => paginate("next")}
    disabled={currentPage === Math.ceil(searchResults.length / questionsPerPage)}
    style={{ marginLeft: "10px" }}
  >
    Next &gt;
  </button>
</div>
    </div>
  );
};

export default SimilarQuestionsPage;
