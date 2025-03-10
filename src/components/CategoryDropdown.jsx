import React from 'react';
import './CategoryDropdown.css';

const CategoryDropdown = ({ categories, onChange }) => {
  return (
    <select className="dropdown" onChange={onChange}>
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>{cat.name}</option>
      ))}
    </select>
  );
};

export default CategoryDropdown;
