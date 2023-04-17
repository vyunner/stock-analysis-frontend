import httpClient from "@/services/http.service";

const authService = {
    postAuth(data) {
        return httpClient.post(`api/auth/login`, data)
    },
    postRegister(data) {
        return httpClient.post(`api/auth/register`, data)
    },
    postLogout() {
        return httpClient.post(`api/auth/logout`)
    },
}

export default authService;
