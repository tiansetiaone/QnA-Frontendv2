import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axiosConfig";
import { searchQuestions } from "../services/api"; // Fungsi API pencarian;
import { useLocation } from "react-router-dom";
import "../styles/Qnalist.css";
import logo from "../assets/logos.png";
import icon9 from "../assets/logoff.png"; // Path menuju file logo

const QnAList = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
  const [questions, setQuestions] = useState([]);
  const [ setCategories] = useState([]);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [selectedCategory] = useState(""); // Filter kategori
  const [selectedStatus, setSelectedStatus] = useState(""); // Filter status
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const questionsPerPage = 5; // Jumlah pertanyaan per halaman
  const navigate = useNavigate();
  const loggedInAdminId = localStorage.getItem("adminId");
  const loggedInAdminGroup = localStorage.getItem("adminGroup");
  // const loggedInAdminGroupId = localStorage.getItem("group_id");
  const isNarasumber = Number(localStorage.getItem("is_narasumber"));
  const [filterByAdmin, setFilterByAdmin] = useState("all");
  


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
  


  // Fetch data pertanyaan dan kategori dari API
  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
}, [setCategories]); 

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

  // Fungsi untuk menangani navigasi saat tombol "Jawab" diklik
  const navigateToAnswer = (questionId) => {
    navigate(`/${questionId}/answers`);
  };


  const filteredQuestions = questions.filter((q) => {
    const assignedToMe = Number(q.assigned_to) === Number(loggedInAdminId);
    // const isFromMyGroup = String(q.group_id) === String(loggedInAdminGroupId);
    // const assignedToMyGroup = String(q.assigned_to) === String(loggedInAdminGroup);   
    
    if (isNarasumber === 0) {
      console.log("User is not a Narasumber.");
      const result =
        filterByAdmin === "all" &&
        (selectedCategory === "" || Number(q.category_id) === Number(selectedCategory)) &&
        (selectedStatus === "" || String(q.status) === String(selectedStatus));
      return result;
    }
  
    if (isNarasumber === 1) {
      console.log("User is a Narasumber.");
      if (filterByAdmin === "all") {
        const result =
          (selectedCategory === "" || Number(q.category_id) === Number(selectedCategory)) &&
          (selectedStatus === "" || String(q.status) === String(selectedStatus));
        return result;
      }
  
      if (filterByAdmin === "assigned") {
        const result =
          assignedToMe &&
          (selectedCategory === "" || Number(q.category_id) === Number(selectedCategory)) &&
          (selectedStatus === "" || String(q.status) === String(selectedStatus));
        return result;
      }
  
      // if (filterByAdmin === "group") {
      //   const result =
      //   isFromMyGroup && 
      //   assignedToMyGroup &&
      //   (selectedCategory === "" || Number(q.category_id) === Number(selectedCategory)) &&
      //   (selectedStatus === "" || String(q.status) === String(selectedStatus));
  
      //   console.log("Result for filter 'group':", result);
      //   return result;
      // }
    }

    return false;
  });
  
  
  // Hitung data untuk paginasi
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  

    const paginate = (direction) => {
        if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else if (direction === "next" && currentPage < Math.max(1, Math.ceil(filteredQuestions.length / questionsPerPage))) {
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

const handleCopy = (question) => {
  const copyText = `
    Nama: ${question.username}
    Nomor: +${question.whatsapp_number}
    Tanggal: ${new Date(question.created_at).toLocaleDateString()}
    Waktu: ${new Date(question.created_at).toLocaleTimeString()}
    Kategori: ${question.category_name}
    Pertanyaan: ${question.question_text}
    Jawaban: ${question.answer_text || "Belum ada jawaban"}
    Status: ${question.status === "answered" ? "Sudah Dijawab" : "Belum Dijawab"}
  `;

  navigator.clipboard
    .writeText(copyText)
    .then(() => alert("Informasi berhasil disalin ke clipboard"))
    .catch((err) => console.error("Gagal menyalin teks:", err));
};

const handleDeleteQuestion = async (questionId) => {
  if (!window.confirm("Apakah Anda yakin ingin menghapus pertanyaan ini?")) {
    return;
  }

  try {
    const response = await axios.delete(`/questions/${questionId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 200) {
      setQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q.id !== questionId)
      );
      alert("Pertanyaan berhasil dihapus.");
    } else {
      throw new Error("Penghapusan tidak berhasil");
    }
  } catch (error) {
    console.error("Gagal menghapus pertanyaan:", error);
    alert("Terjadi kesalahan saat menghapus pertanyaan.");
  }
};


// console.log("Group ID admin yang login:", loggedInAdminGroupId);
// console.log("Admin Group yang login:", loggedInAdminGroup);



  return (
    <div className="list-container">
      <header>
        <div className="back-button" onClick={() => navigate("/admin")}>
          &lt; Back
        </div>
        <div className="header-content">
          <div className="logo-qna">
            <img src={logo} alt="Q&A Logo" />
          </div>
          <h1 className="title-lookAsk">Riwayat Pertanyaan</h1>
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



      {/* Filter Dropdown */}
      <div className="filter-container">
        <div className="cari-container">
        <form className="search-form" onSubmit={handleSearch}>
  <input
    type="text"
    value={searchQuery}
    onChange={handleInputChange}
    placeholder="Cari kata kunci pertanyaan..."
  />
  <button type="submit">Cari</button>
</form>

      </div>
      </div>
      <div className="filter-container2">
      <div className="filter">
  <label htmlFor="filterByAdmin">Pertanyaan:</label>
  <select
                id="filterByAdmin"
                value={filterByAdmin}
                onChange={(e) => setFilterByAdmin(e.target.value)}
            >
                <option value="all">Semua Pertanyaan</option>
                <option value="assigned">Pertanyaan yang Ditugaskan ke Saya</option>
                {/* <option value="group">Pertanyaan dari Grup Saya</option> */}
            </select>
</div>
        <div className="filter">
          <label htmlFor="status">Pilih Status:</label>
          <select
            id="status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Semua</option>
            <option value="answered">Sudah Dijawab</option>
            <option value="pending">Belum Dijawab</option>
          </select>
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
  {(searchQuery.trim() === "" || searchResults.length === 0
    ? currentQuestions
    : searchResults
  ).map((q) => {
        const assignedToMe =
          Number(q.assigned_to) === Number(loggedInAdminId) ||
          Number(q.assigned_to) === Number(loggedInAdminGroup);

        // Kondisi tombol disabled berdasarkan is_narasumber
        const isButtonDisabled = isNarasumber === 0 || !assignedToMe ;
        const isButtonDisabled2 = !(loggedInAdminId || (isNarasumber === 1 && assignedToMe));

        return (
          <li style={{ listStyle: "none" }} key={q.id}>
            <div className="question-card-qna">
              <p className="details">
                {q.username} - (+{maskPhoneNumber(q.whatsapp_number || "")}) -{" "}
                {new Date(q.created_at).toLocaleDateString()} -{" "}
                {new Date(q.created_at).toLocaleTimeString()} (Kategori:{" "}
                {q.category_name})
              </p>
              <p className="question">
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
                    marginRight: 27,
                  }}
                >
                  {expandedQuestion === q.id ? "Tutup Jawaban" : "Lihat Jawaban"}
                </button>
                <p>
                  <strong>Status:</strong>{" "}
                  {q.status === "answered" ? "Sudah Dijawab" : "Belum Dijawab"}
                </p>
              </div>
              {expandedQuestion === q.id && (
                <div className="answer-section">
                  <p>
                    <strong>Jawaban:</strong>{" "}
                    {q.answer_text || "Belum ada jawaban"}
                  </p>
                  <button
                    className="btn-copy"
                    onClick={() => handleCopy(q)}
                    style={{
                      color: "white",
                      textDecoration: "none",
                      cursor: "pointer",
                      padding: 5,
                    }}
                  >
                    Salin
                  </button>
                </div>
              )}
<div className="list-button">
              {/* Tombol Jawab */}
              {q.status === "pending" && (
                <button
                  className={`btn-submit-qna ${isButtonDisabled ? "btn-disabled" : ""}`}
                  onClick={() => navigateToAnswer(q.id)}
                  disabled={isButtonDisabled}
                >
                  Jawab
                </button>
              )}

              {/* Tombol Hapus */}
              {(loggedInAdminGroup || loggedInAdminId) && (
                <button
                  className={`btn-delete ${isButtonDisabled2 ? "btn-disabled" : ""}`}
                  onClick={() => handleDeleteQuestion(q.id)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 2rem",
                    cursor: "pointer",
                  }}
                  disabled={isButtonDisabled2}
                >
                  Hapus
                </button>
              )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  )}
</div>


  {/* Pagination Controls */}
  {searchResults.length === 0 && (
    <div className="pagination">
      <button
        onClick={() => paginate("prev")}
        disabled={currentPage === 1}
        style={{ marginRight: "10px" }}
      >
        &lt; Prev
      </button>
      <span>
        Halaman {currentPage} dari{" "}
        {Math.ceil(filteredQuestions.length / questionsPerPage)}
      </span>
      <button
        onClick={() => paginate("next")}
        disabled={
          currentPage === Math.ceil(filteredQuestions.length / questionsPerPage)
        }
        style={{ marginLeft: "10px" }}
      >
        Next &gt;
      </button>
    </div>
  )}
</div>
  );
};

export default QnAList;
