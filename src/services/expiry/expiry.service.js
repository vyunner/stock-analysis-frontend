import httpClient from "@/services/http.service";

const expiryService = {
  getExpiry() {
    return httpClient.get(`api/analytics/get-expired-products`)
  },
}

export default expiryService;
