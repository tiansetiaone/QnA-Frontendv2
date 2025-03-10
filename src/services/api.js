import axios from './axiosConfig';

// Fungsi untuk mendapatkan daftar pertanyaan
export const fetchQuestions = async () => {
    return await axios.get('/questions');
  };

// Fungsi untuk membuat pertanyaan baru
export const createQuestion = async (questionData) => {
  try {
    const response = await axios.post('/questions', questionData);
    return response.data;
  } catch (error) {
    console.error('Failed to create question:', error.response?.data || error.message);
    throw error;
  }
};

// Fungsi untuk mendapatkan kategori
export const fetchCategories = async () => {
  try {
    const response = await axios.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch categories:', error.response?.data || error.message);
    throw error;
  }
};

// Fungsi untuk login pengguna
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post('/auth/login', loginData);
    return response.data;
  } catch (error) {
    console.error('Failed to login:', error.response?.data || error.message);
    throw error;
  }
};

// Fungsi untuk mendaftarkan pengguna
export const registerUser = async (registerData) => {
  try {
    const response = await axios.post('/auth/register', registerData);
    return response.data;
  } catch (error) {
    console.error('Failed to register user:', error.response?.data || error.message);
    throw error;
  }
};

export const searchQuestions = async (searchQuery) => {
  try {
    const response = await axios.post('/questions/search', {
      q: searchQuery, // Parameter pencarian dikirim melalui body
    });
    return response.data.questions; // Hanya ambil array `questions` dari respons
  } catch (error) {
    console.error('Error searching questions:', error.response?.data || error.message);
    throw error;
  }
};


const testAPI = async () => {
  try {
    const response = await axios.get('/questions');
    console.log('Test API Response:', response.data);
  } catch (error) {
    console.error('Test API Error:', error);
  }
};

testAPI();


// Mendapatkan daftar bahasa yang tersedia
export const fetchLanguages = async () => {
  try {
    const response = await axios.get('/api/languages');
    return response.data.languages;
  } catch (error) {
    console.error('Failed to fetch languages:', error.response?.data || error.message);
    throw error;
  }
};

// Menyimpan preferensi bahasa pengguna
export const setUserLanguage = async (language) => {
  try {
    await axios.post('/api/user/language', { language });
  } catch (error) {
    console.error('Failed to set user language:', error.response?.data || error.message);
    throw error;
  }
};


export const sendOtp = async (whatsappNumber, otp) => {
  try {
    const response = await axios.post('/api/otp/send-otp', { whatsappNumber, otp });
    return response.data;
  } catch (error) {
    console.error('Failed to send OTP:', error.response?.data || error.message);
    throw error;
  }
};