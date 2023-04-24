import httpClient from "@/services/http.service";

const controlOrderService = {
  postOrder(data) {
    return httpClient.post(`api/order`, data)
  },
  putOrder(data) {
    return httpClient.put(`api/oder/${data.id}`, data)
  },
  deleteOrder(id) {
    return httpClient.delete(`api/oder/${id}`)
  },
  getOrders() {
    return httpClient.get(`api/oder`)
  },
}

export default controlOrderService;
