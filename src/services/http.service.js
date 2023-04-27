import axios from 'axios';
import authService from "@/services/auth/auth.service";
import router from "@/router";

/** Default config for axios instance */
const API_ENDPOINT = 'http://192.168.0.112/';
let config = {
    baseURL: `${API_ENDPOINT}`,
};

/** Creating the instance for axios */
const httpClient = axios.create(config);

const authInterceptor = config =>{
    if (localStorage.getItem('dataUser')) {
        const TOKEN = JSON.parse(localStorage.getItem('dataUser')).token.original.access_token
        config.headers.Authorization = `Bearer ${TOKEN}`;
    }
    return config;
}

httpClient.interceptors.request.use(authInterceptor);

/** Adding the response interceptors */
httpClient.interceptors.response.use(
    response => {
        /** TODO: Add any response interceptors */
        return response;
    },
    error => {
        if (error.response.status === 401) {
            authService.logout()
        }
        else if (error.response.status === 403) {
            router.push({name: 'auth'})
        }
        return Promise.reject(error);
    }
);

export default httpClient;
