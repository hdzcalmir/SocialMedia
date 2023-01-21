import axios from 'axios';

export const makeRequest = axios.create({
    baseURL: "http://localhost:8080/server/",
    // s ovim saljemo access token backend serveru
    withCredentials: true
})