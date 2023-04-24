import controlProductService from "@/services/control/control-product.service";

const controlProducts = {
  namespaced: true,
  actions: {
    async POST_PRODUCT({commit}, data) {
      try {
        return await controlProductService.postProduct(data)
      } catch (e) {
        console.log(e)
        return e.response
      }
    },
    async PUT_PRODUCT({commit}, data) {
      try {
        return await controlProductService.putProduct(data)
      } catch (e) {
        console.log(e)
        return e.response
      }
    },
    async DELETE_PRODUCT({commit}, id) {
      try {
        return await controlProductService.deleteProduct(id)
      } catch (e) {
        console.log(e)
        return e.response
      }
    },
    async GET_PRODUCTS({commit}) {
      try {
        const {data, status} = await controlProductService.getProducts()
        if (status === 200){
          console.log('GET_PRODUCTS', data.data)
          commit('SET_PRODUCTS', data.data)
        }
      } catch (e) {
        console.log(e)
        return e.response
      }
    }
  },
  mutations: {
    async SET_PRODUCTS(state, data){
      state.products = data
    }
  },
  state: {
    products: []
  }
}

export default controlProducts;
