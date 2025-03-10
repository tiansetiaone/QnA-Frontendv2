import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/manage-categories">Manage Categories</Link></li>
        <li><Link to="/admin/answer-questions">Answer Questions</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
