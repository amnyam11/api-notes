import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});


axiosInstance.interceptors.request.use(
    (config) => {
        const authTokens = JSON.parse(localStorage.getItem('authTokens'));
        if (authTokens) {
            config.headers.Authorization = `Bearer ${authTokens.access}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default axiosInstance;
