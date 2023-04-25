import analyticsService from "@/services/analytics/analytics.service";

const analytics = {
  namespaced: true,
  actions: {
    async GET_ANALYTICS({commit}) {
      try {
        const {data, status} = await analyticsService.getAnalytics()
        if (status === 200){
          console.log('GET_ANALYTICS', data.data)
          commit('SET_ANALYTICS', data.data)
        }
      } catch (e) {
        console.log(e)
        return e.response
      }
    }
  },
  mutations: {
    async SET_ANALYTICS(state, data){
      state.analytics = data
    }
  },
  state: {
    analytics: []
  }
}

export default analytics;
