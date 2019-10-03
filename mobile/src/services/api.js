import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.51:3431',
});

export default api;