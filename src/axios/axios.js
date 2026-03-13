import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:7000/api',
    // baseURL: 'https://admin.elcanali.site/api',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000,
});

// Request interceptor - attach JWT token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle 401 errors (expired/invalid token)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
        return Promise.reject(error);
    }
);

export default api;
