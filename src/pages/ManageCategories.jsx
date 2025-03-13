import React, { useState, useEffect } from "react";
import axios from "../services/axiosConfig";
import "../styles/ManageCategories.css";
import logo from "../assets/logos.png";
import icon9 from "../assets/logoff.png"; 
import { useNavigate } from "react-router-dom";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
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

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/categories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategories(response.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const addCategory = async () => {
    if (!newCategoryName.trim()) {
      console.error("Category name is required");
      return;
    }
    try {
      await axios.post(
        "/categories",
        { category_name: newCategoryName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNewCategoryName("");
      fetchCategories();
    } catch (err) {
      console.error("Failed to add category", err);
    }
  };

  const handleEditCategory = async (id) => {
    if (editCategoryName.trim()) {
      try {
        await axios.put(
          `/categories/${id}`,
          { category_name: editCategoryName },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEditCategoryId(null);
        setEditCategoryName("");
        fetchCategories();
      } catch (err) {
        console.error("Failed to update category", err);
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchCategories();
    } catch (err) {
      console.error("Failed to delete category", err);
    }
  };

  const handleKeyPress = (e, id = null) => {
    if (e.key === "Enter") {
      if (id) {
        // Jika ID diberikan, berarti sedang mengedit kategori
        handleEditCategory(id);
      } else {
        // Jika tidak ada ID, berarti sedang menambahkan kategori
        addCategory();
      }
    }
  };

  return (
    <div className="category-container">
     <header className="header-category">
              <div className="back-button" onClick={() => navigate("/admin")}>
                &lt; Back
              </div>
              <div className="header-content">
                <div className="logo-qna">
                  <img src={logo} alt="Q&A Logo" />
                </div>
                <h1 className="title-lookAsk">Atur Kategori</h1>
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
             <div className="category-list-container">
        <div className="category-list-main">
          <ol className="category-list">
            {categories.map((category, index) => (
              <li key={category.id} onClick={() => {
                setEditCategoryId(category.id);
                setEditCategoryName(category.category_name);
              }}>
                {editCategoryId === category.id ? (
                  <>
                    <input
                      type="text"
                      value={editCategoryName}
                      onChange={(e) => setEditCategoryName(e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e, category.id)}
                      onBlur={() => handleEditCategory(category.id)} // Update when the input loses focus
                    />
                  </>
                ) : (
                  <>
                    <span>{index + 1}. {category.category_name}</span>
                    <button className="delete-btn" onClick={() => handleDeleteCategory(category.id)}>
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ol>
        </div>
        <div className="add-category">
          <input
            type="text"
            placeholder="New Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e)} // Handle enter for adding category
          />
          <button onClick={addCategory}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
