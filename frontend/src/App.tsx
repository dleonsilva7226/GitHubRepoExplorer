import React, { useEffect } from 'react';
// import SearchReposPage from './pages/SearchReposPage';
import { BrowserRouter, Routes, Route } from 'react-router';

import './App.css'; // Ensure you have Tailwind CSS set up
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FavoritesPage from './pages/FavoritesPage';
import useAuthStore from './store/authStore';


const App: React.FC = () => {

  const { updateLoginStatus, isAuthenticated }  = useAuthStore();

  useEffect(() => {
      //re-rendering every 15 seconds
      let intervalId = setInterval(()=>{
        console.log("Updating login status...");
        console.log(isAuthenticated);
        updateLoginStatus();
      }, 15000);
  
      //cleanup function
      const cleanup = () => {
        clearInterval(intervalId);
      }
  
      return cleanup;
    }, []);

  
  return (

  <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/explore" element={<SearchReposPage/>} /> */}
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
