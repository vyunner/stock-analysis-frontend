import amountService from "@/services/amount/amount.service";

const amount = {
  namespaced: true,
  actions: {
    async GET_AMOUNTS({commit}) {
      try {
        const {data, status} = await amountService.getAmounts()
        if (status === 200){
          console.log('GET_AMOUNTS', data.data)
          commit('SET_AMOUNTS', data.data)
        }
      } catch (e) {
        console.log(e)
        return e.response
      }
    }
  },
  mutations: {
    async SET_AMOUNTS(state, data){
      state.amounts = data
    }
  },
  state: {
    amounts: []
  }
}

export default amount;
