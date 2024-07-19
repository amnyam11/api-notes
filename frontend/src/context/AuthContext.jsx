import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
  let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
  
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let loginUser = async (e) => {
    try {
      let response = await axiosInstance.post('token/', {
        username: e.target.username.value,
        password: e.target.password.value,
      });

      let data = response.data;

      if (response.status === 200) {
        console.log('User logged in successfully');
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));
        console.log("Relocating...")
        navigate('/');

      }
    }catch (error) {
      alert("Something went wrong...");
    }
  };

  let registerUser = async (e) => {
    e.preventDefault();
    try {
      let response = await axiosInstance.post('register/', {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      });

      if (response.status === 201) {
        alert('Registration successful. You can now login.');
        navigate('/login');
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    localStorage.removeItem('authTokens');
    navigate('/login');
  };


  let contextData = {
    user : user, 
    authTokens:authTokens,
    loginUser: loginUser,
    registerUser: registerUser,
    logoutUser : logoutUser,
  };


  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};