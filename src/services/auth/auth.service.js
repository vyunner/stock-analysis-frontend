import httpClient from "@/services/http.service";
import router from "@/router";

const authService = {
    postAuth(data) {
        return httpClient.post(`api/login`, data)
    },
    postRegister(data) {
        return httpClient.post(`api/register`, data)
    },
    logout() {
        localStorage.clear()
        router.push('/auth')
    },
}

export default authService;
