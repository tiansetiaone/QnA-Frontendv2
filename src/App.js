import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './router/AppRouter';
import { AuthProvider } from './context/AuthContext'; // Tambahkan AuthProvider
import './styles/main.css';

function App() {
  return (
    <AuthProvider> {/* Tambahkan ini */}
      <Router>
        <AppRouter />
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider> 
  );
}

export default App;
