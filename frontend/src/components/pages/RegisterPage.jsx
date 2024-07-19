import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Подключение Bootstrap
import '../../styles/Auth.css';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const { registerUser, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        logoutUser();
        navigate('/register');
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(e);
    };
    return (
        <div className="auth-form-container">
            <h2 className="auth-form-title">Register</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <input type="text" name="username" placeholder="Username" className="form-control" />
                <input type="email" name="email" placeholder="Email" className="form-control" />
                <input type="password" name="password" placeholder="Password" className="form-control" />
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Sign up</button> 
                    <button onClick={() => navigate('/login')} className="btn btn-outline-primary">Sign in</button> 
                </div>
            </form>
        </div>
    )
}

export default RegisterPage;