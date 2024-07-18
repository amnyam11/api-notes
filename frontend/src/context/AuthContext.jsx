import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);

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
        //setUser(jwtDecode(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));
        console.log("Relocating...")
        navigate('/');

      }
    }catch (error) {
      alert("Something went wrong...");
    }
  };

//   let registerUser = async (e) => {
//     e.preventDefault();
//     try {
//       let response = await axiosInstance.post('register/', {
//         username: e.target.username.value,
//         email: e.target.email.value,
//         password: e.target.password.value,
//       });

//       if (response.status === 201) {
//         alert('Registration successful. You can now login.');
//         navigate('/login');
//       }
//     } catch (error) {
//       alert('Registration failed. Please try again.');
//     }
//   };

//   let logoutUser = () => {
//     setAuthTokens(null);
//     setUser(null);
//     localStorage.removeItem('authTokens');
//     navigate('/login');
//   };

//   let updateToken = async () => {
//     console.log('Updating token');
//     if (!authTokens) {  
//       console.log('No authTokens to update');
//       return;
//     }
//     try {
//       let response = await axiosInstance.post('token/refresh/', {
//         refresh: authTokens.refresh,
//       });

//       let data = response.data;

//       if (response.status === 200) {
//         setAuthTokens(data);
//         setUser(jwtDecode(data.access));
//         localStorage.setItem('authTokens', JSON.stringify(data));
//       }
//     } catch (error) {
//       logoutUser();
//     }
//   };

  let contextData = {
    authTokens:authTokens,
    //user: user,
    loginUser: loginUser,
    //logoutUser: logoutUser,
    //registerUser: registerUser,
  };

//   useEffect(() => {
//     let timeDelta = 1000 * 60 * 4;
//     let interval = setInterval(() => {
//       if (authTokens) {
//         updateToken();
//       }
//     }, timeDelta);

//     return () => clearInterval(interval);
//   }, [authTokens, loading]);

//   useEffect(() => {
//     console.log('Checking localStorage for authTokens');
//     if (localStorage.getItem('authTokens')) {
//       console.log('authTokens found in localStorage');
//       const tokens = JSON.parse(localStorage.getItem('authTokens'));
//       setAuthTokens(tokens);
//       setUser(jwtDecode(tokens.access));
//     } else {
//       console.log('No authTokens found in localStorage');
//     }
//     setLoading(false);
//   }, []);

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};