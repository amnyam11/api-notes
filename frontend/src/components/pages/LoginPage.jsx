import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Подключение Bootstrap
import '../../styles/Auth.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { loginUser, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        logoutUser();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(e);
    };
    return (   
        <div className="auth-form-container">
            <h2 className="auth-form-title">Login</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <input type="text" name="username" placeholder="Username" className="form-control" />
                <input type="password" name="password" placeholder="Password" className="form-control" />
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Sign in</button> 
                    <button onClick={() => navigate('/register')} className="btn btn-outline-primary">Sign up</button> 
                </div>
            </form>
        </div>
    )
}

export default LoginPage;