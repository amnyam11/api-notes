import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/AuthContext';

const RegisterPage = () => {
    const { registerUser, logoutUser } = useContext(AuthContext);
    useEffect(() => {
        logoutUser();
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(e);
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" />
            <input type="email" name="email" placeholder="Email"/>
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Sign up</button> 
        </form>
    )
}

export default RegisterPage
