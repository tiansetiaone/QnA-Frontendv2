import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axiosConfig";
import { searchQuestions } from "../services/api"; // Fungsi API pencarian
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation
import "../styles/Qnalist.css";
import logo from "../assets/logos.png";
import icon9 from "../assets/logoff.png"; // Path menuju file logo

const QnAList = () => {
  const { t } = useTranslation(); // Gunakan useTranslation
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(""); // Filter kategori
  const [selectedStatus, setSelectedStatus] = useState(""); // Filter status
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const questionsPerPage = 5; // Jumlah pertanyaan per halaman
  const navigate = useNavigate();
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
            setError(t("no_matching_questions", { query: initialSearchQuery }));
          }
        } catch (err) {
          console.error("Error searching questions:", err);
          setError(t("search_error"));
        } finally {
          setIsLoading(false);
        }
      }
    };

    searchAutomatically();
  }, [initialSearchQuery, t]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
    setSearchResults([]); // Reset hasil pencarian

    if (!searchQuery.trim()) {
      setError(t("enter_search_term"));
      return;
    }

    try {
      setIsLoading(true);
      const results = await searchQuestions(searchQuery);
      setSearchResults(results);
      if (results.length === 0) {
        setError(t("no_matching_questions", { query: searchQuery }));
      }
    } catch (err) {
      console.error("Error searching questions:", err);
      setError(t("search_error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="list-container">
      <header>
        <div className="back-button" onClick={() => navigate(-1)}>
          {t("back")}
        </div>
        <div className="header-content">
          <div className="logo-qna">
            <img src={logo} alt={t("logo_alt")} />
          </div>
          <h1 className="title-lookAsk">{t("view_questions")}</h1>
        </div>
        <div className="logout-btn-qna">
          <img
            src={icon9}
            alt={t("logout_icon_alt")}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            style={{ cursor: "pointer", width: "30px", height: "30px" }}
            title={t("logout")}
          />
        </div>
      </header>

      <div className="filter-container">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("search_placeholder")}
          />
          <button type="submit">{t("search")}</button>
        </form>
        <div className="filter">
          <label htmlFor="status">{t("select_status")}:</label>
          <select
            id="status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">{t("all_status")}</option>
            <option value="answered">{t("answered")}</option>
            <option value="pending">{t("unanswered")}</option>
          </select>
        </div>
      </div>

      {/* Daftar Pertanyaan */}
      <div className="question-list">
        {isLoading ? (
          <p>{t("loading")}</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <ul>
            {searchResults.map((q) => (
              <li key={q.id}>
                <div>{q.question_text}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QnAList;
