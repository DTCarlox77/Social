import axios from 'axios';

const base_url = 'http://localhost:8000/network/'

export const networkRegister = (data) => {
    return axios.post(base_url+'register/', data);
};

export const networkLogin = (data) => {
    return axios.post(base_url+'login/', data);
};