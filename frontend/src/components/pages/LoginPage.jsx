import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/AuthContext';

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
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Sign in</button> 
        </form>
    )
}

export default LoginPage
