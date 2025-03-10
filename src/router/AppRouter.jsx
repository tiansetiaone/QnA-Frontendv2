import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../pages/ProtectedRoute';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Answer from '../pages/AnswerQuestions';
import QnAList from '../pages/QnAList';
import AdminDashboard from '../pages/AdminDashboard';
import UserDashboard from '../pages/UserDashboard';
import Category from '../pages/ManageCategories';
import Setting from '../pages/SettingDashboard';
import QnAListUser from '../pages/QnAListUser';
import EditProfil from '../pages/Profile';
import AskQuestion from '../pages/AskQuestion';
import BotChat from "../pages/BotChat";
import BotChatAdmin from "../pages/BotChatAdmin";
import QrPage from "../pages/QrPage";
import ManageKeywords from '../pages/ManageKeywords';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import SimilarQuestionsPage from '../pages/SimilarQuestionsPage';

const AppRouter = () => {
  const { user } = useAuth(); // Mengambil user dari AuthContext

  return (
    <Routes>
      {/* Route Publik */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
      {/* Route untuk User dan Admin */}
      <Route element={<ProtectedRoute user={user} allowedRoles={['user', 'admin']} />}>
    <Route path="/user" element={<UserDashboard />} />
    <Route path="/user/list" element={<QnAListUser />} />
    <Route path="/user/edit" element={<EditProfil />} />
    <Route path="/user/question/add" element={<AskQuestion />} />
    <Route path="/user/bot" element={<BotChat />} />
</Route>
      
      {/* Route khusus Admin */}
      <Route element={<ProtectedRoute user={user} allowedRoles={['admin', 'admin_group', 'narasumber']} />}>
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/admin/list" element={<QnAList />} />
    <Route path="/admin/category" element={<Category />} />
    <Route path="/admin/setting" element={<Setting />} />
    <Route path="/admin/qr" element={<QrPage />} />
    <Route path="/admin/:groupId/manage-keywords" element={<ManageKeywords />} />
    <Route path="/admin/bot" element={<BotChatAdmin />} />
    <Route path="/:questionId/answers" element={<Answer />} />
</Route>
      
      {/* Route yang tidak memerlukan otorisasi */}
      <Route path="/similar-questions" element={<SimilarQuestionsPage />} />
    </Routes>
  );
};

export default AppRouter;
