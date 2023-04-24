import controlOrderService from "@/services/control/control-order.service";

const controlOrders = {
  namespaced: true,
  actions: {
    async POST_PRODUCT({commit}, data) {
      try {
        return await controlOrderService.postOrder(data)
      } catch (e) {
        console.log(e)
        return e.response
      }
    },
    async PUT_PRODUCT({commit}, data) {
      try {
        return await controlOrderService.putOrder(data)
      } catch (e) {
        console.log(e)
        return e.response
      }
    },
    async DELETE_PRODUCT({commit}, id) {
      try {
        return await controlOrderService.deleteOrder(id)
      } catch (e) {
        console.log(e)
        return e.response
      }
    },
    async GET_PRODUCTS({commit}) {
      try {
        const {data, status} = await controlOrderService.getOrders()
        if (status === 200){
          console.log('GET_ORDERS', data.data)
          commit('SET_ORDERS', data.data)
        }
      } catch (e) {
        console.log(e)
        return e.response
      }
    }
  },
  mutations: {
    async SET_ORDERS(state, data){
      state.orders = data
    }
  },
  state: {
    orders: []
  }
}

export default controlOrders;
