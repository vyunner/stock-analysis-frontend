import axios from 'axios';
import authService from "@/services/auth/auth.service";
import router from "@/router";

const API_ENDPOINT = 'http://192.168.0.112/';
let config = {
    baseURL: `${API_ENDPOINT}`,
};

const httpClient = axios.create(config);

const authInterceptor = config =>{
    if (localStorage.getItem('dataUser')) {
        const TOKEN = JSON.parse(localStorage.getItem('dataUser')).token.original.access_token
        config.headers.Authorization = `Bearer ${TOKEN}`;
    }
    return config;
}
httpClient.interceptors.request.use(authInterceptor);
httpClient.interceptors.response.use(
    response => {
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
