import {createStore} from 'vuex'
import controlCategoryService from "@/services/control/control-category.service";
import router from "@/router";

const controlCategories = {
  namespaced: true,
  actions: {
    async POST_CATEGORY({commit}, data) {
      try {
        return await controlCategoryService.postCategory(data)
      } catch (e) {
        console.log(e)
        return e.response
      }
    },
    async PUT_CATEGORY({commit}, data) {
      try {
        return await controlCategoryService.putCategory(data)
      } catch (e) {
        console.log(e)
        return e.response
      }
    },
    async DELETE_CATEGORY({commit}, id) {
      try {
        return await controlCategoryService.deleteCategory(id)
      } catch (e) {
        console.log(e)
        return e.response
      }
    },
    async GET_CATEGORIES({commit}) {
      try {
        const {data, status} = await controlCategoryService.getCategories()
        if (status === 200){
          console.log('GET_CATEGORIES', data.data)
          commit('SET_CATEGORIES', data.data)
        }
      } catch (e) {
        console.log(e)
        return e.response
      }
    }
  },
  mutations: {
    async SET_CATEGORIES(state, data){
      state.categories = data
    }
  },
  state: {
    categories: []
  }
}

export default controlCategories;
