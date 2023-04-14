import httpClient from "@/services/http.service";

const authService = {
    postAuth(data) {
        return httpClient.post(`api/login`, data)
    },
    postRegister(data) {
        return httpClient.post(`api/register`, data)
    },
    postLogout() {
        return httpClient.post(`api/logout`)
    },
}

export default authService;
