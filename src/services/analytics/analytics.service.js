import httpClient from "@/services/http.service";

const analyticsService = {
  getAnalytics() {
    return httpClient.get(`api/analytics/get-top-sold-and-unsold`)
  },
}

export default analyticsService;
