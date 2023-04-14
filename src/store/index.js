import { createStore } from 'vuex'

import auth from "@/store/modules/auth/auth"

export default createStore({
  state: {
    dataUser: []
  },
  getters: {
  },
  mutations: {
    SET_DATA_USER(state, data) {
      state.dataUser = data
      localStorage.setItem('dataUser', JSON.stringify(data))
    },
    SET_DATA_USER_FROM_LOCAL_STORAGE(state){
      state.dataUser = JSON.parse(localStorage.getItem('dataUser'))
    }
  },
  actions: {
  },
  modules: {
    auth
  }
})
