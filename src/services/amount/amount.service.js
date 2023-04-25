import httpClient from "@/services/http.service";

const amountService = {
  getAmounts() {
    return httpClient.get(`api/analytics/get-low-amount-products`)
  },
}

export default amountService;
