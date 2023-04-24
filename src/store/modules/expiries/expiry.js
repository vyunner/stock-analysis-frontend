import expiryService from "@/services/expiries/expiry.service";

const expiry = {
  namespaced: true,
  actions: {
    async GET_EXPIRY({commit}) {
      try {
        const {data, status} = await expiryService.getExpiry()
        if (status === 200){
          console.log('GET_EXPIRY', data.data)
          commit('SET_EXPIRY', data.data)
        }
      } catch (e) {
        console.log(e)
        return e.response
      }
    }
  },
  mutations: {
    async SET_EXPIRY(state, data){
      state.expiry = data
    }
  },
  state: {
    expiry: []
  }
}

export default expiry;
