import axios from 'axios';
import BASE_URL from "./variables";

const ApiUrl = BASE_URL;

const api = axios.create({
    baseURL: ApiUrl,
});

export default api;
