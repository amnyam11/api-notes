import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Подключение Bootstrap
import '../../styles/Auth.css';

const LoginPage = () => {
    const { loginUser, logoutUser } = useContext(AuthContext);

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
                <button type="submit" className="btn btn-primary">Log in</button> 
            </form>
        </div>
    )
}

export default LoginPage;