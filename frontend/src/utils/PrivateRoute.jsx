import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoute = ({ redirectTo }) => {
  const authTokens = localStorage.getItem('authTokens');
  const isAuthenticated = authTokens !== null; 

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;