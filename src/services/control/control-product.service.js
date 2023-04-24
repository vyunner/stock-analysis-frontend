import httpClient from "@/services/http.service";

const controlProductService = {
    postProduct(data) {
        return httpClient.post(`api/product`, data)
    },
    putProduct(data) {
        return httpClient.put(`api/product/${data.id}`, data)
    },
    deleteProduct(id) {
        return httpClient.delete(`api/product/${id}`)
    },
    getProducts() {
        return httpClient.get(`api/product`)
    },
}

export default controlProductService;
