import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome_message: "Welcome to Q&A App",
      select_category: "Select Category",
    },
  },
  id: {
    translation: {
      back: "Kembali",
      view_questions: "Lihat Pertanyaan",
      search_placeholder: "Cari pertanyaan...",
      search: "Cari",
      select_status: "Pilih Status",
      all_status: "Semua Status",
      answered: "Sudah Dijawab",
      unanswered: "Belum Dijawab",
      loading: "Memuat...",
      no_matching_questions: "Tidak ada pertanyaan yang cocok dengan \"{{query}}\".",
      search_error: "Gagal mencari pertanyaan. Silakan coba lagi.",
      enter_search_term: "Masukkan kata kunci untuk mencari pertanyaan.",
      logout: "Keluar",
      logout_icon_alt: "Ikon keluar",
      logo_alt: "Logo Q&A",
      welcome_message: "Selamat datang di Aplikasi Q&A",
      select_category: "Pilih Kategori",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
