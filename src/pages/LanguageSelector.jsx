import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { setUserLanguage } from '../services/api';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState('');

  // Efek untuk memuat daftar bahasa dari API
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/i18n/languages');
        if (!response.ok) {
          const errorMessage = `Error: ${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        }
        const data = await response.json();
        setLanguages(data.languages);
      } catch (err) {
        console.error('Failed to fetch languages:', err);
        setError(`Failed to fetch languages: ${err.message}`);
      }
    };
    

    fetchLanguages(); // Memanggil fungsi untuk mengambil data bahasa
  }, []); // Dependency kosong karena hanya ingin menjalankan sekali

  // Efek untuk mengganti bahasa sesuai dengan pilihan yang disimpan di localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');  // Menggunakan kunci yang sesuai
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]); // Tambahkan i18n sebagai dependency agar efek dijalankan jika i18n berubah
  
  const changeLanguage = async (lng) => {
    console.log(`Changing language to: ${lng}`); // Debug log
    try {
      i18n.changeLanguage(lng); // Ubah bahasa di frontend
      localStorage.setItem('language', lng); // Simpan bahasa di Local Storage
      console.log('Language changed successfully'); // Debug log
  
      // Jika Anda memiliki endpoint backend untuk menyimpan preferensi
      await setUserLanguage(lng); 
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };  

  if (error) return <p>{error}</p>;

  return (
    <select onChange={(e) => changeLanguage(e.target.value)} value={i18n.language}>
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang === 'en' ? 'English' : 'Bahasa Indonesia'}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
