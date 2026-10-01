import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

export async function register({ username, email, password }) {
    const response = await api.post("/api/register", {
        username,
        email,
        password
    });

    return response.data;
}

export async function login({ email, password }) {
    const response = await api.post('/api/login', {
        email,
        password
    });

    return response.data;
}

export async function logout() {
    const response = await api.post('/api/logout');
    return response.data;
}

export async function getMe() {
    const response = await api.get('/api/get-me');
    return response.data;
}