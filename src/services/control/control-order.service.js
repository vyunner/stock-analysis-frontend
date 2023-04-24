import httpClient from "@/services/http.service";

const controlOrderService = {
  postOrder(data) {
    return httpClient.post(`api/order`, data)
  },
  putOrder(data) {
    return httpClient.put(`api/order/${data.id}`, data)
  },
  deleteOrder(id) {
    return httpClient.delete(`api/order/${id}`)
  },
  getOrders() {
    return httpClient.get(`api/order`)
  },
}

export default controlOrderService;
