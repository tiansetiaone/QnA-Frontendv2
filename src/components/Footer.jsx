import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} QnA Application</p>
    </footer>
  );
};

export default Footer;
