import httpClient from "@/services/http.service";

const controlCategoryService = {
    postCategory(data) {
        return httpClient.post(`api/category`, {name: data})
    },
    putCategory(data) {
        return httpClient.put(`api/category/${data.id}`, {name: data.name})
    },
    deleteCategory(id) {
        return httpClient.delete(`api/category/${id}`)
    },
    getCategories() {
        return httpClient.get(`api/category`)
    },
}

export default controlCategoryService;
