import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 
import { AuthProvider } from './context/AuthContext';

import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import PrivateRoute from './utils/PrivateRoute';

function App() {

  return (
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute redirectTo="/login" />}>
              <Route path="/" element={<HomePage />} />
            </Route>            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </AuthProvider>
      </Router>

  );
}

export default App; 