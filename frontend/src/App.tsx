import React from 'react';
// import SearchReposPage from './pages/SearchReposPage';
import { BrowserRouter, Routes, Route } from 'react-router';

import './App.css'; // Ensure you have Tailwind CSS set up
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FavoritesPage from './pages/FavoritesPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path ="/login" element={<LoginPage/>} />
          <Route path ="/register" element={<RegisterPage/>} />
          <Route path ="/favorites" element={<FavoritesPage />} />
          {/* Add login, register routes, and explore routes, and also saved repos */}
        </Routes>
      </BrowserRouter>
  );
};

export default App;
